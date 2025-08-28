console.log("Lazy DM Test module loading…");

class TestApp extends ApplicationV2 {
  static DEFAULT_OPTIONS = {
    ...super.DEFAULT_OPTIONS,
    id: "lazy-dm-test-app",
    title: game.i18n.localize("LAZYDM.Title"),
    template: "modules/lazy-dm-module/templates/window.hbs",
    width: 400,
    height: 300
  };
}

Hooks.once("init", () => {
  console.log("Lazy DM Test init hook fired");
  game.lazyDM = {
    open: () => new TestApp().render(true)
  };
});

Hooks.on("getSceneControlButtons", controls => {
  controls.push({
    name: "lazy-dm",
    title: game.i18n.localize("LAZYDM.Title"),
    icon: "fas fa-dragon",
    onClick: () => game.lazyDM.open(),
    button: true
  });
});
