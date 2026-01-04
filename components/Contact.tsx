import React, { useState } from 'react';
import { motion } from 'framer-motion';

/* Small helper icons */
const PhoneIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.86 19.86 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12 1.21.42 2.4.9 3.5a2 2 0 0 1-.45 2.11L9.91 10.6a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c1.1.48 2.29.78 3.5.9A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const MailIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M3 8.2v7.6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21 6H3v2.2l9 6 9-6V6z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

type Person = {
  name: string;
  role?: string;
  phone?: string;
  email?: string;
  avatar?: string;
};

const studentCoordinators: Person[] = [
  { name: 'Gurudeep V', role: 'General Secretary', phone: '+91-6363770057', avatar: '/event-coordinators-dp/gurudeepv.PNG' },
  { name: 'Vijay M', role: 'General Secretary', phone: '+91-9353414989', avatar: '/event-coordinators-dp/vijaym.png' },
  { name: 'harshith R', role: 'General Secretary', phone: '+91-7204560373', avatar: '/event-coordinators-dp/harshithr.png' },
  { name: 'Sourabh', role: 'General Secretary', phone: '+91-8431127576', avatar: '/event-coordinators-dp/sourabh.png' },
];

const royalAdvisors: Person[] = [
  { name: 'Teacher Name', role: 'Faculty Coordinator', phone: '+91-9999999999', avatar: '/default-avatar.svg' },/* '/faculty-coordinators-dp/chaitra.png' */
  { name: 'Teacher Name', role: 'Faculty Coordinator', phone: '+91-9999999999', avatar: '/default-avatar.svg' },
];

const battalionGroups = [
  {
    title: 'BGMI',
    commanders: [
      { name: 'Gurudeep V', role: 'Co-ordinator', phone: '+91-6363770057', avatar: '/event-coordinators-dp/gurudeepv.PNG' },
      { name: 'Vijay M', role: 'Co-ordinator', phone: '+91-9353414989', avatar: '/event-coordinators-dp/vijaym.png' },
      { name: 'Sourabh', role: 'Co-ordinator', phone: '+91-8431127576', avatar: '/event-coordinators-dp/sourabh.png' },
    ],
  },
  {
    title: 'Photography',
    commanders: [
      { name: 'Adithya', role: 'Co-ordinator', phone: '+91-6361384725', avatar: '/event-coordinators-dp/adithya.png' },
      { name: 'Jeevan M', role: 'Co-ordinator', phone: '+91-8277558979', avatar: '/event-coordinators-dp/jeevanm.png' },
    ],
  },
  {
    title: 'Video Making',
    commanders: [
      { name: 'Harshith R', role: 'Co-ordinator', phone: '+91-7204560373', avatar: '/event-coordinators-dp/harshithr.png' },
      { name: 'Suhas', role: 'Co-ordinator', phone: '+91-8073800496', avatar: '/event-coordinators-dp/suhas.png' },
    ],
  },
  {
    title: 'Coding',
    commanders: [
      { name: 'Shashank G', role: 'Co-ordinator', phone: '+91-9353567961', avatar: '/event-coordinators-dp/shahsankg.png' },
      { name: 'Sudha', role: 'Co-ordinator', phone: '+91-8050020429', avatar: '/event-coordinators-dp/sudha.png' },
    ],
  },
  {
    title: 'Tech Talk',
    commanders: [
      { name: 'Shashank G', role: 'Co-ordinator', phone: '+91-9353567961', avatar: '/event-coordinators-dp/shahsankg.png' },
      { name: 'Nandini', role: 'Co-ordinator', phone: '+91-8050020429', avatar: '/event-coordinators-dp/nandini.png' },
    ],
  },
  {
    title: 'Treasure Hunt',
    commanders: [
      { name: 'Shashank G', role: 'Co-ordinator', phone: '+91-9353567961', avatar: '/event-coordinators-dp/shahsankg.png' },
      { name: 'Nandini', role: 'Co-ordinator', phone: '+91-8050020429', avatar: '/event-coordinators-dp/nandini.png' },
    ],
  },
  {
    title: 'Poster Designing',
    commanders: [
      { name: 'Shashank G', role: 'Co-ordinator', phone: '+91-9353567961', avatar: '/event-coordinators-dp/shahsankg.png' },
      { name: 'Nandini', role: 'Co-ordinator', phone: '+91-8050020429', avatar: '/event-coordinators-dp/nandini.png' },
    ],
  },
  {
    title: 'IT Quiz',
    commanders: [
      { name: 'Shashank G', role: 'Co-ordinator', phone: '+91-9353567961', avatar: '/event-coordinators-dp/shahsankg.png' },
      { name: 'Nandini', role: 'Co-ordinator', phone: '+91-8050020429', avatar: '/event-coordinators-dp/nandini.png' },
    ],
  },
  // Add more battalions as needed...
];

