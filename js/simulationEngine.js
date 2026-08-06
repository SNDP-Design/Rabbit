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

    if (this.onStateChange) this.onStateChange(this.state);
    if (this.onLogAdded) this.onLogAdded(newLog);
  }
}
