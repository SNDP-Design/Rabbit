/* ==========================================================================
   AutoGTM - Agent Workforce Grid Component
   ========================================================================== */

export function renderWorkforceGrid(container, agents) {
  container.innerHTML = `
    <div class="grid-cols-3">
      ${agents.map(agent => `
        <div class="card agent-card" style="--agent-color: ${agent.color}">
          <div class="agent-header">
            <div class="agent-avatar" style="color: ${agent.color}; border-color: ${agent.color}40; background: ${agent.color}15;">
              <span style="font-size: 1.4rem;">${agent.avatar}</span>
            </div>
            <div>
              <div class="agent-name" style="color: #FFFFFF;">${agent.name}</div>
              <div class="agent-role">${agent.role}</div>
            </div>
            <div style="margin-left: auto;">
              <span class="intent-badge" style="background: rgba(16, 185, 129, 0.15); color: var(--emerald); border: 1px solid rgba(16, 185, 129, 0.3);">
                ${agent.status}
              </span>
            </div>
          </div>

          <div style="font-size: 0.75rem; font-weight: 600; color: var(--text-muted); margin-bottom: 4px;">CURRENT AUTONOMOUS TASK</div>
          <div class="agent-task">
            ${agent.currentTask}
          </div>

          <div style="font-size: 0.75rem; font-weight: 600; color: var(--text-dim); margin-bottom: 4px;">LIVE THOUGHT PROCESS</div>
          <div style="font-size: 0.75rem; color: var(--cyan); font-style: italic; margin-bottom: 12px;">
            "${agent.thoughtStream}"
          </div>

          <div class="agent-metrics">
            <span>Actions Today: <strong style="color: #FFF;">${agent.actionsToday}</strong></span>
            <span>Efficiency: <strong style="color: var(--emerald);">${agent.efficiency}</strong></span>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  if (window.lucide) window.lucide.createIcons();
}
