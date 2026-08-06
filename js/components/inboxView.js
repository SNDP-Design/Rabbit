/* ==========================================================================
   Rabbit - Autonomous Inbox & Explee Objection AI View
   ========================================================================== */

import { INBOUND_SENTIMENTS } from '../types.js';

export function renderInboxView(container, state, onSendReply) {
  container.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
      <div>
        <h1 style="font-size: 1.5rem; font-weight: 800; color: #FFF;">Autonomous Inbox & Booking AI</h1>
        <p style="font-size: 0.85rem; color: var(--text-muted);">Echo Agent handles inbound replies, answers product questions, and books meetings automatically.</p>
      </div>
      <div class="intent-badge intent-high" style="font-size: 0.8rem; padding: 6px 12px;">
        ⚡ Auto-Booking Mode: ACTIVE
      </div>
    </div>

    <div class="grid-cols-2" style="gap: 20px;">
      ${state.inboxMessages.map(msg => {
        const sentiment = INBOUND_SENTIMENTS[msg.sentimentKey] || { label: 'Inbound Reply', color: 'var(--cyan)' };

        return `
          <div class="card" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                <div>
                  <div style="font-size: 1.05rem; font-weight: 700; color: #FFF;">${msg.leadName}</div>
                  <div style="font-size: 0.8rem; color: var(--cyan);">${msg.company}</div>
                </div>
                <span class="intent-badge" style="background: ${sentiment.color}20; color: ${sentiment.color}; border: 1px solid ${sentiment.color}40;">
                  ${sentiment.label}
                </span>
              </div>

              <!-- Prospect Message -->
              <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-dim); margin-bottom: 4px;">INBOUND PROSPECT MESSAGE</div>
              <div style="background: rgba(5, 7, 19, 0.8); border: var(--glass-border); border-radius: var(--radius-md); padding: 12px; font-size: 0.85rem; color: #E2E8F0; margin-bottom: 14px; font-style: italic;">
                "${msg.leadMessage}"
              </div>

              <!-- AI Analysis -->
              <div style="font-size: 0.75rem; font-weight: 700; color: var(--amber); margin-bottom: 4px; display: flex; align-items: center; gap: 4px;">
                <i data-lucide="cpu" style="width: 12px; height: 12px;"></i> ECHO AGENT ANALYSIS
              </div>
              <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 14px;">
                ${msg.aiAnalysis}
              </div>

              <!-- AI Proposed Reply -->
              <div style="font-size: 0.75rem; font-weight: 700; color: var(--emerald); margin-bottom: 4px; display: flex; align-items: center; gap: 4px;">
                <i data-lucide="sparkles" style="width: 12px; height: 12px;"></i> AUTONOMOUS REPLY & BOOKING DISPATCH
              </div>
              <div style="background: rgba(16, 185, 129, 0.05); border: 1px solid rgba(16, 185, 129, 0.2); border-radius: var(--radius-md); padding: 12px; font-size: 0.85rem; color: #F1F5F9; white-space: pre-wrap; font-family: var(--font-sans); margin-bottom: 16px;">
${msg.aiProposedReply}
              </div>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-subtle); padding-top: 12px;">
              <span style="font-size: 0.75rem; color: var(--emerald); font-weight: 600;">
                <i data-lucide="check-circle" style="width: 12px; height: 12px; display: inline-block;"></i> ${msg.status}
              </span>
              <button class="btn btn-primary btn-send-inbox" data-msg-id="${msg.id}" style="font-size: 0.8rem; padding: 6px 14px;">
                <i data-lucide="send" style="width: 14px; height: 14px;"></i> Re-Send Invite
              </button>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;

  const sendBtns = container.querySelectorAll('.btn-send-inbox');
  sendBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const msgId = btn.getAttribute('data-msg-id');
      onSendReply(msgId);
    });
  });

  if (window.lucide) window.lucide.createIcons();
}
