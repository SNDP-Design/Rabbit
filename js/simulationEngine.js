/* ==========================================================================
   Rabbit - Real-Time Simulation Engine (Explee Pipeline)
   ========================================================================== */

import { AGENT_IDS } from './types.js';

export class SimulationEngine {
  constructor(state, onStateChange, onLogAdded) {
    this.state = state;
    this.onStateChange = onStateChange;
    this.onLogAdded = onLogAdded;
    this.isRunning = true;
    this.speed = 3000;
    this.timerId = null;
    this.stepIndex = 0;

    this.simulationScenarios = [
      {
        agentId: AGENT_IDS.KODA,
        agentName: 'Koda',
        color: '#06B6D4',
        task: 'Crawling target domain & studying competitor landscape (afloral.com, nearlynatural.com)...',
        thought: 'Extracted product offering: Wholesale silk flowers for event designers. 60-second setup complete.',
        log: 'Koda Agent finished studying target website & synthesized core value proposition.'
      },
      {
        agentId: AGENT_IDS.ATLAS,
        agentName: 'Atlas',
        color: '#6366F1',
        task: 'Segmentation AI calculating ICP Fit Scores (Event Designers 92%, Planners 85%)...',
        thought: 'Identified highest conversion opportunity in Event Floral Studios ($1.69/lead).',
        log: 'Atlas Agent computed fit score 92% for Event Designers vertical.'
      },
      {
        agentId: AGENT_IDS.NOVA,
        agentName: 'Nova',
        color: '#EC4899',
        task: 'Querying GPU cluster covering 536M+ people profiles for verified owners...',
        thought: 'Sourced email for Michelle Leo (Owner @ Michelle Leo Events). Email verified 100%.',
        log: 'Nova Agent sourced 12 verified CEO/Founder contacts from 536M+ database.'
      },
      {
        agentId: AGENT_IDS.PULSE,
        agentName: 'Pulse',
        color: '#A855F7',
        task: 'Writing context-aware 1:1 personal emails for event designers...',
        thought: 'Crafted note comparing silk box shipping from NJ vs wilting fresh florals under venue spotlights.',
        log: 'Pulse Agent generated personalized emails for 12 newly discovered prospects.'
      },
      {
        agentId: AGENT_IDS.ECHO,
        agentName: 'Echo',
        color: '#F59E0B',
        task: 'Analyzing inbound response: "Can you do Tuesday 2pm?"...',
        thought: 'Matched prospect schedule & auto-dispatched calendar booking confirmation.',
        log: 'Echo Agent auto-booked demo for Tuesday 14:00 EST.'
      },
      {
        agentId: AGENT_IDS.APEX,
        agentName: 'Apex',
        color: '#10B981',
        task: 'Evaluating vertical campaign ROI ($1.69/lead vs $6.33/lead)...',
        thought: 'Doubling down on Event Designers vertical; paused low-performing Houses of Worship.',
        log: 'Apex Agent automatically reallocated budget to top-performing Event Designers vertical.'
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

  scheduleNextTick() {
    if (!this.isRunning) return;
    this.timerId = setTimeout(() => {
      if (this.isRunning) {
        this.tick();
        this.scheduleNextTick();
      }
    }, this.speed);
  }

  tick() {
    if (!this.isRunning) return;
    const scenario = this.simulationScenarios[this.stepIndex % this.simulationScenarios.length];
    this.stepIndex++;

    const agent = this.state.agents.find(a => a.id === scenario.agentId);
    if (agent) {
      agent.currentTask = scenario.task;
      agent.thoughtStream = scenario.thought;
      agent.actionsToday += Math.floor(Math.random() * 3) + 1;
    }

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

    // Occasional lead generation & stage progression
    if (scenario.agentId === AGENT_IDS.NOVA && Math.random() > 0.4) {
      this.simulateNewLead(timestamp);
    } else if (scenario.agentId === AGENT_IDS.ECHO && Math.random() > 0.5) {
      this.advanceLeadStage(timestamp);
    }

    if (this.onStateChange) this.onStateChange(this.state);
    if (this.onLogAdded) this.onLogAdded(newLog);
  }

  simulateNewLead(timeStr) {
    const names = ['Camille Rose', 'Wole Fagbohun', 'Joe Purcell', 'Adejuwon Oyebanjo', 'Stuart Armley'];
    const companies = ['LogSure Floral', 'PlotWeaver Events', 'Radar Decor', 'Passpoint Styling', 'Foodfluence Events'];
    const titles = ['Owner & Founder', 'Lead Designer', 'Creative Director', 'Head of Events', 'Managing Director'];

    const idx = Math.floor(Math.random() * names.length);
    const company = companies[idx];
    const name = names[idx];
    const email = name.toLowerCase().replace(' ', '.') + '@' + company.toLowerCase().replace(' ', '') + '.com';

    const newLead = {
      id: 'lead-sim-' + Date.now(),
      name: name,
      title: titles[idx],
      company: company,
      industry: 'Event & Floral Design',
      employees: (Math.floor(Math.random() * 30) + 10).toString(),
      email: email,
      phone: '+1 (415) ' + Math.floor(100 + Math.random() * 900) + '-' + Math.floor(1000 + Math.random() * 9000),
      linkedin: 'linkedin.com/in/' + name.toLowerCase().replace(' ', ''),
      stage: 'discovered',
      intentScore: Math.floor(Math.random() * 20) + 80,
      buyingSignals: ['Hiring Event Stylists', 'Full-scale installs'],
      lastActivity: 'Discovered by Nova Agent via 536M+ GPU database scan',
      history: [
        { time: timeStr, text: 'Nova indexed prospect profile matching Event Designers ICP.' }
      ]
    };

    this.state.leads.unshift(newLead);
  }

  advanceLeadStage(timeStr) {
    const progressableLeads = this.state.leads.filter(l => l.stage !== 'meeting_booked');
    if (progressableLeads.length > 0) {
      const target = progressableLeads[Math.floor(Math.random() * progressableLeads.length)];
      const stageOrder = ['discovered', 'enriched', 'contacted', 'engaged', 'meeting_booked'];
      const currentIdx = stageOrder.indexOf(target.stage);
      if (currentIdx !== -1 && currentIdx < stageOrder.length - 1) {
        target.stage = stageOrder[currentIdx + 1];
        target.lastActivity = `Advanced to ${target.stage.replace('_', ' ')} by Echo Agent`;
        if (!target.history) target.history = [];
        target.history.unshift({
          time: timeStr,
          text: `Echo Agent advanced lead pipeline status to "${target.stage}".`
        });
      }
    }
  }
}
