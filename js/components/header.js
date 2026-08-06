/* ==========================================================================
   AutoGTM - Header Component
   ========================================================================== */

export function renderHeader(container, state, actions) {
  const isRunning = state.engineRunning;

  container.innerHTML = `
    <div class="brand-section">
      <div class="brand-logo" style="background: linear-gradient(135deg, #EC4899, #6366F1);">
        <i data-lucide="zap" style="width: 22px; height: 22px; color: white;"></i>
      </div>
      <div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span class="brand-title">Rabbit</span>
          <span class="brand-badge">AUTONOMOUS GTM v2.4</span>
        </div>
        <div style="font-size: 0.7rem; color: var(--text-dim);">Self-Operating Go-To-Market AI Workforce</div>
      </div>
    </div>

    <div class="header-center">
      <div class="autonomous-status-badge">
        <div class="pulse-dot" style="${!isRunning ? 'background-color: var(--amber); box-shadow: 0 0 10px var(--amber); animation: none;' : ''}"></div>
        <span style="font-size: 0.85rem; font-weight: 700; color: #E2E8F0;">
          ${isRunning ? 'AUTONOMOUS ENGINE ACTIVE' : 'ENGINE PAUSED'}
        </span>
        <span style="font-size: 0.75rem; color: var(--text-muted); padding-left: 6px; border-left: 1px solid var(--border-subtle);">
          6 Agents Operating
        </span>
      </div>
    </div>

    <div class="header-actions">
      <button id="btn-toggle-engine" class="btn ${isRunning ? 'btn-glass' : 'btn-primary'}">
        <i data-lucide="${isRunning ? 'pause' : 'play'}" style="width: 16px; height: 16px;"></i>
        <span>${isRunning ? 'Pause Engine' : 'Resume Engine'}</span>
      </button>

      <button id="btn-open-copilot" class="btn btn-glow">
        <i data-lucide="sparkles" style="width: 16px; height: 16px; color: var(--cyan);"></i>
        <span>Agent Co-Pilot</span>
      </button>
    </div>
  `;

  // Attach event listeners
  const toggleBtn = container.querySelector('#btn-toggle-engine');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      actions.toggleEngine();
    });
  }

  const copilotBtn = container.querySelector('#btn-open-copilot');
  if (copilotBtn) {
    copilotBtn.addEventListener('click', () => {
      actions.openCopilot();
    });
  }

  if (window.lucide) window.lucide.createIcons();
}
