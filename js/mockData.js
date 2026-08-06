/* ==========================================================================
   Rabbit - Realistic Seed Data (Explee Autonomous Agent Pipeline)
   ========================================================================== */

import { AGENT_IDS } from './types.js';

export const initialAgents = [
  {
    id: AGENT_IDS.KODA,
    name: 'Koda',
    role: 'Domain & Offer Intelligence',
    avatar: '🔍',
    color: '#06B6D4',
    status: 'Active',
    efficiency: '99.8%',
    actionsToday: 1840,
    currentTask: 'Analyzing larksilk.com: "Wholesale silk flowers & greenery for hotels & florists (45+ yrs)"...',
    thoughtStream: 'Studying competitors: afloral.com, nearlynatural.com, silksareforever.com. Extracted value prop: "Bulk silk boxes shipped from NJ save 60% vs fresh flowers".'
  },
  {
    id: AGENT_IDS.ATLAS,
    name: 'Atlas',
    role: 'ICP & Fit Score Segmenter',
    avatar: '📊',
    color: '#6366F1',
    status: 'Active',
    efficiency: '99.2%',
    actionsToday: 1290,
    currentTask: 'Calculating ICP fit scores across 5 market verticals...',
    thoughtStream: 'Event Designers (92% fit, $1.69/lead), Wedding Floral Studios (88% fit), Country Clubs (79% fit). Paused low-converting Property Management.'
  },
  {
    id: AGENT_IDS.NOVA,
    name: 'Nova',
    role: '536M+ Contact Sourcing',
    avatar: '🎯',
    color: '#EC4899',
    status: 'Active',
    efficiency: '98.9%',
    actionsToday: 940,
    currentTask: 'Querying GPU cluster covering 536M+ people profiles for verified owners & lead designers...',
    thoughtStream: 'Discovered Rachel Whitfield (Owner @ Sweet Pea Events), Dana Okafor (Lead Designer @ Tupelo Honey). Email verification rate: 100%.'
  },
  {
    id: AGENT_IDS.PULSE,
    name: 'Pulse',
    role: '1:1 Hyper-Personalized Emailer',
    avatar: '✍️',
    color: '#A855F7',
    status: 'Active',
    efficiency: '97.9%',
    actionsToday: 710,
    currentTask: 'Synthesizing context-aware email for Dana Okafor (Tupelo Honey Flower)...',
    thoughtStream: 'Drafted note referencing Tupelo Honey full-scale event installs & venue lighting durability benefits.'
  },
  {
    id: AGENT_IDS.ECHO,
    name: 'Echo',
    role: 'Objection AI & Auto-Booker',
    avatar: '💬',
    color: '#F59E0B',
    status: 'Active',
    efficiency: '96.5%',
    actionsToday: 410,
    currentTask: 'Evaluating inbound question from Dana: "How do these hold up under venue lighting?"...',
    thoughtStream: 'Replied detailing flame-retardant UV silk specs. Auto-dispatched invite for Tuesday 2:00 PM.'
  },
  {
    id: AGENT_IDS.APEX,
    name: 'Apex',
    role: 'Pipeline Scaler & Double-Down AI',
    avatar: '🧠',
    color: '#10B981',
    status: 'Active',
    efficiency: '99.6%',
    actionsToday: 240,
    currentTask: 'Doubling down on Event Designers vertical ($1.69 CAC)...',
    thoughtStream: 'Re-allocated 40% daily outreach budget from low-performing Houses of Worship to Event Designers.'
  }
];

export const initialCampaigns = [
  {
    id: 'camp-explee-1',
    name: 'Wholesale Silk Flowers — Event Designers & Studios',
    targetICP: 'Event Designers, Wedding Floral Studios & Planners',
    valueProposition: 'Premium silk by the box shipped from NJ—one buy carries across events with zero wilting under venue lights.',
    status: 'Scaling (Autonomous)',
    budgetAllocated: '$1,800 / mo',
    leadsTargeted: 580,
    contacted: 412,
    replies: 68,
    meetingsBooked: 22,
    conversionRate: '5.34%',
    channels: ['Email (Pre-warmed)']
  }
];

