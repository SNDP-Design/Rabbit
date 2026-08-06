/* ==========================================================================
   AutoGTM - Type Definitions & Constants
   ========================================================================== */

export const AGENT_IDS = {
  ATLAS: 'atlas',
  NOVA: 'nova',
  PULSE: 'pulse',
  VELOCITY: 'velocity',
  ECHO: 'echo',
  APEX: 'apex'
};

export const PIPELINE_STAGES = [
  { id: 'discovered', label: 'Discovered', color: '#06B6D4' },
  { id: 'enriched', label: 'Enriched & Scored', color: '#6366F1' },
  { id: 'contacted', label: 'Outreach Active', color: '#A855F7' },
  { id: 'engaged', label: 'Inbound Engaged', color: '#F59E0B' },
  { id: 'meeting_booked', label: 'Meeting Booked', color: '#10B981' }
];

export const INTENT_LEVELS = {
  HIGH: 'High (80-100)',
  MEDIUM: 'Medium (50-79)',
  LOW: 'Low (0-49)'
};

export const INBOUND_SENTIMENTS = {
  INTERESTED: { label: 'Interested', color: '#10B981', icon: 'check-circle' },
  OBJECTION_PRICING: { label: 'Pricing Objection', color: '#F59E0B', icon: 'dollar-sign' },
  OBJECTION_TIMING: { label: 'Timing / Bad Fit', color: '#F43F5E', icon: 'clock' },
  COMPETITOR: { label: 'Using Competitor', color: '#A855F7', icon: 'shield' },
  UNSUBSCRIBE: { label: 'Unsubscribe Request', color: '#64748B', icon: 'user-x' }
};
