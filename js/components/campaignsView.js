/* ==========================================================================
   Rabbit - Campaigns & Explee Domain Launcher View
   ========================================================================== */

import { ICP_SEGMENTS } from '../types.js';

export function renderCampaignsView(container, state) {
  container.innerHTML = `
    <!-- Explee 60-Second Domain Launcher Hero Card -->
    <div class="card" style="background: linear-gradient(135deg, rgba(15, 22, 49, 0.95), rgba(6, 182, 212, 0.15)); border: 1px solid var(--border-cyan); margin-bottom: 24px;">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <div style="width: 40px; height: 40px; background: rgba(6, 182, 212, 0.2); border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; color: var(--cyan); font-size: 1.3rem;">
            ⚡
          </div>
          <div>
            <h2 style="font-size: 1.2rem; font-weight: 800; color: #FFF;">Explee 60-Second Domain Autopilot Launcher</h2>
            <p style="font-size: 0.8rem; color: var(--text-muted);">Paste your website domain and let 6 AI agents find clients while you sleep.</p>
          </div>
        </div>
        <span class="intent-badge intent-high" style="padding: 6px 12px; font-size: 0.75rem;">
          🎁 $30 in Free Credits Included
        </span>
      </div>

      <div style="display: flex; gap: 12px; margin-bottom: 16px;">
        <input id="input-domain-url" type="text" placeholder="Paste your website, e.g., larksilk.com or consolto.com" 
          value="larksilk.com"
          style="flex: 1; background: rgba(5, 7, 19, 0.9); border: var(--glass-border); border-radius: var(--radius-md); padding: 12px 16px; color: #FFF; font-family: var(--font-sans); font-size: 0.9rem; outline: none;">
        <button id="btn-launch-autopilot" class="btn btn-glow" style="padding: 12px 20px;">
          <i data-lucide="zap" style="width: 16px; height: 16px;"></i>
          <span>Launch Autopilot</span>
        </button>
      </div>

      <!-- Domain Analysis Stream -->
      <div id="domain-analysis-box" style="background: rgba(0, 0, 0, 0.4); border-radius: var(--radius-md); padding: 16px; border: var(--glass-border);">
        <div style="font-size: 0.8rem; font-weight: 700; color: var(--cyan); margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
          <i data-lucide="search" style="width: 14px; height: 14px;"></i> Koda Agent Studying Target Domain & Competitor Matrix...
        </div>
        <div style="font-size: 0.8rem; color: var(--text-main); margin-bottom: 8px;">
          <strong>Target Domain:</strong> <span style="font-family: var(--font-mono); color: var(--emerald);">larksilk.com</span> — Wholesale silk flowers and greenery for hotels, restaurants & florists (45+ years).
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: 8px; font-size: 0.75rem;">
          <span style="background: rgba(255, 255, 255, 0.05); padding: 4px 10px; border-radius: var(--radius-full); color: var(--text-muted);">
            Competitor Analyzed: afloral.com
          </span>
          <span style="background: rgba(255, 255, 255, 0.05); padding: 4px 10px; border-radius: var(--radius-full); color: var(--text-muted);">
            Competitor Analyzed: nearlynatural.com
          </span>
          <span style="background: rgba(255, 255, 255, 0.05); padding: 4px 10px; border-radius: var(--radius-full); color: var(--text-muted);">
            Competitor Analyzed: silksareforever.com
          </span>
        </div>
      </div>
    </div>

    <!-- Explee Vertical Fit Scores Table -->
    <div class="card">
      <div class="card-header">
        <div class="card-title">
          <i data-lucide="layers" style="color: var(--purple);"></i>
          <span>Atlas Fit Score Segmentation & Apex Scaling Table</span>
        </div>
      </div>

      <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem; text-align: left;">
        <thead>
          <tr style="border-bottom: 1px solid var(--border-subtle); color: var(--text-muted);">
            <th style="padding: 12px;">Client Vertical Segment</th>
            <th style="padding: 12px;">Atlas Fit Score</th>
            <th style="padding: 12px;">Apex Status</th>
            <th style="padding: 12px;">Cost / Qualified Lead</th>
          </tr>
        </thead>
        <tbody>
          ${ICP_SEGMENTS.map(seg => `
            <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.04); ${seg.status === 'Paused' ? 'opacity: 0.4;' : ''}">
              <td style="padding: 12px; font-weight: 700; color: #FFF;">${seg.name}</td>
              <td style="padding: 12px; font-family: var(--font-mono); color: var(--cyan); font-weight: 700;">${seg.fitScore}</td>
              <td style="padding: 12px;">
                <span class="intent-badge ${seg.status === 'Scaling' ? 'intent-high' : seg.status === 'Working' ? 'intent-med' : ''}" style="${seg.status === 'Paused' ? 'background: rgba(255, 255, 255, 0.1); color: var(--text-dim); border: none;' : ''}">
                  ${seg.status}
                </span>
              </td>
              <td style="padding: 12px; font-weight: 700; color: ${seg.status === 'Paused' ? 'var(--text-dim)' : 'var(--emerald)'};">${seg.costPerLead}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;

  const launchBtn = container.querySelector('#btn-launch-autopilot');
  const inputDomain = container.querySelector('#input-domain-url');
  const box = container.querySelector('#domain-analysis-box');

  if (launchBtn) {
    launchBtn.addEventListener('click', () => {
      const val = inputDomain.value.trim() || 'larksilk.com';
      box.style.display = 'block';
      box.querySelector('div').innerHTML = `<i data-lucide="check-circle" style="width:14px;height:14px;color:var(--emerald);"></i> Koda Agent completed instant crawl of ${val}! Autopilot sequence launched across 6 agents.`;
    });
  }

  if (window.lucide) window.lucide.createIcons();
}
