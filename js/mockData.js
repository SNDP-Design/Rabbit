/* ==========================================================================
   AutoGTM - Realistic Initial Seed Data
   ========================================================================== */

import { AGENT_IDS } from './types.js';

export const initialAgents = [
  {
    id: AGENT_IDS.ATLAS,
    name: 'Atlas',
    role: 'Market Intelligence & ICP Crawler',
    avatar: '🌐',
    color: '#06B6D4',
    status: 'Active',
    efficiency: '99.4%',
    actionsToday: 1420,
    currentTask: 'Analyzing funding signals for Series A-B FinTech startups adopting AI infrastructure...',
    thoughtStream: 'Detected 14 tech companies hiring VP of Sales with active Snowflake + Kubernetes tech stack.'
  },
  {
    id: AGENT_IDS.NOVA,
    name: 'Nova',
    role: 'Lead Sourcing & Intent Scorer',
    avatar: '🎯',
    color: '#6366F1',
    status: 'Active',
    efficiency: '98.8%',
    actionsToday: 890,
    currentTask: 'Verifying work emails and mobile numbers for 45 newly scraped CTOs & Heads of Product...',
    thoughtStream: 'Intent score computed: 94/100 for Sarah Lin (CTO at Datavolt) due to recent SOC2 compliance job postings.'
  },
  {
    id: AGENT_IDS.PULSE,
    name: 'Pulse',
    role: 'Hyper-Personalized Copywriter',
    avatar: '✍️',
    color: '#EC4899',
    status: 'Active',
    efficiency: '97.6%',
    actionsToday: 640,
    currentTask: 'Drafting tailored 3-step email & LinkedIn outreach sequence targeting B2B SaaS Founders...',
    thoughtStream: 'Synthesized value prop matching prospect recent podcast mention on lowering API latency.'
  },
  {
    id: AGENT_IDS.VELOCITY,
    name: 'Velocity',
    role: 'Omnichannel Drip Executor',
    avatar: '⚡',
    color: '#A855F7',
    status: 'Active',
    efficiency: '99.9%',
    actionsToday: 2150,
    currentTask: 'Executing automated Step 2 LinkedIn connection request drip with personalized node...',
    thoughtStream: 'Dispatched 38 emails with 100% SPF/DKIM verification. Delivery rate: 100%.'
  },
  {
    id: AGENT_IDS.ECHO,
    name: 'Echo',
    role: 'Objection AI & Meeting Booker',
    avatar: '💬',
    color: '#F59E0B',
    status: 'Active',
    efficiency: '96.2%',
    actionsToday: 320,
    currentTask: 'Analyzing inbound response from Marcus Vance (Head of Growth at CloudScale)...',
    thoughtStream: 'Classified reply as "Pricing Objection". Generated counter-argument showcasing 4.2x ROI case study.'
  },
  {
    id: AGENT_IDS.APEX,
    name: 'Apex',
    role: 'GTM Strategy & Self-Optimizer',
    avatar: '🧠',
    color: '#10B981',
    status: 'Active',
    efficiency: '99.1%',
    actionsToday: 180,
    currentTask: 'Evaluating Subject Line Variant B performance vs Variant A across 400 delivered messages...',
    thoughtStream: 'Variant B ("Quick thought on [Company]\'s AI pipeline") achieved +23.4% higher open rate. Auto-promoting to primary.'
  }
];

export const initialCampaigns = [
  {
    id: 'camp-1',
    name: 'Q3 Enterprise AI Infrastructure Outreach',
    targetICP: 'Series A-C Tech Companies (50-250 employees)',
    valueProposition: 'Automate high-intent outbound prospecting and reduce customer acquisition costs by 60%.',
    status: 'Active (Autonomous)',
    budgetAllocated: '$2,400 / mo',
    leadsTargeted: 450,
    contacted: 312,
    replies: 48,
    meetingsBooked: 14,
    conversionRate: '4.48%',
    channels: ['Email', 'LinkedIn', 'X DM']
  },
  {
    id: 'camp-2',
    name: 'FinTech SOC2 & Security Leaders Drive',
    targetICP: 'FinTech & Banking API Providers (100-500 employees)',
    valueProposition: 'Self-operating compliance prospect intelligence and automated decision-maker engagement.',
    status: 'Active (Autonomous)',
    budgetAllocated: '$1,800 / mo',
    leadsTargeted: 280,
    contacted: 195,
    replies: 34,
    meetingsBooked: 9,
    conversionRate: '4.61%',
    channels: ['Email', 'LinkedIn']
  }
];

