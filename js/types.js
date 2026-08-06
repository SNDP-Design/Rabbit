/* ==========================================================================
   Rabbit - Type Definitions & Constants (Explee Autonomous Agents)
   ========================================================================== */

export const AGENT_IDS = {
  KODA: 'koda',       // Learns what you sell (Domain & Competitor Crawler)
  ATLAS: 'atlas',     // Figures out who buys it (ICP & Fit Scorer)
  NOVA: 'nova',       // Finds exact decision makers (536M+ Profile Sourcing)
  PULSE: 'pulse',     // Writes personalized 1:1 emails
  ECHO: 'echo',       // Handles replies & books demos
  APEX: 'apex'        // Learns what works & doubles down (Scaling Engine)
};

export const PIPELINE_STAGES = [
  { id: 'discovered', label: '1. Domain Learner', color: '#06B6D4' },
  { id: 'enriched', label: '2. Fit Scored (90%+)', color: '#6366F1' },
  { id: 'contacted', label: '3. Personal Email Sent', color: '#A855F7' },
  { id: 'engaged', label: '4. Reply Handled', color: '#F59E0B' },
  { id: 'meeting_booked', label: '5. Demo Booked', color: '#10B981' }
];

export const ICP_SEGMENTS = [
  { name: 'Event Designers', fitScore: '92%', status: 'Scaling', costPerLead: '$1.69' },
  { name: 'Wedding Floral Studios', fitScore: '88%', status: 'Scaling', costPerLead: '$1.87' },
  { name: 'Wedding Planners', fitScore: '85%', status: 'Working', costPerLead: '$2.02' },
  { name: 'Houses of Worship', fitScore: '45%', status: 'Paused', costPerLead: '$6.33' },
  { name: 'Property Management', fitScore: '42%', status: 'Paused', costPerLead: '$5.80' }
];