export const initialLeads = [
  {
    id: 'lead-ex-1',
    name: 'Dana Okafor',
    title: 'Lead Designer',
    company: 'Tupelo Honey Flower',
    industry: 'Floral Design & Events',
    employees: '24',
    email: 'dana@tupelohoneyflower.com',
    phone: '+1 (415) 302-8819',
    linkedin: 'linkedin.com/in/dana-okafor-design',
    stage: 'meeting_booked',
    intentScore: 94,
    buyingSignals: ['Executes full-scale event installs', 'High monthly floral expense'],
    lastActivity: 'Demo booked: Tue 14:00 EST (Confirmed by Echo)',
    history: [
      { time: '5 mins ago', text: 'Echo (AI) auto-booked Tuesday 2pm demo after answering venue lighting question.' },
      { time: '35 mins ago', text: 'Dana replied: "Interesting, can you do Tuesday 2pm?"' },
      { time: '1 day ago', text: 'Pulse sent 1:1 email referencing Tupelo Honey install projects.' }
    ]
  },
  {
    id: 'lead-ex-2',
    name: 'Rachel Whitfield',
    title: 'Owner & Creative Director',
    company: 'Sweet Pea Events',
    industry: 'Wedding & Corporate Events',
    employees: '18',
    email: 'rachel@sweetpeaevents.com',
    phone: '+1 (212) 890-4412',
    linkedin: 'linkedin.com/in/rachel-whitfield-events',
    stage: 'engaged',
    intentScore: 91,
    buyingSignals: ['Scaling luxury wedding package', 'Evaluating bulk decor suppliers'],
    lastActivity: 'Replied: "Can you send a sample box to our NYC studio?"',
    history: [
      { time: '15 mins ago', text: 'Echo drafted sample box dispatch confirmation & Calendly link.' },
      { time: '2 hours ago', text: 'Rachel opened email (3rd open).' }
    ]
  },
  {
    id: 'lead-ex-3',
    name: 'Mia Castellanos',
    title: 'Founder',
    company: 'The Bloom Lab',
    industry: 'Event Floral Studio',
    employees: '12',
    email: 'mia@thebloomlab.co',
    phone: '+1 (312) 667-9021',
    linkedin: 'linkedin.com/in/miacastellanos-bloom',
    stage: 'contacted',
    intentScore: 88,
    buyingSignals: ['Hiring 2 Floral Stylists', 'Expanded studio location'],
    lastActivity: 'Pulse dispatched personal email mentioning NJ box shipping benefit',
    history: [
      { time: '4 hours ago', text: 'Nova enriched verified work email & phone number.' }
    ]
  }
];

export const initialSequences = [
  {
    id: 'seq-ex-1',
    stepNumber: 1,
    channel: 'Pre-Warmed Email',
    delay: 'Day 1 (Immediate)',
    subject: 'Larksilk x {{company}}',
    body: `Hi {{first_name}},

Saw {{company}} designs full-scale event installs. At that pace, fresh florals get expensive fast and wilt under venue lights. Larksilk ships premium silk by the box from NJ, so one buy carries across events.

Want a sample box to compare against your last fresh order?

Best regards,
Rabbit Autonomous Agent Workforce (Powered by Explee)`,
    metrics: { sent: 412, opened: '74.2%', clicked: '34.8%', replied: '16.5%' }
  }
];

export const initialInboxMessages = [
  {
    id: 'msg-ex-1',
    leadName: 'Dana Okafor',
    company: 'Tupelo Honey Flower',
    sentimentKey: 'INTERESTED',
    leadMessage: 'How do these hold up under venue lighting? Also, can you do Tuesday 2pm for a quick call?',
    aiAnalysis: 'Prospect asked about venue light durability and proposed Tuesday 2pm time slot.',
    aiProposedReply: `Hi Dana,

Our silk florals are UV and flame-retardant treated, so they hold up crisp under intense venue spotlights without fading or wilting.

Tuesday 2pm EST works perfectly! I just dispatched the calendar invite to dana@tupelohoneyflower.com.

Talk then!`,
    status: 'AI Replied & Calendar Invite Sent'
  }
];

export const initialOptimizationLogs = [
  {
    id: 'opt-ex-1',
    time: '10 mins ago',
    agent: 'Apex',
    type: 'Vertical Scaling',
    description: 'Event Designers vertical scaled ($1.69/lead, 92% fit score). Paused low-converting Property Management ($5.80/lead).'
  },
  {
    id: 'opt-ex-2',
    time: '1 hour ago',
    agent: 'Apex',
    type: 'Domain Warming',
    description: '100% inbox delivery rate across 412 emails using pre-warmed domain infrastructure.'
  }
];
