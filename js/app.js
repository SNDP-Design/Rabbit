/* ==========================================================================
   AutoGTM - Main Application Entry Point
   ========================================================================== */

import { initialAgents, initialCampaigns, initialLeads, initialSequences, initialInboxMessages, initialOptimizationLogs } from './mockData.js';
import { SimulationEngine } from './simulationEngine.js';

import { renderHeader } from './components/header.js';
import { renderSidebar } from './components/sidebar.js';
import { renderWorkforceGrid } from './components/workforceGrid.js';
import { renderWorkflowGraph } from './components/workflowGraph.js';
import { renderCampaignsView } from './components/campaignsView.js';
import { renderPipelineView, renderLeadDrawer } from './components/pipelineView.js';
import { renderSequenceView } from './components/sequenceView.js';
import { renderInboxView } from './components/inboxView.js';
import { renderSelfOptimizationView } from './components/selfOptimizationView.js';
import { renderCopilotModal } from './components/copilotModal.js';

class AutoGTMApp {
  constructor() {
    this.state = {
      engineRunning: true,
      activeView: 'command-center',
      agents: initialAgents,
      campaigns: initialCampaigns,
      leads: initialLeads,
      sequences: initialSequences,
      inboxMessages: initialInboxMessages,
      optimizationLogs: initialOptimizationLogs,
      logs: [
        { id: 'log-1', time: 'Just now', agentId: 'atlas', agentName: 'Atlas', color: '#06B6D4', text: 'Autonomous GTM Engine booted successfully. 6 agents online.' },
        { id: 'log-2', time: '1 min ago', agentId: 'nova', agentName: 'Nova', color: '#6366F1', text: 'Indexed 45 target decision makers matching Series A ICP criteria.' }
      ],
      selectedLead: null
    };

    // DOM containers
    this.headerContainer = document.getElementById('header-container');
    this.sidebarContainer = document.getElementById('sidebar-container');
    this.leadDrawerBackdrop = document.getElementById('lead-drawer-backdrop');
    this.leadDrawer = document.getElementById('lead-drawer');
    this.copilotBackdrop = document.getElementById('copilot-modal-backdrop');
    this.copilotModal = document.getElementById('copilot-modal');

    // Initialize simulation engine
    this.engine = new SimulationEngine(
      this.state,
      (updatedState) => this.onStateUpdated(updatedState),
      (newLog) => this.onNewLogAdded(newLog)
    );

    this.init();
  }

  init() {
    this.renderLayout();
    this.renderCurrentView();
    this.engine.start();

    if (window.lucide) window.lucide.createIcons();
  }

  renderLayout() {
    renderHeader(this.headerContainer, this.state, {
      toggleEngine: () => this.toggleEngine(),
      openCopilot: () => this.openCopilot()
    });

    renderSidebar(this.sidebarContainer, this.state.activeView, this.state, (viewId) => {
      this.switchView(viewId);
    });
  }

  switchView(viewId) {
    this.state.activeView = viewId;
    
    // Hide all view panels
    document.querySelectorAll('.view-panel').forEach(panel => panel.classList.remove('active'));

    // Show target view panel
    const targetPanel = document.getElementById(`view-${viewId}`);
    if (targetPanel) targetPanel.classList.add('active');

    this.renderSidebar();
    this.renderCurrentView();
  }

  renderSidebar() {
    renderSidebar(this.sidebarContainer, this.state.activeView, this.state, (viewId) => {
      this.switchView(viewId);
    });
  }

  renderCurrentView() {
    switch (this.state.activeView) {
      case 'command-center':
        this.renderCommandCenter();
        break;
      case 'campaigns':
        renderCampaignsView(document.getElementById('view-campaigns'), this.state, () => {});
        break;
      case 'pipeline':
        renderPipelineView(document.getElementById('view-pipeline'), this.state, (lead) => this.openLeadDrawer(lead));
        break;
      case 'sequences':
        renderSequenceView(document.getElementById('view-sequences'), this.state);
        break;
      case 'inbox':
        renderInboxView(document.getElementById('view-inbox'), this.state, (msgId) => this.handleSendReply(msgId));
        break;
      case 'optimization':
        renderSelfOptimizationView(document.getElementById('view-optimization'), this.state);
        break;
    }
  }