const Contact: React.FC = () => {
  // keep the old fallback form behavior available
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('message', message);
      // helpful Formsubmit parameters
      formData.append('_subject', 'NEXGEN: Contact Form');
      formData.append('_captcha', 'false');

      const res = await fetch('https://formsubmit.co/ajax/gurudeepv55@gmail.com', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const json = await res.json();
      if (json.success || res.ok) {
        setStatus('done');
        setName('');
        setEmail('');
        setMessage('');
        setTimeout(() => setStatus('idle'), 4000);
      } else {
        throw new Error('Submission failed');
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Contact form submit error', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="relative py-20 px-6 md:px-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <span className="text-gold-600 font-serif uppercase tracking-[0.3em] text-sm block mb-4">Get In Touch</span>
        <h2 className="text-4xl md:text-5xl font-display text-gold-300 mb-4">Coordinators</h2>
        <p className="text-gray-300 max-w-2xl mx-auto">Find the student coordinators, faculty advisors and event coordinators below. Click phone icons to call directly.</p>
      </motion.div>

      {/* Top: two highlighted groups and a compact contact form */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#0f0404]/80 p-6 rounded-lg border border-gold-500/15 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gold-300 font-semibold">Student Coordinators</h3>
              <span className="text-sm text-gray-400">Keepers of the code</span>
            </div>
            <div className="space-y-4">
              {studentCoordinators.map((p) => (
                <div key={p.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img src={p.avatar} alt={p.name} className="w-12 h-12 rounded-full border border-gold-900/30" />
                    <div className="text-left">
                      <div className="text-white font-medium">{p.name}</div>
                      <div className="text-xs text-gray-400">{p.role}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {p.phone && <a href={`tel:${p.phone}`} className="text-gold-300 hover:text-gold-400"><PhoneIcon /></a>}
                    {p.email && <a href={`mailto:${p.email}`} className="text-gray-400 hover:text-gray-200"><MailIcon /></a>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0f0404]/80 p-6 rounded-lg border border-gold-500/15 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gold-300 font-semibold">Faculty Coordinators</h3>
              <span className="text-sm text-gray-400">Guiding lights</span>
            </div>
            <div className="space-y-4">
              {royalAdvisors.map((p) => (
                <div key={p.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img src={p.avatar} alt={p.name} className="w-12 h-12 rounded-full border border-gold-900/30" />
                    <div className="text-left">
                      <div className="text-white font-medium">{p.name}</div>
                      <div className="text-xs text-gray-400">{p.role}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {p.phone && <a href={`tel:${p.phone}`} className="text-gold-300"><PhoneIcon /></a>}
                    {p.email && <a href={`mailto:${p.email}`} className="text-gray-400"><MailIcon /></a>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column: compact contact form */}
        <div className="bg-[#0f0404]/80 p-6 rounded-lg border border-gold-500/15 shadow-xl">
          <h3 className="text-gold-300 font-semibold mb-2">Send a message</h3>
          <p className="text-sm text-gray-400 mb-4">Or email: <a className="text-gold-300" href="mailto:gurudeepv55@gmail.com">gurudeepv55@gmail.com</a></p>
          <form onSubmit={handleSubmit} className="space-y-3" noValidate>
            <input name="name" className="w-full bg-black/60 border border-gold-900/40 p-3 rounded text-white" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required />
            <input name="email" className="w-full bg-black/60 border border-gold-900/40 p-3 rounded text-white" placeholder="Your email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <textarea name="message" className="w-full bg-black/60 border border-gold-900/40 p-3 rounded text-white min-h-[100px]" placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} required />
            <div className="flex items-center justify-between">
              <button type="submit" disabled={status === 'sending'} className={`px-4 py-2 bg-gold-500 text-black rounded font-semibold hover:brightness-105 transition ${status === 'sending' ? 'opacity-60 cursor-wait' : ''}`}>
                {status === 'sending' ? 'Sending...' : 'Send'}
              </button>
              <a className="text-sm text-gray-400" href="mailto:gurudeepv55@gmail.com">Or email us</a>
            </div>

            <div aria-live="polite" className="min-h-[28px]">
              {status === 'sending' && (
                <div className="text-sm text-gray-300">Sending…</div>
              )}
              {status === 'done' && (
                <div className="text-sm text-green-400">Message sent — we'll get back to you soon.</div>
              )}
              {status === 'error' && (
                <div className="text-sm text-red-400">Sending failed — please try emailing us directly.</div>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Battalion commanders grid */}
      <div className="mb-12">
        <h3 className="text-xl text-gold-300 font-semibold mb-6">Battalion Commanders</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {battalionGroups.map((g) => (
            <div key={g.title} className="bg-gradient-to-t from-[#070404]/80 to-[#0f0505]/60 rounded-lg border border-gold-900/20 p-4 shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="text-white font-medium">{g.title}</div>
                <div className="text-sm text-gray-400">Command</div>
              </div>
              <div className="space-y-3">
                {g.commanders.map((c) => (
                  <div key={c.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={c.avatar} alt={c.name} className="w-10 h-10 rounded-full border border-gold-900/30" />
                      <div className="text-left">
                        <div className="text-white">{c.name}</div>
                        <div className="text-xs text-gray-400">{c.role}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {c.phone && (
                        <a href={`tel:${c.phone}`} className="text-gold-300 hover:text-gold-400" aria-label={`Call ${c.name}`}>
                          <PhoneIcon />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Map block */}
      <div className="relative rounded-lg overflow-hidden border border-gold-900/20">
        <a
          href="https://maps.app.goo.gl/2H6duVmDg6jjUbqEA"
          target="_blank"
          rel="noreferrer"
          className="absolute left-6 top-6 z-10 inline-block bg-[#111]/90 text-gold-300 px-4 py-2 rounded-full font-semibold shadow-md hover:brightness-105"
        >
          MCA BLOCK, SJBIT
        </a>

        {/* Simple embed — using a query embed (falls back gracefully). Styled to appear dark with CSS filter */}
        <div className="w-full h-64 md:h-80 bg-black">
          <iframe
            title="MCA Block - map"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1944.5566795853756!2d77.4957143!3d12.9004317!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3fba95a0cd07%3A0xbf7b0324578e09b4!2sLabVIEW%20Academy%20%40%20SJBIT!5e0!3m2!1sen!2sin!4v1767558745807!5m2!1sen!2sin"
            className="w-full h-full border-0"
            style={{ filter: 'grayscale(100%) contrast(80%) brightness(45%)' }}
          />
        </div>
        <div className="p-4 text-xs text-gray-400">Click the marker or the button to open in Google Maps</div>
      </div>
    </section>
  );
};

export default Contact;