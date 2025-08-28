console.log("Lazy Prep App: module file loaded");

Hooks.once("ready", () => {
  console.log("Lazy Prep App: ready hook fired");

  class HelloWorldApp extends Application {
    static get defaultOptions() {
      return mergeObject(super.defaultOptions, {
        id: "hello-world-app",
        title: "Hello World",
        template: "modules/lazy-prep-app/templates/hello.hbs",
        width: 300,
        height: 200
      });
    }
  }

  // Simple console API for testing
  game.lazyPrep = {
    hello: () => new HelloWorldApp().render(true)
  };

  ui.notifications.info("Lazy Prep App loaded — run game.lazyPrep.hello() in console");
});
