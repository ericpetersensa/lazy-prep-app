console.log("Lazy Prep App: module file loaded");

Hooks.once("ready", () => {
  console.log("Lazy Prep App: ready hook fired");

  class LazyDMApp extends Application {
    static get defaultOptions() {
      return mergeObject(super.defaultOptions, {
        id: "lazy-dm-app",
        title: game.i18n.localize("LAZYDM.Title"),
        template: "modules/lazy-prep-app/templates/scaffold.hbs",
        width: 800,
        height: 600,
        resizable: true,
        tabs: [
          { navSelector: ".tabs", contentSelector: ".content", initial: "step1" }
        ]
      });
    }
  }

  // API to open the scaffold
  game.lazyPrep = {
    open: () => new LazyDMApp().render(true)
  };

  ui.notifications.info("Lazy Prep App loaded — run game.lazyPrep.open() to see the scaffold");
});
