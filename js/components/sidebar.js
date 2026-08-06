/* ==========================================================================
   AutoGTM - Sidebar Navigation Component
   ========================================================================== */

export function renderSidebar(container, activeViewId, state, onNavigate) {
  const navItems = [
    { id: 'command-center', label: 'Command Center', icon: 'layout-dashboard', badge: 'Live' },
    { id: 'campaigns', label: 'Campaigns & ICP', icon: 'target', badge: state.campaigns.length },
    { id: 'pipeline', label: 'Pipeline CRM', icon: 'users', badge: state.leads.length },
    { id: 'sequences', label: 'Sequence Studio', icon: 'send', badge: state.sequences.length },
    { id: 'inbox', label: 'Autonomous Inbox', icon: 'mail-check', badge: state.inboxMessages.length, badgeColor: 'var(--amber)' },
    { id: 'optimization', label: 'Self-Optimization', icon: 'trending-up', badge: 'Apex AI' }
  ];

  container.innerHTML = `
    <div style="font-size: 0.7rem; font-weight: 700; color: var(--text-dim); text-transform: uppercase; letter-spacing: 0.08em; padding: 0 10px 8px 10px;">
      GTM Navigation
    </div>
    ${navItems.map(item => `
      <a href="#" class="nav-item ${activeViewId === item.id ? 'active' : ''}" data-view="${item.id}">
        <i data-lucide="${item.icon}" style="width: 18px; height: 18px;"></i>
        <span>${item.label}</span>
        ${item.badge ? `<span class="nav-badge" style="${item.badgeColor ? 'background:' + item.badgeColor + '; color: #000; font-weight: 700;' : ''}">${item.badge}</span>` : ''}
      </a>
    `).join('')}

    <div style="margin-top: auto; padding: 14px; background: rgba(15, 22, 49, 0.6); border-radius: var(--radius-md); border: var(--glass-border);">
      <div style="font-size: 0.75rem; font-weight: 700; color: var(--cyan); margin-bottom: 4px; display: flex; align-items: center; gap: 6px;">
        <i data-lucide="zap" style="width: 14px; height: 14px;"></i> Continuous Self-Healing
      </div>
      <div style="font-size: 0.7rem; color: var(--text-muted); line-height: 1.4;">
        Apex Agent continuously evaluates metrics & automatically tunes targeting & messaging.
      </div>
    </div>
  `;

  const links = container.querySelectorAll('.nav-item');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const viewId = link.getAttribute('data-view');
      onNavigate(viewId);
    });
  });

  if (window.lucide) window.lucide.createIcons();
}
