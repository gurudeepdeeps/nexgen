
import { EventCategory, EventDetails, TimelineItem, Coordinator } from './types';

export const GENERAL_RULES = [
  "Valid College ID is mandatory for all participants.",
  "On-spot registration is NOT permitted.",
  "Registration fees are non-refundable.",
  "The use of any substances that alter consciousness is strictly prohibited.",
  "Participants are required to bring their own electronic devices.",
  "Detailed event instructions will be provided by the coordinators.",
  "The college will not be responsible for any loss of personal belongings.",
  "Individual Events: Maximum 3 participants per college.",
  "Group Events: Maximum 2 teams per college."
];

export const EVENTS: EventDetails[] = [
  {
    id: 'vedix',
    title: 'VEDIX',
    subtitle: 'The Battle of Code',
    category: EventCategory.CODING,
    description: 'A solo coding event to test your algorithmic prowess. Show your skills in C, C++, Java, or Python.',
    prizePool: '₹4,000',
    registrationFee: '₹200',
    teamSize: 'Solo',
    maxMembers: 1,
    rules: [
      'This is a solo event.',
      'Registration fee: ₹200.',
      'Maximum 3 participants from each college.',
      'Programming languages allowed: C, C++, Java, Python.',
      'Participants must report to the venue 30 minutes before the event.',
      'Pen and paper will be provided if necessary.',
      'Personal gadgets are strictly prohibited; organizers will provide a PC.',
      'Any malpractice will result in immediate disqualification.',
      'The verdict of the judges will be final and binding.',
      'Rules for each round will be disclosed on the spot.'
    ],
    coordinators: [
      { name: 'Darshan S Naik', phone: '9535598827' },
      { name: 'Bindushree T R', phone: '8050020429' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'web-kala',
    title: 'WEB KALA VINYASA',
    subtitle: 'Web & Poster Designing',
    category: EventCategory.DESIGN,
    description: 'Showcase your creativity in UI/UX and visual design.',
    prizePool: '₹5,000',
    registrationFee: '₹300 / Team',
    teamSize: '2 Members',
    maxMembers: 2,
    rules: [
      'Each team must consist of 2 members.',
      'Registration fee: Rs. 300.',
      'Maximum 2 teams per college.',
      'Cumulative scoring will decide the final result.',
      'Software allowed: Adobe Illustrator, Adobe Photoshop, Canva, Figma.',
      'Some rounds will be based on HTML, CSS, and JavaScript.',
      'Participants may use any preferred code editor (e.g., VS Code).',
      'Referring to external code is strictly not allowed.',
      'Participants must bring their own laptop, mobile phone, and chargers.',
      'Install all required software before the event.'
    ],
    coordinators: [
      { name: 'Nuthan A M', phone: '9845541168' },
      { name: 'Harshitha S', phone: '6363323303' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'drishti',
    title: 'DRISHTI',
    subtitle: 'The Royal Lens (Photography)',
    category: EventCategory.PHOTOGRAPHY,
    description: 'Capture the essence of the fest. An on-spot photography and videography challenge.',
    prizePool: '₹3,000',
    registrationFee: '₹200',
    teamSize: 'Solo',
    maxMembers: 1,
    rules: [
      'This is an individual event.',
      'Registration fee: Rs. 200.',
      'Maximum 3 participants per college.',
      'Participants must assemble 30 minutes before the event.',
      'All editing must be done in front of volunteers in the designated area.',
      'Malpractice (taking help from others) will result in immediate elimination.',
      'Edited photos and videos must be submitted within the given time.',
      'No additional people other than participants are allowed in the event area.',
      'Participants must use only the provided equipment and software (or own mobile as specified).',
      'All submitted content must be original.'
    ],
    coordinators: [
      { name: 'Pooja R', phone: '8296077558' },
      { name: 'Akash Y', phone: '6363614954' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'garuda',
    title: 'GARUDA ANVESHANA',
    subtitle: 'Treasure Hunt',
    category: EventCategory.TREASURE_HUNT,
    description: 'Decipher clues and navigate the empire to find the hidden treasure.',
    prizePool: '₹7,000',
    registrationFee: '₹400 / Team',
    teamSize: '4 Members',
    maxMembers: 4,
    rules: [
      'Each team must have 4 members.',
      'Registration fee: ₹400.',
      'A maximum of 2 teams per college is allowed.',
      'Carry proof of registration or event ID throughout the event.',
      'Respect others: any form of misconduct will lead to disqualification.',
      'Do not tamper with other teams, property, or seek external help.',
      'Do not destroy or misuse clues or event items.',
      'Follow all campus rules and stay within the allowed areas.',
      'No outsider assistance is permitted.'
    ],
    coordinators: [
      { name: 'Nithya Tejavi', phone: '7899422270' },
      { name: 'Shashiraj', phone: '9353042284' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1599939571322-792a326991f2?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'raja-neeti',
    title: 'RAJA NEETI SABHA',
    subtitle: 'IT Manager',
    category: EventCategory.MANAGEMENT,
    description: 'Test your leadership, crisis management, and decision-making skills.',
    prizePool: '₹3,000',
    registrationFee: '₹200',
    teamSize: 'Solo',
    maxMembers: 1,
    rules: [
      'This is an individual event.',
      'Registration fee: Rs. 200.',
      'Maximum 3 participants per college.',
      'Smartphones may be used only when instructed.',
      'Rules for each round will be announced on the spot.',
      'Malpractice will lead to immediate disqualification.',
      'Judges decisions are final and binding.',
      'Participants must demonstrate problem-solving and decision making skills.',
      'Professional behavior is expected throughout the event.'
    ],
    coordinators: [
      { name: 'Madhumitha S', phone: '9482139571' },
      { name: 'Jeevan G', phone: '9686585450' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'prajna',
    title: 'PRAJNA PARIKSHA',
    subtitle: 'The Test of Wisdom (IT Quiz)',
    category: EventCategory.QUIZ,
    description: 'A battle of wits covering tech, coding, and general IT knowledge.',
    prizePool: '₹5,000',
    registrationFee: '₹300 / Team',
    teamSize: '2 Members',
    maxMembers: 2,
    rules: [
      'Team size: 2 participants.',
      'Registration fee: ₹300.',
      'Maximum 2 teams per college.',
      'Judges decision is final.',
      'Rules will be disclosed on the spot.',
      'Each round will have a fixed time limit.',
      'Rounds will cover programming languages and computer networks.',
      'Participants must bring their own mobile devices and internet.',
      'Malpractice will lead to immediate disqualification.'
    ],
    coordinators: [
      { name: 'Likitha P Kumar', phone: '8660290349' },
      { name: 'Rahul H N', phone: '9632607249' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'chakravyuha',
    title: 'CHAKRAVYUHA WARZONE',
    subtitle: 'BGMI',
    category: EventCategory.GAMING,
    description: 'Survive the battleground. Squad up and dominate the warzone.',
    prizePool: '₹7,000',
    registrationFee: '₹500 / Team',
    teamSize: '4 Members',
    maxMembers: 4,
    rules: [
      'Number of participants per team: 4.',
      'Registration fee: ₹500.',
      'Maximum 2 teams per college.',
      'Participants must carry their valid ID proof for the event.',
      'The squad must be physically present for the match.',
      'The game will be played in custom rooms created by the host.',
      'Rules for each round will be disclosed on the spot.',
      'Exploiting bugs or glitches for unfair advantage will lead to disqualification.',
      'Every round will have a fixed time duration.',
      'Participants must carry their own mobile devices.'
    ],
    coordinators: [
      { name: 'Achyuth U S', phone: '9148686067' },
      { name: 'Bindusree K S', phone: '8904464903' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 'dhwani',
    title: 'DHWANI YUDDHA',
    subtitle: 'Tech Talk',
    category: EventCategory.SPEAKING,
    description: 'Articulate your ideas. A platform to speak on emerging technologies.',
    prizePool: '₹4,000',
    registrationFee: '₹250',
    teamSize: 'Solo',
    maxMembers: 1,
    rules: [
      'This is a solo event.',
      'Registration fee: ₹250.',
      'Maximum 3 participants per college.',
      'The competition will consist of 3 rounds.',
      'No preparation time will be provided.',
      'Carrying paper materials or electronic devices is strictly prohibited.',
      'Use of offensive language or breaking any rule will lead to disqualification.',
      'The judges decision is final and binding.',
      'The event will test knowledge, creativity, and presentation skills.',
      'In case of a tie, a tiebreaker round will be conducted.'
    ],
    coordinators: [
      { name: 'Mohith K V', phone: '9353938681' },
      { name: 'Snehashree N', phone: '8088816630' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop'
  }
];

export const TIMELINE: TimelineItem[] = [
  { time: '09:00 AM - 09:15 AM', title: 'The Royal Inaugural', description: 'Opening Ceremony' },
  { time: '09:15 AM - 01:00 PM', title: 'The Battles Begin', description: 'Event Rounds Commenced' },
  { time: '01:00 PM - 02:00 PM', title: 'Grand Feast', description: 'Lunch Break' },
  { time: '02:00 PM - 04:00 PM', title: 'The Final Showdown', description: 'Concluding Rounds' },
  { time: '04:30 PM - 05:30 PM', title: 'The Final Decree', description: 'Valedictory & Prize Distribution' },
  { time: '05:30 PM Onwards', title: 'ZERONE YUGA', description: 'The Saga Concludes' },
];

export const FACULTY_COORDINATORS: Coordinator[] = [
  { name: 'Dr. H S VijayaKumar', phone: '' },
  { name: 'Dr. Prashanth G K', phone: '' }
];

export const STUDENT_COORDINATORS: Coordinator[] = [
  { name: 'Khushi Jagadeesh', phone: '9019854409' },
  { name: 'Lingadevaru H P', phone: '9019746824' }
];