  renderCommandCenter() {
    const container = document.getElementById('view-command-center');
    container.innerHTML = `
      <!-- Stat Banner -->
      <div class="grid-cols-4" style="margin-bottom: 24px;">
        <div class="stat-card">
          <div class="stat-icon"><i data-lucide="bot"></i></div>
          <div>
            <div class="stat-value">6</div>
            <div class="stat-label">Active Agents</div>
            <div class="stat-trend"><i data-lucide="check-circle"></i> 100% Operational</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon" style="background: rgba(6, 182, 212, 0.15); color: var(--cyan); border-color: rgba(6, 182, 212, 0.25);">
            <i data-lucide="users"></i>
          </div>
          <div>
            <div class="stat-value">${this.state.leads.length}</div>
            <div class="stat-label">Leads Discovered</div>
            <div class="stat-trend"><i data-lucide="arrow-up-right"></i> +8 Today</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon" style="background: rgba(168, 85, 247, 0.15); color: var(--purple); border-color: rgba(168, 85, 247, 0.25);">
            <i data-lucide="send"></i>
          </div>
          <div>
            <div class="stat-value">507</div>
            <div class="stat-label">Outreach Messages</div>
            <div class="stat-trend"><i data-lucide="arrow-up-right"></i> 68.4% Open Rate</div>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon" style="background: rgba(16, 185, 129, 0.15); color: var(--emerald); border-color: rgba(16, 185, 129, 0.25);">
            <i data-lucide="calendar"></i>
          </div>
          <div>
            <div class="stat-value">23</div>
            <div class="stat-label">Meetings Booked</div>
            <div class="stat-trend"><i data-lucide="arrow-up-right"></i> $380k Pipeline</div>
          </div>
        </div>
      </div>

      <!-- Agent Workforce Grid -->
      <div style="margin-bottom: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
          <h2 style="font-size: 1.2rem; font-weight: 800; color: #FFF;">Autonomous AI Workforce Matrix</h2>
          <span style="font-size: 0.75rem; color: var(--text-dim);">Live Execution Telemetry</span>
        </div>
        <div id="workforce-grid-container"></div>
      </div>

      <!-- Workflow Visualizer & Live Stream -->
      <div class="grid-cols-2" style="margin-bottom: 24px;">
        <div class="card">
          <div class="card-header">
            <div class="card-title">
              <i data-lucide="share-2" style="color: var(--cyan);"></i>
              <span>Agent Data Mesh & Workflow Signal Path</span>
            </div>
          </div>
          <div id="workflow-graph-container"></div>
        </div>

        <div class="card">
          <div class="card-header">
            <div class="card-title">
              <i data-lucide="terminal" style="color: var(--emerald);"></i>
              <span>Live Agent Thought & Activity Stream</span>
            </div>
          </div>
          <div id="log-stream-container" class="log-stream">
            ${this.state.logs.map(log => `
              <div class="log-entry" style="--log-color: ${log.color}">
                <span class="log-time">[${log.time}]</span>
                <span class="log-agent">${log.agentName}:</span>
                <span class="log-text">${log.text}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    renderWorkforceGrid(document.getElementById('workforce-grid-container'), this.state.agents);
    renderWorkflowGraph(document.getElementById('workflow-graph-container'), this.state.agents);

    if (window.lucide) window.lucide.createIcons();
  }

  toggleEngine() {
    this.state.engineRunning = !this.state.engineRunning;
    if (this.state.engineRunning) {
      this.engine.start();
    } else {
      this.engine.stop();
    }
    renderHeader(this.headerContainer, this.state, {
      toggleEngine: () => this.toggleEngine(),
      openCopilot: () => this.openCopilot()
    });
  }

  openCopilot() {
    this.copilotBackdrop.classList.remove('hidden');
    renderCopilotModal(
      this.copilotModal,
      this.state,
      (promptText) => this.handleCopilotDirective(promptText),
      () => this.copilotBackdrop.classList.add('hidden')
    );
  }

  handleCopilotDirective(promptText) {
    // Add log entry acknowledging prompt
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    this.state.logs.unshift({
      id: 'log-' + Date.now(),
      time: timestamp,
      agentId: 'apex',
      agentName: 'Apex',
      color: '#10B981',
      text: `DIRECTIVE RECEIVED: "${promptText}". Updating campaign strategies across all 6 agents.`
    });

    // Update Apex thought stream
    const apex = this.state.agents.find(a => a.id === 'apex');
    if (apex) {
      apex.thoughtStream = `Re-calibrating targeting model & sequence parameters per user directive: "${promptText.substring(0, 40)}..."`;
    }

    this.onStateUpdated(this.state);
  }

  openLeadDrawer(lead) {
    this.state.selectedLead = lead;
    this.leadDrawerBackdrop.classList.remove('hidden');
    renderLeadDrawer(this.leadDrawer, lead, () => {
      this.leadDrawerBackdrop.classList.add('hidden');
    });
  }

  handleSendReply(msgId) {
    const msg = this.state.inboxMessages.find(m => m.id === msgId);
    if (msg) {
      msg.status = 'Sent & Delivered';
      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      this.state.logs.unshift({
        id: 'log-' + Date.now(),
        time: timestamp,
        agentId: 'echo',
        agentName: 'Echo',
        color: '#F59E0B',
        text: `Dispatched approved objection counter-reply to ${msg.leadName} (${msg.company}).`
      });
      this.renderCurrentView();
    }
  }

  onStateUpdated(state) {
    if (this.state.activeView === 'command-center') {
      const gridContainer = document.getElementById('workforce-grid-container');
      if (gridContainer) renderWorkforceGrid(gridContainer, state.agents);
    }
  }

  onNewLogAdded(newLog) {
    const streamContainer = document.getElementById('log-stream-container');
    if (streamContainer) {
      const logElement = document.createElement('div');
      logElement.className = 'log-entry';
      logElement.style.setProperty('--log-color', newLog.color);
      logElement.innerHTML = `
        <span class="log-time">[${newLog.time}]</span>
        <span class="log-agent">${newLog.agentName}:</span>
        <span class="log-text">${newLog.text}</span>
      `;
      streamContainer.insertBefore(logElement, streamContainer.firstChild);
      if (streamContainer.children.length > 50) {
        streamContainer.removeChild(streamContainer.lastChild);
      }
    }
  }
}

// Instantiate on DOM load
window.addEventListener('DOMContentLoaded', () => {
  window.app = new AutoGTMApp();
});
