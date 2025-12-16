import { EventCategory, EventDetails, TimelineItem, Coordinator } from './types';

/* -------------------- GENERAL RULES -------------------- */

export const GENERAL_RULES = [
  'Valid College ID is mandatory for all participants.',
  'ON-SPOT REGISTRATION IS NOT PERMITTED. Only for BGMI and Treasure Hunt.',
  'Registration fees are non-refundable.',
  'The use of any substances that alter consciousness is strictly prohibited.',
  'Participants are required to bring their own electronic devices.',
  'Detailed event instructions will be provided by the coordinators.',
  'The college will not be responsible for any loss of personal belongings.',
  'Individual Events: Maximum 3 participants per college.',
  'Group Events: Maximum 2 teams per college.',
  'Any malpractice will lead to elimination.'
];

/* -------------------- EVENTS -------------------- */

export const EVENTS: EventDetails[] = [
  {
    id: 'vedix',
    title: 'VEDIX',
    subtitle: 'The Battle of Code',
    category: EventCategory.CODING,
    description:
      'A solo coding event to test your algorithmic prowess. Show your skills in C, C++, Java, or Python.',
    prizePool: '₹5,000',
    registrationFee: '₹200',
    teamSize: 'Solo',
    maxMembers: 1,
    rules: [
      'This is a solo event.',
      'Registration fee: ₹200.',
      'Maximum 3 participants per college.',
      'Languages allowed: C, C++, Java, Python.',
      'Participants must report 30 minutes early.',
      'Personal gadgets are prohibited.',
      'Any malpractice will lead to elimination.',
      'Judges’ decision is final.',
      'Rules for rounds will be disclosed on the spot.'
    ],
    coordinators: [
      { name: 'Darshan Shankar Naik', phone: '9535598827' },
      { name: 'Bindushree T R', phone: '8050020429' }
    ],
    imageUrl: '/event-images/vedix-coding.jpg',
    registrationUrl:
      'https://docs.google.com/forms/d/e/1FAIpQLSeKiwS5OjHcsIvWFiZPL-Az_BFS2cfXqhc-Ma7rgFyRXKaDQQ/viewform'
  },

  {
    id: 'raja-neeti',
    title: 'RAJA NEETI SABHA',
    subtitle: 'IT Manager',
    category: EventCategory.MANAGEMENT,
    description:
      'Test your leadership, crisis management, and decision-making skills.',
    prizePool: '₹4,000',
    registrationFee: '₹200',
    teamSize: 'Solo',
    maxMembers: 1,
    rules: [
      'This is an Individual Event.',
      'Maximum 3 participants per college.',
      'Participants must bring resume (soft copy).',
      'Smartphones allowed only when instructed.',
      'Rules will be announced on the spot.',
      'Any malpractice will lead to elimination.',
      'Judges’ decision is final.'
    ],
    coordinators: [
      { name: 'Madhumitha S', phone: '9482139571' },
      { name: 'Jeevan G', phone: '9686585450' }
    ],
    imageUrl: '/event-images/it-manager.jpg',
    registrationUrl:
      'https://docs.google.com/forms/d/e/1FAIpQLSfxIeqxlEMXWDeun6F1Zs2OSf9zIhwSwM_0Xl8C2Ve9lcanfg/viewform'
  },

  {
    id: 'drishti',
    title: 'DRISHTI',
    subtitle: 'The Royal Lens (Photography)',
    category: EventCategory.PHOTOGRAPHY,
    description:
      'Capture the essence of the fest through photography and videography.',
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
      { name: 'Pooja R', phone: '8296077558' },
      { name: 'Akash Y', phone: '6363614954' }
    ],
    imageUrl: '/event-images/photography.jpg',
    registrationUrl:
      'https://docs.google.com/forms/d/e/1FAIpQLScz3b8KdImvTaYtCoRQmTRHya9KxezLqhBVXmLJCrPpcDb2tg/viewform'
  },

  {
    id: 'dhwani',
    title: 'DHWANI YUDDHA',
    subtitle: 'Tech Talk',
    category: EventCategory.SPEAKING,
    description:
      'A platform to express ideas on emerging technologies.',
    prizePool: '₹4,000',
    registrationFee: '₹200',
    teamSize: 'Solo',
    maxMembers: 1,
    rules: [
      'Solo event.',
      'No preparation time.',
      'No electronic devices allowed.',
      'Offensive language leads to disqualification.',
      'Any malpractice will lead to elimination.',
      'Judges’ decision is final.'
    ],
    coordinators: [
      { name: 'Mohith K V', phone: '9353938681' },
      { name: 'Snehashree N', phone: '8088816630' }
    ],
    imageUrl: '/event-images/tech-talk.jpg',
    registrationUrl:
      'https://docs.google.com/forms/d/e/1FAIpQLSf8B5d9RP4dEvAJng3rzOaxbWzmW6dbLSrDUhDLq41Jz8V1Yw/viewform'
  },

  {
    id: 'garuda',
    title: 'GARUDA ANVESHANA',
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
    imageUrl: '/event-images/treasure-hunt.jpg',
    registrationUrl:
      'https://docs.google.com/forms/d/e/1FAIpQLSeQnRO8_71iDXu1jcnii3sl1gY_mPxTqQHzTw-OfTwlh2_8yg/viewform'
  },

  {
    id: 'chakravyuha',
    title: 'CHAKRAVYUHA WARZONE',
    subtitle: 'BGMI',
    category: EventCategory.GAMING,
    description:
      'Battle it out in the BGMI warzone.',
    prizePool: '₹7,000',
    registrationFee: '₹500 / Team',
    teamSize: '4 Members',
    maxMembers: 4,
    rules: [
      'Team of 4 members.',
      'On-spot registration is NOT allowed.',
      'Only online registration.',
      'Custom rooms only.',
      'No exploiting glitches.',
      'Carry your own mobile device.',
      'Any malpractice will lead to elimination.',
      'Judges’ decision is final.'
    ],
    coordinators: [
      { name: 'Achyuth U S', phone: '9148686067' },
      { name: 'Bindusree K S', phone: '8904464903' }
    ],
    imageUrl: '/event-images/bgmi.jpg',
    registrationUrl:
      'https://docs.google.com/forms/d/e/1FAIpQLSchN-x5YgBAvJ1u5q9gmLBRtgF1uHOI2WRsa_BHx3UWxU5ciA/viewform'
  },

  {
    id: 'web-kala',
    title: 'WEB KALA VINYASA',
    subtitle: 'Web & Poster Designing',
    category: EventCategory.DESIGN,
    description:
      'Design creative web pages and posters.',
    prizePool: '₹5,500',
    registrationFee: '₹300 / Team',
    teamSize: '2 Members',
    maxMembers: 2,
    rules: [
      'AI agents are strictly prohibited.',
      'Each team must consist of 2 members only.',
      'Cumulative scoring will decide the final results.',
      'Allowed software/tools: Adobe Express, Canva, and Figma.',
      'Some rounds will be based on HTML, CSS, and JavaScript.',
      'Participants are allowed to use VS Code editor only.',
      'Referring to external code is strictly not allowed.',
      'Participants must bring their own laptops, mobile phones, and chargers.',
      'The event schedule must be followed strictly.',
      'Participants must install all required software prior to the event.'
    ],
    coordinators: [
      { name: 'Nuthan A M', phone: '9845541168' },
      { name: 'Harshitha S', phone: '6363323303' }
    ],
    imageUrl: '/event-images/web-design.jpg',
    registrationUrl:
      'https://docs.google.com/forms/d/e/1FAIpQLSf8B5d9RP4dEvAJng3rzOaxbWzmW6dbLSrDUhDLq41Jz8V1Yw/viewform'
  },

  {
    id: 'prajna',
    title: 'PRAJNA PARIKSHA',
    subtitle: 'The Test of Wisdom (IT Quiz)',
    category: EventCategory.QUIZ,
    description:
      'A battle of wits covering IT and programming.',
    prizePool: '₹5,000',
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
    imageUrl: '/event-images/it-quiz.jpg',
    registrationUrl:
      'https://docs.google.com/forms/d/e/1FAIpQLSd1L8ltxkr3PZIYotx35KGadNQbiN_n3CjVDLZ7RkPiY7WZng/viewform'
  }
];