export const initialLeads = [
  {
    id: 'lead-1',
    name: 'Sarah Lin',
    title: 'CTO & Co-Founder',
    company: 'DataVolt AI',
    industry: 'Data Infrastructure',
    employees: '85',
    email: 'sarah.lin@datavolt.ai',
    phone: '+1 (415) 892-3019',
    linkedin: 'linkedin.com/in/sarahlin-tech',
    stage: 'meeting_booked',
    intentScore: 94,
    buyingSignals: ['Hiring 4 ML Engineers', 'Raised $14M Series A', 'Evaluating LLM Tooling'],
    lastActivity: 'Accepted meeting invite for Aug 12, 2:00 PM EST',
    history: [
      { time: '10 mins ago', text: 'Echo (AI) automatically sent Calendly link after handling pricing question.' },
      { time: '2 hours ago', text: 'Sarah replied: "Sounds interesting. What does pricing look like for 50 seats?"' },
      { time: '1 day ago', text: 'Velocity executed Email Step 1 (Personalized intro mentioning Series A).' }
    ]
  },
  {
    id: 'lead-2',
    name: 'Marcus Vance',
    title: 'VP of Growth',
    company: 'CloudScale Systems',
    industry: 'DevOps & Cloud',
    employees: '160',
    email: 'm.vance@cloudscalesystems.io',
    phone: '+1 (650) 412-9901',
    linkedin: 'linkedin.com/in/marcus-vance-growth',
    stage: 'engaged',
    intentScore: 88,
    buyingSignals: ['Tech stack changed to Snowflake', 'Active on X discussing GTM scaling'],
    lastActivity: 'Replied: "Is this fully integrated with HubSpot?"',
    history: [
      { time: '25 mins ago', text: 'Echo drafted response detailing native bi-directional HubSpot sync.' },
      { time: '4 hours ago', text: 'Marcus opened Email Step 2 (3rd time open).' }
    ]
  },
  {
    id: 'lead-3',
    name: 'Elena Rostova',
    title: 'Head of Sales Operations',
    company: 'FinPulse Tech',
    industry: 'FinTech',
    employees: '210',
    email: 'elena.rostova@finpulse.com',
    phone: '+1 (212) 554-0192',
    linkedin: 'linkedin.com/in/elenarostova',
    stage: 'contacted',
    intentScore: 79,
    buyingSignals: ['Expanded SDR team', 'High employee growth rate (+35%)'],
    lastActivity: 'LinkedIn Connection Request Sent with custom note by Velocity',
    history: [
      { time: '3 hours ago', text: 'Pulse auto-generated personalized LinkedIn invitation.' },
      { time: '1 day ago', text: 'Nova enriched lead score from 65 -> 79 based on new hiring data.' }
    ]
  },
  {
    id: 'lead-4',
    name: 'David K. Chen',
    title: 'Chief Revenue Officer',
    company: 'NexusFlow',
    industry: 'Enterprise Software',
    employees: '340',
    email: 'david.chen@nexusflow.dev',
    phone: '+1 (408) 773-9021',
    linkedin: 'linkedin.com/in/davidkchen-cro',
    stage: 'enriched',
    intentScore: 82,
    buyingSignals: ['Replaced legacy CRM', 'Attended Gartner GTM Summit'],
    lastActivity: 'Nova verified work email with 99% deliverability confidence',
    history: [
      { time: '5 hours ago', text: 'Atlas identified profile matching ICP filter: CRO at Mid-market SaaS.' }
    ]
  },
  {
    id: 'lead-5',
    name: 'Amara Okafor',
    title: 'Director of Product Marketing',
    company: 'Synthetix Cloud',
    industry: 'AI Platforms',
    employees: '95',
    email: 'amara@synthetix.cloud',
    phone: '+1 (312) 991-4402',
    linkedin: 'linkedin.com/in/amara-okafor-pmm',
    stage: 'discovered',
    intentScore: 71,
    buyingSignals: ['Launched new product line', 'Evaluating outbound automation'],
    lastActivity: 'Atlas crawled job board posting for GTM Specialist',
    history: [
      { time: '6 hours ago', text: 'Atlas indexed company domain and enriched tech stack.' }
    ]
  }
];

