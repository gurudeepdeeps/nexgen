
import React, { useState, useEffect } from 'react';
import Loader from './components/Loader';
import Navigation from './components/Navigation';
import { Hero } from './components/Hero';
import About from './components/About';
import Events from './components/Events';
import Roadmap from './components/Roadmap';
import Sponsors from './components/Sponsors';
import Contact from './components/Contact';
import Rules from './components/Rules';
import Background from './components/Background';
import CustomCursor from './components/CustomCursor';
import NotFound from './components/NotFound';
import { motion, AnimatePresence } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';

// Declare gtag to avoid TypeScript errors
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

const VALID_VIEWS = ['home', 'about', 'events', 'rules', 'roadmap', 'sponsors', 'contact'];
const GA_TRACKING_ID = 'G-9WPHRH72M1';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState('home');

  // --- ANALYTICS TRACKING START ---
  useEffect(() => {
    if (typeof window.gtag !== 'undefined') {
      const pageTitle = currentView.charAt(0).toUpperCase() + currentView.slice(1);
      
      // Track Page View on Change
      window.gtag('config', GA_TRACKING_ID, {
        page_title: `ZERONE 3.0 | ${pageTitle}`,
        page_path: `/${currentView}`,
      });
    }

    // Track Time Spent on View
    const startTime = Date.now();

    return () => {
      const endTime = Date.now();
      const timeSpent = (endTime - startTime) / 1000; // in seconds

      if (typeof window.gtag !== 'undefined') {
        window.gtag('event', 'time_on_view', {
          event_category: 'Engagement',
          event_label: currentView,
          value: Math.round(timeSpent),
          page_path: `/${currentView}`,
          duration_seconds: timeSpent
        });
      }
    };
  }, [currentView]);

  useEffect(() => {
    const handleGlobalClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      const clickable = target.closest('button, a, div[role="button"]');
      const element = (clickable as HTMLElement) || target;

      const elementLabel = 
        element.innerText?.substring(0, 50) || 
        element.getAttribute('aria-label') || 
        element.id || 
        element.className || 
        element.tagName;

      if (typeof window.gtag !== 'undefined') {
        window.gtag('event', 'click', {
          event_category: 'Interaction',
          event_label: elementLabel,
          click_x: event.clientX,
          click_y: event.clientY,
          page_location: currentView,
        });
      }
    };

    window.addEventListener('click', handleGlobalClick);
    return () => {
      window.removeEventListener('click', handleGlobalClick);
    };
  }, [currentView]);
  // --- ANALYTICS TRACKING END ---

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  const handleViewChange = (view: string) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Logic to determine if view is valid
  const isValidView = VALID_VIEWS.includes(currentView);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden selection:bg-gold-900 selection:text-gold-100">
      <CustomCursor />
      <Analytics />
      
      {/* Loader only shows once initially */}
      {loading && <Loader onLoadingComplete={handleLoadingComplete} />}
      
      {!loading && (
        <div className="animate-fade-in relative min-h-screen flex flex-col">
          <Background />
          
          {/* Only show Navigation if the view is valid */}
          {isValidView && (
             <Navigation activeView={currentView} onChangeView={handleViewChange} />
          )}
          
          <main className="flex-grow relative">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentView}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="w-full"
                >
                    {/* HOME PAGE */}
                    {currentView === 'home' && (
                        <>
                            <Hero onChangeView={handleViewChange} />
                            <About />
                            <Events />
                            <Roadmap />
                        </>
                    )}

                    {/* DEDICATED PAGES */}
                    {currentView === 'about' && <About />}
                    {currentView === 'events' && <Events />}
                    {currentView === 'rules' && <Rules />}
                    {currentView === 'roadmap' && <Roadmap />}
                    {currentView === 'sponsors' && <Sponsors />}
                    {currentView === 'contact' && <Contact />}

                    {/* 404 PAGE */}
                    {!isValidView && (
                        <NotFound onGoHome={() => handleViewChange('home')} />
                    )}

                </motion.div>
            </AnimatePresence>
          </main>
        </div>
      )}
    </div>
  );
};

export default App;