/* -------------------- TIMELINE -------------------- */

export const TIMELINE: TimelineItem[] = [
  { time: '08:00 AM - 09:00 AM', title: 'Registration', description: 'Registration' },
  { time: '09:00 AM - 09:15 AM', title: 'The Royal Inaugural', description: 'Opening Ceremony' },
  { time: '09:15 AM - 01:00 PM', title: 'The Battles Begin', description: 'Event Rounds' },
  { time: '01:00 PM - 02:00 PM', title: 'Grand Feast', description: 'Lunch Break' },
  { time: '02:00 PM - 04:00 PM', title: 'Final Showdown', description: 'Final Rounds' },
  { time: '04:30 PM - 05:30 PM', title: 'Abhinandana', description: 'Prize Distribution' },
  { time: '05:30 PM Onwards', title: 'ZERONE YUGA', description: 'Closing Ceremony' }
];

/* -------------------- COORDINATORS -------------------- */

export const FACULTY_COORDINATORS: Coordinator[] = [
  { name: 'Dr. H S VijayaKumar', phone: '' },
  { name: 'Dr. Prashanth G K', phone: '' }
];

export const STUDENT_COORDINATORS: Coordinator[] = [
  { name: 'Lingadevaru HP', phone: '9019746824' },
  { name: 'Khushi Jagadeesh', phone: '9019854409' }
];