export const initialSequences = [
  {
    id: 'seq-1',
    stepNumber: 1,
    channel: 'Email',
    delay: 'Day 1 (Immediate)',
    subject: 'Quick question regarding {{company}}\'s outbound growth',
    body: `Hi {{first_name}},

Noticed {{company}} recently expanded your team and launched {{buying_signal}}. Congrats on the momentum!

Most {{title}}s we work with spend 20+ hours a week manually researching target accounts and crafting cold copy. Our autonomous AI workforce operates 24/7—sourcing high-intent ICP leads, writing tailored 1:1 copy, and booking qualified meetings directly on your calendar.

Would you be open to seeing a 2-minute live breakdown of how our agents handle GTM for tech teams like yours?

Best regards,
Rabbit Autonomous Agent Workforce`,
    metrics: { sent: 312, opened: '68.4%', clicked: '24.1%', replied: '14.2%' }
  },
  {
    id: 'seq-2',
    stepNumber: 2,
    channel: 'LinkedIn',
    delay: 'Day 3 (+48 hours)',
    subject: 'LinkedIn Connection Request',
    body: `Hi {{first_name}}, saw your recent post regarding {{buying_signal}} at {{company}}. Impressive growth! Would love to connect and share insights on autonomous AI GTM strategies.`,
    metrics: { sent: 195, accepted: '42.6%', replied: '18.9%' }
  },
  {
    id: 'seq-3',
    stepNumber: 3,
    channel: 'Email (Follow-up)',
    delay: 'Day 5 (+96 hours)',
    subject: 'Re: Quick question regarding {{company}}\'s outbound growth',
    body: `Hi {{first_name}},

Following up on my note earlier. We just published a quick breakdown of how an AI agent workforce generated 42 qualified meetings for a Series A SaaS company in 14 days without human intervention.

Here is the direct case study link: autogtm.ai/case-studies/series-a-roi

Let me know if Wednesday afternoon works for a quick 10-minute demo!`,
    metrics: { sent: 140, opened: '59.1%', clicked: '31.5%', replied: '11.8%' }
  }
];

export const initialInboxMessages = [
  {
    id: 'msg-1',
    leadName: 'Marcus Vance',
    company: 'CloudScale Systems',
    sentimentKey: 'OBJECTION_PRICING',
    leadMessage: 'Hi Rabbit team, thanks for reaching out. We like the autonomous agent idea, but our budget for new sales software is tight until Q4. What is the standard starting tier?',
    aiAnalysis: 'Prospect shows real interest but raises upfront budget objection. Atlas computed prospect ARR at $12M.',
    aiProposedReply: `Hi Marcus,

Completely understand budget cycles! Many growth leaders we partner with were in the exact same position before realizing Rabbit replaces 3 legacy software subscriptions (saving ~$1,800/mo immediately).

We offer flexible usage-based rollout tiers starting at $490/mo with zero annual contract commitment.

Would you be open to a quick 10-min overview this Thursday to see if the immediate ROI makes sense for Q3? Here is my instant booking link: rabbit.ai/book/marcus`,
    status: 'AI Counter-Drafted (Ready to Send)'
  },
  {
    id: 'msg-2',
    leadName: 'Dr. Aris Thorne',
    company: 'CyberShield Systems',
    sentimentKey: 'INTERESTED',
    leadMessage: 'This caught my attention. Does your autonomous agent integrate directly with Salesforce CRM and custom webhooks?',
    aiAnalysis: 'High intent prospect asking technical integration question. Nova confirmed Salesforce stack in use.',
    aiProposedReply: `Hi Dr. Thorne,

Yes, absolutely! Rabbit features native bi-directional synchronization with Salesforce CRM, HubSpot, and custom REST Webhooks. Every agent action, enriched lead data, and meeting booking syncs automatically.

I can set up a live integration demo for you tomorrow at 2:00 PM EST. Shall I lock in that slot?`,
    status: 'AI Replied & Meeting Link Dispatched'
  }
];

export const initialOptimizationLogs = [
  {
    id: 'opt-1',
    time: '12 mins ago',
    agent: 'Apex',
    type: 'A/B Testing Winner',
    description: 'Subject line "Quick thought on {{company}}\'s outbound" beat "Streamline your sales process" (+26.8% open rate boost across 500 emails).'
  },
  {
    id: 'opt-2',
    time: '1 hour ago',
    agent: 'Apex',
    type: 'Channel Reallocation',
    description: 'Reallocated 25% daily outreach volume from Cold Email to LinkedIn InMail due to +34% higher response rate on FinTech buyer persona.'
  },
  {
    id: 'opt-3',
    time: '3 hours ago',
    agent: 'Apex',
    type: 'Tone Adjustment',
    description: 'Shifted Pulse agent copy tone from "Formal Corporate" to "Direct Founder-to-Founder", yielding +14.2% reply rate.'
  }
];
