/* ==========================================================================
   AutoGTM - Agent Co-Pilot Modal Component
   ========================================================================== */

export function renderCopilotModal(modalContainer, state, onSubmitPrompt, onClose) {
  modalContainer.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 16px;">
      <div style="display: flex; align-items: center; gap: 10px;">
        <div style="width: 36px; height: 36px; background: rgba(6, 182, 212, 0.15); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; color: var(--cyan); border: 1px solid rgba(6, 182, 212, 0.3);">
          <i data-lucide="sparkles" style="width: 20px; height: 20px;"></i>
        </div>
        <div>
          <h2 style="font-size: 1.2rem; font-weight: 800; color: #FFF;">Agent Co-Pilot Directive Center</h2>
          <p style="font-size: 0.75rem; color: var(--text-muted);">Issue high-level natural language instructions to steer your autonomous agent workforce.</p>
        </div>
      </div>
      <button id="btn-close-copilot" class="btn btn-glass" style="padding: 6px 10px;">
        <i data-lucide="x" style="width: 16px; height: 16px;"></i>
      </button>
    </div>

    <div style="margin-bottom: 16px;">
      <label style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted); display: block; margin-bottom: 6px;">
        Natural Language Directive to Workforce
      </label>
      <textarea id="copilot-prompt-input" rows="4" placeholder="e.g. Pivot campaign targeting to Series A-B FinTech CTOs in North America. Increase tone urgency by 15% and prioritize LinkedIn outreach..." 
        style="width: 100%; background: rgba(5, 7, 19, 0.8); border: var(--glass-border); border-radius: var(--radius-md); padding: 12px; color: #FFF; font-family: var(--font-sans); font-size: 0.85rem; outline: none; resize: none;"></textarea>
    </div>

    <div style="margin-bottom: 20px;">
      <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-dim); margin-bottom: 8px;">POPULAR AGENT PRESETS</div>
      <div style="display: flex; flex-wrap: wrap; gap: 8px;">
        <button class="btn btn-glass preset-btn" data-preset="Pivot target market to Series A-B FinTech startups in EU and adjust tone to founder-to-founder direct style." style="font-size: 0.75rem;">
          ⚡ Pivot to EU FinTech
        </button>
        <button class="btn btn-glass preset-btn" data-preset="Increase response aggression on pricing objections and offer free 14-day ROI trial." style="font-size: 0.75rem;">
          💡 Push ROI Trial Strategy
        </button>
        <button class="btn btn-glass preset-btn" data-preset="Double down on LinkedIn connection drips for prospects with hiring intent signals." style="font-size: 0.75rem;">
          🎯 Aggressive LinkedIn Drip
        </button>
      </div>
    </div>

    <div style="display: flex; justify-content: flex-end; gap: 10px;">
      <button id="btn-cancel-copilot" class="btn btn-glass">Cancel</button>
      <button id="btn-submit-copilot" class="btn btn-glow">
        <i data-lucide="send" style="width: 14px; height: 14px;"></i> Dispatched Directive to Workforce
      </button>
    </div>
  `;

  const input = modalContainer.querySelector('#copilot-prompt-input');
  const closeBtn = modalContainer.querySelector('#btn-close-copilot');
  const cancelBtn = modalContainer.querySelector('#btn-cancel-copilot');
  const submitBtn = modalContainer.querySelector('#btn-submit-copilot');
  const presets = modalContainer.querySelectorAll('.preset-btn');

  presets.forEach(p => {
    p.addEventListener('click', () => {
      input.value = p.getAttribute('data-preset');
    });
  });

  const handleClose = () => onClose();

  closeBtn.addEventListener('click', handleClose);
  cancelBtn.addEventListener('click', handleClose);

  submitBtn.addEventListener('click', () => {
    const text = input.value.trim();
    if (text) {
      onSubmitPrompt(text);
      handleClose();
    }
  });

  if (window.lucide) window.lucide.createIcons();
}
