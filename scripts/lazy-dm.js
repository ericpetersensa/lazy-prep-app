console.log("Lazy DM module loading...");

class LazyDMApp extends ApplicationV2 {
  static DEFAULT_OPTIONS = {
    ...super.DEFAULT_OPTIONS,
    id: "lazy-dm-app",
    title: game.i18n.localize("LAZYDM.Title"),
    template: "modules/lazy-dm-module/templates/lazy-dm.hbs",
    classes: ["lazy-dm"],
    width: 800,
    height: 600,
    resizable: true,
    tabs: [{ navSelector: ".tabs", contentSelector: ".content", initial: "step1" }]
  };
}

// Register API early so it's always callable
Hooks.once("init", () => {
  console.log("Lazy DM init hook fired.");
  game.lazyDM = {
    open: () => new LazyDMApp().render(true)
  };
});

// Optional: add a Scene Controls button to launch app without console
Hooks.on("getSceneControlButtons", controls => {
  controls.push({
    name: "lazy-dm",
    title: game.i18n.localize("LAZYDM.Title"),
    icon: "fas fa-dragon",
    onClick: () => game.lazyDM.open(),
    button: true
  });
});
