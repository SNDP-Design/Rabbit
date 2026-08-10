/* ==========================================================================
   Rabbit - Pipeline CRM View & Lead Drawer
   ========================================================================== */

import { PIPELINE_STAGES } from '../types.js';

export function renderPipelineView(container, state, onSelectLead) {
  if (!container) return;

  container.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
      <div>
        <h1 style="font-size: 1.5rem; font-weight: 800; color: #FFF;">Autonomous Pipeline CRM</h1>
        <p style="font-size: 0.85rem; color: var(--text-muted);">Real-time prospect intent scoring and automated deal pipeline movement.</p>
      </div>
      <div style="font-size: 0.85rem; color: var(--text-muted);">
        Total Leads Discovered: <strong style="color: var(--cyan);">${(state.leads || []).length}</strong>
      </div>
    </div>

    <div class="kanban-board">
      ${PIPELINE_STAGES.map(stage => {
        const stageLeads = (state.leads || []).filter(l => l.stage === stage.id);
        return `
          <div class="kanban-column">
            <div class="kanban-col-header">
              <span style="color: ${stage.color};">${stage.label}</span>
              <span class="nav-badge" style="background: ${stage.color}20; color: ${stage.color};">${stageLeads.length}</span>
            </div>

            <div style="display: flex; flex-direction: column; gap: 10px; min-height: 350px;">
              ${stageLeads.map(lead => `
                <div class="lead-card" data-lead-id="${lead.id}">
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
                    <div style="font-weight: 700; color: #FFF; font-size: 0.9rem;">${lead.name || 'Prospect'}</div>
                    <span class="intent-badge ${lead.intentScore >= 85 ? 'intent-high' : 'intent-med'}">
                      Score: ${lead.intentScore || 80}
                    </span>
                  </div>
                  <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 4px;">${lead.title || 'Decision Maker'}</div>
                  <div style="font-size: 0.75rem; color: var(--cyan); font-weight: 600; margin-bottom: 8px;">${lead.company || 'Target Company'}</div>

                  <div style="font-size: 0.7rem; color: var(--text-dim); background: rgba(0, 0, 0, 0.3); padding: 6px; border-radius: var(--radius-sm);">
                    <i data-lucide="activity" style="width: 10px; height: 10px; display: inline-block; vertical-align: middle;"></i>
                    ${lead.lastActivity || 'Discovered'}
                  </div>
                </div>
              `).join('')}

              ${stageLeads.length === 0 ? `
                <div style="text-align: center; padding: 24px 0; font-size: 0.75rem; color: var(--text-dim); border: 1px dashed var(--border-subtle); border-radius: var(--radius-md);">
                  No prospects in this stage
                </div>
              ` : ''}
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;

  // Attach card click listener
  const cards = container.querySelectorAll('.lead-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const leadId = card.getAttribute('data-lead-id');
      const lead = (state.leads || []).find(l => l.id === leadId);
      if (lead && onSelectLead) onSelectLead(lead);
    });
  });

  if (window.lucide) window.lucide.createIcons();
}

export function renderLeadDrawer(drawerContainer, lead, onClose) {
  if (!drawerContainer || !lead) return;

  const signals = lead.buyingSignals || [];
  const history = lead.history || [];

  drawerContainer.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 16px;">
      <div>
        <h2 style="font-size: 1.3rem; font-weight: 800; color: #FFF;">${lead.name || 'Prospect'}</h2>
        <div style="font-size: 0.85rem; color: var(--cyan);">${lead.title || ''} @ ${lead.company || ''}</div>
      </div>
      <button id="btn-close-drawer" class="btn btn-glass" style="padding: 6px 10px;">
        <i data-lucide="x" style="width: 16px; height: 16px;"></i>
      </button>
    </div>

    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 20px;">
      <div style="background: rgba(255, 255, 255, 0.03); padding: 10px; border-radius: var(--radius-md);">
        <div style="font-size: 0.7rem; color: var(--text-dim);">Verified Email</div>
        <div style="font-size: 0.8rem; color: #FFF; font-family: var(--font-sans);">${lead.email || 'N/A'}</div>
      </div>
      <div style="background: rgba(255, 255, 255, 0.03); padding: 10px; border-radius: var(--radius-md);">
        <div style="font-size: 0.7rem; color: var(--text-dim);">Verified Phone</div>
        <div style="font-size: 0.8rem; color: #FFF; font-family: var(--font-sans);">${lead.phone || 'N/A'}</div>
      </div>
    </div>

    <div style="margin-bottom: 20px;">
      <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted); margin-bottom: 8px;">BUYING INTENT SIGNALS</div>
      <div style="display: flex; flex-wrap: wrap; gap: 6px;">
        ${signals.map(sig => `
          <span style="font-size: 0.75rem; background: rgba(6, 182, 212, 0.15); color: var(--cyan); border: 1px solid rgba(6, 182, 212, 0.3); padding: 4px 10px; border-radius: var(--radius-full);">
            ⚡ ${sig}
          </span>
        `).join('')}
      </div>
    </div>

    <div>
      <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted); margin-bottom: 12px;">AUTONOMOUS AGENT ACTIVITY LOG</div>
      <div style="display: flex; flex-direction: column; gap: 10px;">
        ${history.map(item => `
          <div style="background: rgba(0, 0, 0, 0.3); border-left: 2px solid var(--primary); padding: 10px 12px; border-radius: var(--radius-sm);">
            <div style="font-size: 0.7rem; color: var(--text-dim); margin-bottom: 2px;">${item.time}</div>
            <div style="font-size: 0.8rem; color: var(--text-main);">${item.text}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  const closeBtn = drawerContainer.querySelector('#btn-close-drawer');
  if (closeBtn && onClose) {
    closeBtn.addEventListener('click', onClose);
  }

  if (window.lucide) window.lucide.createIcons();
}
