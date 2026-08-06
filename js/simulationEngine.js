/* ==========================================================================
   AutoGTM - Real-Time Autonomous Simulation Engine
   ========================================================================== */

import { AGENT_IDS } from './types.js';

export class SimulationEngine {
  constructor(state, onStateChange, onLogAdded) {
    this.state = state;
    this.onStateChange = onStateChange;
    this.onLogAdded = onLogAdded;
    this.isRunning = true;
    this.speed = 3000; // ms per tick
    this.timerId = null;
    this.stepIndex = 0;

    // Simulation steps generator pool
    this.simulationScenarios = [
      {
        agentId: AGENT_IDS.ATLAS,
        agentName: 'Atlas',
        color: '#06B6D4',
        task: 'Scraping Crunchbase & LinkedIn for newly funded AI & B2B SaaS startups ($5M+ Series A)...',
        thought: 'Identified 8 new target companies matching ICP criteria: CloudScale, NovaTech, AI Dynamics.',
        log: 'Indexed 8 new accounts meeting target ARR ($5M-$20M) and hiring signals.'
      },
      {
        agentId: AGENT_IDS.NOVA,
        agentName: 'Nova',
        color: '#6366F1',
        task: 'Enriching decision-maker contact details (CTOs, VPs of Sales) with 99% email verification...',
        thought: 'Sourced email & phone for Elena Rostova (VP Sales). Intent score calculated: 89/100.',
        log: 'Enriched lead: Elena Rostova (VP Sales at FinPulse). Verified email: elena.r@finpulse.com'
      },
      {
        agentId: AGENT_IDS.PULSE,
        agentName: 'Pulse',
        color: '#EC4899',
        task: 'Generating hyper-personalized email copy referencing recent podcast & hiring triggers...',
        thought: 'Crafted 1:1 copy mentioning recent Series A funding round and Snowflake tech stack.',
        log: 'Generated personalized 3-step sequence for 12 new qualified decision makers.'
      },
      {
        agentId: AGENT_IDS.VELOCITY,
        agentName: 'Velocity',
        color: '#A855F7',
        task: 'Dispatching Step 1 email sequence via dedicated IP warm-up pool with custom tracking...',
        thought: 'Dispatched 24 outbound emails. SPF/DKIM verification passed. 0 bounce rate.',
        log: 'Outreach sent to 24 prospects. Open rate prediction: 67.2%.'
      },
      {
        agentId: AGENT_IDS.ECHO,
        agentName: 'Echo',
        color: '#F59E0B',
        task: 'Evaluating inbound reply from Marcus Vance (CloudScale Systems)...',
        thought: 'Detected reply intent: "Pricing Inquiry". Formulated high-conversion ROI breakdown response.',
        log: 'Objection AI auto-drafted reply with 4.2x ROI proof and Calendly link.'
      },
      {
        agentId: AGENT_IDS.APEX,
        agentName: 'Apex',
        color: '#10B981',
        task: 'Analyzing Subject Line A/B testing performance across 600 delivered messages...',
        thought: 'Subject Line B outperformed Subject Line A by +24.6% open rate. Auto-promoting B to primary.',
        log: 'Apex Agent automatically updated campaign sequence subject line to top-performing variant B.'
      }
    ];
  }

  start() {
    if (this.timerId) return;
    this.isRunning = true;
    this.scheduleNextTick();
  }

  stop() {
    this.isRunning = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  setSpeed(ms) {
    this.speed = ms;
  }

  scheduleNextTick() {
    this.timerId = setTimeout(() => {
      if (this.isRunning) {
        this.tick();
        this.scheduleNextTick();
      }
    }, this.speed);
  }

  tick() {
    const scenario = this.simulationScenarios[this.stepIndex % this.simulationScenarios.length];
    this.stepIndex++;

    // Update Agent state
    const agent = this.state.agents.find(a => a.id === scenario.agentId);
    if (agent) {
      agent.currentTask = scenario.task;
      agent.thoughtStream = scenario.thought;
      agent.actionsToday += Math.floor(Math.random() * 3) + 1;
    }

    // Add log entry
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const newLog = {
      id: 'log-' + Date.now(),
      time: timestamp,
      agentId: scenario.agentId,
      agentName: scenario.agentName,
      color: scenario.color,
      text: scenario.log
    };

    this.state.logs.unshift(newLog);
    if (this.state.logs.length > 50) this.state.logs.pop();

    // Randomly generate a new lead occasionally
    if (Math.random() > 0.6) {
      this.simulateNewLead();
    }

    // Notify UI subscribers
    if (this.onStateChange) this.onStateChange(this.state);
    if (this.onLogAdded) this.onLogAdded(newLog);
  }

  simulateNewLead() {
    const names = ['Jordan Lee', 'Taylor Vance', 'Alex Morgan', 'Chloe Bennet', 'Liam Wright'];
    const companies = ['Aether AI', 'DataSphere', 'Vectra Cloud', 'PulsePay', 'HyperScale'];
    const titles = ['VP of Engineering', 'Head of Revenue', 'CTO', 'Director of Sales', 'Chief Product Officer'];

    const idx = Math.floor(Math.random() * names.length);
    const newLead = {
      id: 'lead-sim-' + Date.now(),
      name: names[idx],
      title: titles[idx],
      company: companies[idx],
      industry: 'Software & Technology',
      employees: (Math.floor(Math.random() * 200) + 40).toString(),
      email: names[idx].toLowerCase().replace(' ', '.') + '@' + companies[idx].toLowerCase().replace(' ', '') + '.com',
      phone: '+1 (415) ' + Math.floor(100+Math.random()*900) + '-' + Math.floor(1000+Math.random()*9000),
      linkedin: 'linkedin.com/in/' + names[idx].toLowerCase().replace(' ', ''),
      stage: 'discovered',
      intentScore: Math.floor(Math.random() * 30) + 70,
      buyingSignals: ['Hiring ML Engineers', 'New product launch'],
      lastActivity: 'Discovered by Atlas Agent via intent signal scan',
      history: [
        { time: 'Just now', text: 'Atlas indexed prospect profile matching target ICP.' }
      ]
    };

    this.state.leads.unshift(newLead);
  }
}
