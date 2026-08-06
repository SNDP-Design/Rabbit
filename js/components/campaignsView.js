/* ==========================================================================
   AutoGTM - Campaigns & ICP Studio View
   ========================================================================== */

export function renderCampaignsView(container, state, onCreateCampaign) {
  container.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
      <div>
        <h1 style="font-size: 1.5rem; font-weight: 800; color: #FFF;">Active Autonomous Campaigns</h1>
        <p style="font-size: 0.85rem; color: var(--text-muted);">Manage target personas, ICP filters, and agent execution goals.</p>
      </div>
      <button id="btn-new-campaign" class="btn btn-primary">
        <i data-lucide="plus-circle" style="width: 16px; height: 16px;"></i>
        <span>Launch New Campaign</span>
      </button>
    </div>

    <div class="grid-cols-2" style="margin-bottom: 24px;">
      ${state.campaigns.map(camp => `
        <div class="card" style="position: relative;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
            <div>
              <div style="font-size: 1.1rem; font-weight: 700; color: #FFF; margin-bottom: 4px;">${camp.name}</div>
              <span class="intent-badge intent-high">${camp.status}</span>
            </div>
            <div style="text-align: right;">
              <div style="font-size: 0.75rem; color: var(--text-dim);">Monthly Budget</div>
              <div style="font-size: 0.95rem; font-weight: 700; color: var(--cyan);">${camp.budgetAllocated}</div>
            </div>
          </div>

          <div style="background: rgba(0, 0, 0, 0.2); padding: 12px; border-radius: var(--radius-md); font-size: 0.8rem; margin-bottom: 16px; border: var(--glass-border);">
            <div style="color: var(--text-muted); margin-bottom: 4px;"><strong>Target ICP:</strong> ${camp.targetICP}</div>
            <div style="color: var(--text-main);"><strong>Core Value Prop:</strong> "${camp.valueProposition}"</div>
          </div>

          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; text-align: center; border-top: 1px solid var(--border-subtle); padding-top: 12px;">
            <div>
              <div style="font-size: 0.7rem; color: var(--text-dim);">Targeted</div>
              <div style="font-size: 1.1rem; font-weight: 700; color: #FFF;">${camp.leadsTargeted}</div>
            </div>
            <div>
              <div style="font-size: 0.7rem; color: var(--text-dim);">Contacted</div>
              <div style="font-size: 1.1rem; font-weight: 700; color: var(--purple);">${camp.contacted}</div>
            </div>
            <div>
              <div style="font-size: 0.7rem; color: var(--text-dim);">Replies</div>
              <div style="font-size: 1.1rem; font-weight: 700; color: var(--amber);">${camp.replies}</div>
            </div>
            <div>
              <div style="font-size: 0.7rem; color: var(--text-dim);">Meetings</div>
              <div style="font-size: 1.1rem; font-weight: 700; color: var(--emerald);">${camp.meetingsBooked}</div>
            </div>
          </div>
        </div>
      `).join('')}
    </div>

    <!-- Quick ICP Generator Assistant -->
    <div class="card">
      <div class="card-header">
        <div class="card-title">
          <i data-lucide="sparkles" style="color: var(--cyan);"></i>
          <span>Autonomous ICP & Value Proposition Generator</span>
        </div>
      </div>
      <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 16px;">
        Let Atlas & Pulse agents auto-discover high-converting ideal customer profiles (ICPs) based on your product category.
      </p>

      <div style="display: flex; gap: 12px;">
        <input id="input-product-desc" type="text" placeholder="e.g. B2B SaaS for automated SOC2 compliance monitoring..." 
          style="flex: 1; background: rgba(5, 7, 19, 0.8); border: var(--glass-border); border-radius: var(--radius-md); padding: 10px 14px; color: #FFF; font-family: var(--font-sans); outline: none;">
        <button id="btn-generate-icp" class="btn btn-glow">
          <i data-lucide="cpu" style="width: 16px; height: 16px;"></i>
          <span>Auto-Generate ICP Strategy</span>
        </button>
      </div>

      <div id="icp-output" style="display: none; margin-top: 16px; background: rgba(99, 102, 241, 0.08); border: 1px solid var(--border-glow); border-radius: var(--radius-md); padding: 16px;">
        <div style="font-size: 0.85rem; font-weight: 700; color: var(--cyan); margin-bottom: 8px;">AI Synthesized Campaign Setup</div>
        <div style="font-size: 0.8rem; color: var(--text-main); margin-bottom: 6px;" id="output-icp"></div>
        <div style="font-size: 0.8rem; color: var(--text-muted);" id="output-prop"></div>
      </div>
    </div>
  `;

  const generateBtn = container.querySelector('#btn-generate-icp');
  const inputDesc = container.querySelector('#input-product-desc');
  const icpOutput = container.querySelector('#icp-output');

  if (generateBtn) {
    generateBtn.addEventListener('click', () => {
      const text = inputDesc.value.trim() || 'B2B SaaS product for dev infrastructure';
      icpOutput.style.display = 'block';
      container.querySelector('#output-icp').innerHTML = `<strong>Suggested ICP:</strong> Engineering Directors & CTOs at Series A+ Fintech & Cloud Companies (50-300 employees)`;
      container.querySelector('#output-prop').innerHTML = `<strong>Autonomous Value Prop:</strong> "Reduce audit preparation overhead by 75% and automate real-time compliance checks across AWS & Kubernetes."`;
    });
  }

  if (window.lucide) window.lucide.createIcons();
}
