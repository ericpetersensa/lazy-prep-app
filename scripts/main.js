console.log("Lazy Prep App (v13 AppV2): module file loaded");

Hooks.once("ready", () => {
  console.log("Lazy Prep App (v13 AppV2): ready hook fired");

  // v13-native ApplicationV2
  const { ApplicationV2 } = foundry.applications.api;

  class LazyPrepApp extends ApplicationV2 {
    static DEFAULT_OPTIONS = {
      ...super.DEFAULT_OPTIONS,
      id: "lazy-prep-app",
      title: "Lazy Dungeon Master Prep",
      template: "modules/lazy-prep-app/templates/scaffold.hbs",
      width: 900,
      height: 650,
      resizable: true
    };

    // Simple, framework-agnostic tab controller
    activateListeners(html) {
      super.activateListeners?.(html);
      const root = html instanceof HTMLElement ? html : html[0];

      const tabs = Array.from(root.querySelectorAll(".tabs .item"));
      const panels = Array.from(root.querySelectorAll(".tab-panel"));

      const show = (tabId) => {
        tabs.forEach(a => a.classList.toggle("active", a.dataset.tab === tabId));
        panels.forEach(p => p.classList.toggle("active", p.dataset.tab === tabId));
      };

      // Initial tab
      show("step1");

      // Click handlers
      tabs.forEach(a => {
        a.addEventListener("click", (ev) => {
          ev.preventDefault();
          const target = ev.currentTarget;
          if (!(target instanceof HTMLElement)) return;
          const tabId = target.dataset.tab;
          if (tabId) show(tabId);
        });
      });
    }
  }

  // Expose a simple console API
  game.lazyPrep = {
    open: () => new LazyPrepApp().render(true)
  };

  ui.notifications.info("Lazy Prep App loaded — run game.lazyPrep.open() to open the 8-tab scaffold.");
});
