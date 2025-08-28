console.log("Lazy DM Test module loading…");

class TestApp extends ApplicationV2 {
  static DEFAULT_OPTIONS = {
    ...super.DEFAULT_OPTIONS,
    id: "lazy-dm-test-app",
    title: "Lazy DM Test Window",
    template: "modules/lazy-dm-module/templates/window.hbs",
    width: 400,
    height: 300
  };
}

Hooks.once("init", () => {
  console.log("Lazy DM Test init");
  game.lazyDM = {
    open: () => new TestApp().render(true)
  };
});

Hooks.on("getSceneControlButtons", controls => {
  controls.push({
    name: "lazy-dm",
    title: "Lazy DM Test",
    icon: "fas fa-dragon",
    onClick: () => game.lazyDM.open(),
    button: true
  });
});
