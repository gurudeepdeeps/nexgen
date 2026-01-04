import { EventCategory, EventDetails, TimelineItem, Coordinator } from './types';

/* -------------------- GENERAL RULES -------------------- */

export const GENERAL_RULES = [
  'Valid College ID is mandatory for all participants.',
  'On-spot registration is allowed for all 6 events except BGMI and Treasure Hunt',
  'Registration fees are non-refundable.',
  'The use of any substances that alter consciousness is strictly prohibited.',
  'Participants are required to bring their own electronic devices.',
  'Detailed event instructions will be provided by the coordinators.',
  'The college will not be responsible for any loss of personal belongings.',
  /*
  'Individual Events: Maximum 3 participants per college.',
  'Group Events: Maximum 2 teams per college.',
  */
  'Any malpractice will lead to elimination.'
];

/* -------------------- EVENTS -------------------- */

export const EVENTS: EventDetails[] = [
  {
    id: 'bgmi',
    title: 'BGMI',
    subtitle: 'Battlegrounds Mobile India',
    category: EventCategory.GAMING,
    description:
      'Battle it out in the BGMI warzone.',
    prizePool: '₹7,000',
    registrationFee: '₹400 / Team',
    teamSize: '4 Members',
    maxMembers: 4,
    rules: [
      'Team of 4 members.',
      'On-spot registration is NOT allowed.',
      'Only online registration.',
      'Custom rooms only.',
      'No exploiting glitches.',
      'No Tablets allowed.',
      'Carry your own mobile device.',
      'Any malpractice will lead to elimination.',
      'Judges decision is final.'
    ],
    coordinators: [
      { name: 'Gurudeep V', phone: '6363770057' },
      { name: 'Vijay M', phone: '9353414989' },
      { name: 'Sourabh', phone: '8431127576' }
    ],
    imageUrl: '/event-images/bgmi.png',
    registrationUrl:
      'https://docs.google.com/forms/d/e/1FAIpQLSchN-x5YgBAvJ1u5q9gmLBRtgF1uHOI2WRsa_BHx3UWxU5ciA/viewform'
  },

  {
    id: 'video-making',
    title: 'VIDEO MAKING',
    subtitle: 'Videography',
    category: EventCategory.VIDEO_MAKING,
    description:
      'Capture the essence of the fest through videography.',
    prizePool: '₹4,000',
    registrationFee: '₹200',
    teamSize: 'Solo',
    maxMembers: 1,
    rules: [
      'This is an Individual Event.',
      'Maximum 3 participants per college.',
      'Editing must be done on the spot.',
      'Smartphones allowed only when instructed.',
      'Rules will be announced on the spot.',
      'Any Malpractice leads to elimination.',
      'Judges decision is final.'
    ],
    coordinators: [
      { name: 'harshith R', phone: '7204560373' },
      { name: 'Suhas', phone: '8073800496' }
    ],
    imageUrl: '/event-images/video-making.png',
    registrationUrl:
      'https://docs.google.com/forms/d/e/1FAIpQLSfxIeqxlEMXWDeun6F1Zs2OSf9zIhwSwM_0Xl8C2Ve9lcanfg/viewform'
  },

  {
    id: 'photography',
    title: 'PHOTOGRAPHY',
    subtitle: 'The Royal Lens (Photography)',
    category: EventCategory.PHOTOGRAPHY,
    description:
      'Capture the essence of the fest through photography.',
    prizePool: '₹3,500',
    registrationFee: '₹200',
    teamSize: 'Solo',
    maxMembers: 1,
    rules: [
      'Individual event.',
      'Registration fee: ₹200.',
      'Maximum 3 participants per college.',
      'Photography must be done using mobile phones only.',
      'Cameras are NOT allowed.',
      'Editing must be done on the spot.',
      'Original content only.',
      'Any malpractice leads to elimination.'
    ],
    coordinators: [
      { name: 'Adithya', phone: '6361384725' },
      { name: 'Jeevan M', phone: '8277558979' }
    ],
    imageUrl: '/event-images/photography.png',
    registrationUrl:
      'https://docs.google.com/forms/d/e/1FAIpQLScz3b8KdImvTaYtCoRQmTRHya9KxezLqhBVXmLJCrPpcDb2tg/viewform'
  },

  {
    id: 'tech-talk',
    title: 'TECH TALK',
    subtitle: 'Technical Talk',
    category: EventCategory.SPEAKING,
    description:
      'A platform to express ideas on emerging technologies.',
    prizePool: '₹4,000',
    registrationFee: '₹200',
    teamSize: 'Solo',
    maxMembers: 1,
    rules: [
      'Solo event.',
      'Topic is given on spot.',
      '30mins on spot preparation time.',
      'No electronic devices allowed.',
      'Offensive language leads to disqualification.',
      'Any malpractice will lead to elimination.',
      'Judges decision is final.'
    ],
    coordinators: [
      { name: 'Mohith K V', phone: '9353938681' },
      { name: 'Snehashree N', phone: '8088816630' }
    ],
    imageUrl: '/event-images/tech-talk.png',
    registrationUrl:
      'https://docs.google.com/forms/d/e/1FAIpQLSfRSVs7aNfCRPJvy_o0vMWmxMpC6gu91bFwo1Py-3dRitBG7w/viewform?usp=header'
  },

  {
    id: 'treasure-hunt',
    title: 'TREASURE HUNT',
    subtitle: 'Treasure Hunt',
    category: EventCategory.TREASURE_HUNT,
    description:
      'Decipher clues and uncover the hidden treasure.',
    prizePool: '₹7,000',
    registrationFee: '₹500 / Team',
    teamSize: '4 Members',
    maxMembers: 4,
    rules: [
      'Team of 4 members.',
      'Maximum 2 teams per college.',
      'On-spot registration is NOT allowed.',
      'Only online registration.',
      'No external help.',
      'Follow campus rules.',
      'Misconduct leads to disqualification.'
    ],
    coordinators: [
      { name: 'Nithya Tejasvi', phone: '7899422270' },
      { name: 'Shashiraj', phone: '9900003586' }
    ],
    imageUrl: '/event-images/treasure-hunt.png',
    registrationUrl:
      'https://docs.google.com/forms/d/e/1FAIpQLSeQnRO8_71iDXu1jcnii3sl1gY_mPxTqQHzTw-OfTwlh2_8yg/viewform'
  },

  {
    id: 'coding',
    title: 'CODING',
    subtitle: 'The Battle of Code',
    category: EventCategory.CODING,
    description:
      'A solo coding event to test your algorithmic prowess. Show your skills in C, C++, Java, or Python.',
    prizePool: '₹4,000',
    registrationFee: '₹200',
    teamSize: 'Solo',
    maxMembers: 1,
    rules: [
      'This is an individual event.',
      'A maximum of 3 participants per college is allowed.',
      'Allowed programming languages: C, C++, Java, Python.',
      'Participants must report to the venue 30 minutes before the event for round-wise instructions.',
      'Pen and paper will be provided if required.',
      'HackerRank credentials are mandatory for all participants.',
      'Personal gadgets are strictly prohibited; organizers will provide a PC for the event.',
      'Any form of malpractice will lead to immediate disqualification.',
      'The decision of the judges is final and binding.',
      'Rules for each round will be announced on the spot.'
    ],
    coordinators: [
      { name: 'Shashank G', phone: '9353567961' },
      { name: 'Sudha', phone: '8050020429' }
    ],
    imageUrl: '/event-images/coding.png',
    registrationUrl:
      'https://docs.google.com/forms/d/e/1FAIpQLSeKiwS5OjHcsIvWFiZPL-Az_BFS2cfXqhc-Ma7rgFyRXKaDQQ/viewform'
  },

  {
    id: 'poster-designing',
    title: 'POSTER DESIGNING',
    subtitle: 'Poster Designing',
    category: EventCategory.DESIGN,
    description:
      'Design creative posters.',
    prizePool: '₹3000',
    registrationFee: '₹300 / Team',
    teamSize: '2 Members',
    maxMembers: 2,
    rules: [
      'AI agents are strictly prohibited.',
      'Each team must consist of 2 members only.',
      'Cumulative scoring will decide the final results.',
      'Allowed software/tools: Adobe Photoshop, Canva.',
      'Participants must bring their own laptops, mobile phones, and chargers.',
      'The event schedule must be followed strictly.',
      'Participants must install all required software prior to the event.',
      'Any Malpractice leads to elimination.'
    ],
    coordinators: [
      { name: 'Vinay', phone: '9845541168' },
      { name: 'Harshitha H', phone: '6363323303' }
    ],
    imageUrl: '/event-images/poster-designing.png',
    registrationUrl:
      'https://docs.google.com/forms/d/e/1FAIpQLSf8B5d9RP4dEvAJng3rzOaxbWzmW6dbLSrDUhDLq41Jz8V1Yw/viewform'
  },

  {
    id: 'it-quiz',
    title: 'IT QUIZ',
    subtitle: 'The Test of Wisdom (IT Quiz)',
    category: EventCategory.QUIZ,
    description:
      'A battle of wits covering IT and programming.',
    prizePool: '₹4,000',
    registrationFee: '₹300 / Team',
    teamSize: '2 Members',
    maxMembers: 2,
    rules: [
      'Team of 2 members.',
      'Multiple rounds.',
      'Fixed time limits.',
      'Any malpractice will lead to elimination.'
    ],
    coordinators: [
      { name: 'Likitha P Kumar', phone: '8660290349' },
      { name: 'Rahul H N', phone: '9632607249' }
    ],
    imageUrl: '/event-images/it-quiz.png',
    registrationUrl:
      'https://docs.google.com/forms/d/e/1FAIpQLSd1L8ltxkr3PZIYotx35KGadNQbiN_n3CjVDLZ7RkPiY7WZng/viewform'
  }
];

