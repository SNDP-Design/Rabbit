/* ==========================================================================
   Rabbit - Sequence Studio View
   ========================================================================== */

export function renderSequenceView(container, state, onOptimize) {
  container.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
      <div>
        <h1 style="font-size: 1.5rem; font-weight: 800; color: #FFF;">Omnichannel Sequence Studio</h1>
        <p style="font-size: 0.85rem; color: var(--text-muted);">Pulse Agent automatically generates dynamic variables and tone-adapted copy for each channel.</p>
      </div>
      <button id="btn-ai-rewrite-seq" class="btn btn-glow">
        <i data-lucide="sparkles" style="width: 16px; height: 16px;"></i>
        <span>AI Auto-Optimize All Steps</span>
      </button>
    </div>

    <div style="display: flex; flex-direction: column; gap: 20px;">
      ${state.sequences.map(seq => `
        <div class="card" style="border-left: 4px solid ${seq.channel === 'Email' ? 'var(--cyan)' : 'var(--purple)'};">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="font-size: 0.8rem; font-weight: 700; background: rgba(255, 255, 255, 0.1); padding: 4px 10px; border-radius: var(--radius-full); color: #FFF;">
                Step ${seq.stepNumber}
              </span>
              <span style="font-size: 0.9rem; font-weight: 700; color: ${seq.channel === 'Email' ? 'var(--cyan)' : 'var(--purple)'};">
                ${seq.channel} Sequence
              </span>
              <span style="font-size: 0.75rem; color: var(--text-dim);">Trigger: ${seq.delay}</span>
            </div>

            <div style="display: flex; gap: 16px; font-size: 0.8rem;">
              <span>Sent: <strong style="color: #FFF;">${seq.metrics.sent}</strong></span>
              ${seq.metrics.opened ? `<span>Open Rate: <strong style="color: var(--emerald);">${seq.metrics.opened}</strong></span>` : ''}
              ${seq.metrics.accepted ? `<span>Accept Rate: <strong style="color: var(--emerald);">${seq.metrics.accepted}</strong></span>` : ''}
              <span>Reply Rate: <strong style="color: var(--amber);">${seq.metrics.replied}</strong></span>
            </div>
          </div>

          ${seq.subject ? `
            <div style="font-size: 0.85rem; font-weight: 700; color: #FFF; margin-bottom: 8px;">
              Subject: <span style="font-family: var(--font-sans); color: var(--cyan);">${seq.subject}</span>
            </div>
          ` : ''}

          <div style="background: rgba(5, 7, 19, 0.7); border: var(--glass-border); border-radius: var(--radius-md); padding: 14px; font-family: var(--font-sans); font-size: 0.85rem; color: #CBD5E1; white-space: pre-wrap; line-height: 1.6;">
${seq.body}
          </div>

          <div style="display: flex; gap: 8px; margin-top: 12px; justify-content: flex-end;">
            <button class="btn btn-glass" style="font-size: 0.75rem; padding: 4px 10px;">
              <i data-lucide="edit-3" style="width: 14px; height: 14px;"></i> Edit Copy
            </button>
            <button class="btn btn-glass" style="font-size: 0.75rem; padding: 4px 10px; color: var(--cyan);">
              <i data-lucide="zap" style="width: 14px; height: 14px;"></i> Test Dynamic Variables
            </button>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  const rewriteBtn = container.querySelector('#btn-ai-rewrite-seq');
  if (rewriteBtn && onOptimize) {
    rewriteBtn.addEventListener('click', () => {
      onOptimize();
    });
  }

  if (window.lucide) window.lucide.createIcons();
}
