console.log("Lazy Prep App (v13 AppV2) module loaded");

Hooks.once("ready", () => {
  console.log("Lazy Prep App: ready hook fired");

  const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

  class LazyPrepApp extends HandlebarsApplicationMixin(ApplicationV2) {
    static DEFAULT_OPTIONS = {
      ...super.DEFAULT_OPTIONS,
      id: "lazy-prep-app-window",
      title: "Lazy Dungeon Master Prep",
      template: "modules/lazy-prep-app/templates/scaffold.hbs",
      width: 900,
      height: 650,
      resizable: true
    };

    activateListeners(html) {
      super.activateListeners(html);

      const tabs = html[0].querySelectorAll(".tabs .item");
      const panels = html[0].querySelectorAll(".tab-panel");

      const show = (tabId) => {
        tabs.forEach(t => t.classList.toggle("active", t.dataset.tab === tabId));
        panels.forEach(p => p.classList.toggle("active", p.dataset.tab === tabId));
      };

      // Default view
      show("step1");

      tabs.forEach(tab => {
        tab.addEventListener("click", (ev) => {
          ev.preventDefault();
          show(ev.currentTarget.dataset.tab);
        });
      });
    }
  }

  game.lazyPrep = {
    open: () => new LazyPrepApp().render(true)
  };

  ui.notifications.info("Lazy Prep App ready — run game.lazyPrep.open() to open the scaffold.");
});
