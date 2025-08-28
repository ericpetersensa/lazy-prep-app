// scripts/lazy-dm.js
class LazyDMApp extends ApplicationV2 {
  static DEFAULT_OPTIONS = {
    ...super.DEFAULT_OPTIONS,
    id: "lazy-dm-app",
    title: "Lazy DM Prep",
    template: "modules/lazy-dm-module/templates/lazy-dm.hbs",
    classes: ["lazy-dm"],
    width: 800,
    height: 600,
    resizable: true,
    tabs: [
      { navSelector: ".tabs", contentSelector: ".content", initial: "step1" }
    ]
  };

  // For now, no listeners or actions — just the structure
  _getHeaderButtons() {
    const buttons = super._getHeaderButtons();
    buttons.unshift({
      label: "Settings",
      icon: "fas fa-cog",
      onclick: () => ui.notifications.info("Settings to be implemented.")
    });
    return buttons;
  }
}

// Make it accessible via game API
Hooks.once("ready", () => {
  game.lazyDM = {
    open: () => new LazyDMApp().render(true)
  };
});
