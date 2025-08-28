console.log("Lazy DM Test module loading…");

Hooks.once("init", () => {
  console.log("Lazy DM Test init hook fired");

  class TestApp extends ApplicationV2 {
    static DEFAULT_OPTIONS = {
      ...super.DEFAULT_OPTIONS,
      id: "lazy-dm-test-app",
      title: game.i18n.localize("LAZYDM.Title"),
      template: "modules/lazy-prep-app/templates/window.hbs",
      width: 400,
      height: 300
    };
  }

  // Register global API
  game.lazyDM = {
    open: () => new TestApp().render(true)
  };
});

// Scene controls launch button
Hooks.on("getSceneControlButtons", controls => {
  controls.push({
    name: "lazy-dm",
    title: game.i18n.localize("LAZYDM.Title"),
    icon: "fas fa-dragon",
    onClick: () => game.lazyDM.open(),
    button: true
  });
});