/* -------------------- TIMELINE -------------------- */

export const TIMELINE: TimelineItem[] = [
  { time: '8:00 am - 09:00 AM', title: 'Registration', description: 'Registration' },
  { time: '09:00 AM - 09:15 AM', title: 'The Royal Inaugural', description: 'Opening Ceremony' },
  { time: '09:15 AM - 01:00 PM', title: 'The Battles Begin', description: 'Event Rounds' },
  { time: '01:00 PM - 02:00 PM', title: 'Grand Feast', description: 'Lunch Break' },
  { time: '02:00 PM - 04:00 PM', title: 'Final Showdown', description: 'Final Rounds' },
  { time: '04:30 PM - 05:30 PM', title: 'Abhinandana', description: 'Prize Distribution' },
  { time: '05:30 PM Onwards', title: 'NEXGEN', description: 'Closing Ceremony' }
];

/* -------------------- COORDINATORS -------------------- */

export const FACULTY_COORDINATORS: Coordinator[] = [
  { name: 'Faculty Coordinator', phone: '1234567890' },
  { name: 'Faculty Coordinator', phone: '1234567890' }
];

export const STUDENT_COORDINATORS: Coordinator[] = [
  { name: 'Gurudeep V', phone: '6363770057' },
  { name: 'Vijay M', phone: '9353414989' },
  { name: 'Sourabh', phone: '8431127576' }
];
