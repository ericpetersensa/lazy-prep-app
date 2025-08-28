console.log("Lazy Prep App (diagnostic) module loaded");

Hooks.once("ready", () => {
  console.log("Lazy Prep App: ready hook fired");

  const { ApplicationV2, HandlebarsApplicationMixin } = foundry.applications.api;

  class LazyPrepApp extends HandlebarsApplicationMixin(ApplicationV2) {
    static DEFAULT_OPTIONS = {
      ...super.DEFAULT_OPTIONS,
      id: "lazy-prep-app-window",
      title: "Lazy Dungeon Master Prep (Diagnostic)",
      template: "modules/lazy-prep-app/templates/scaffold.hbs",
      width: 900,
      height: 650,
      resizable: true
    };

    /** Log exactly what got rendered */
    async _renderHTML(context, options) {
      const html = await super._renderHTML(context, options);
      console.log("=== TEMPLATE HTML OUTPUT START ===");
      console.log(html.outerHTML);
      console.log("=== TEMPLATE HTML OUTPUT END ===");
      return html;
    }

    activateListeners(html) {
      super.activateListeners(html);

      console.log("activateListeners fired");
      console.log("Tabs found:", html[0].querySelectorAll(".tabs .item").length);
      console.log("Panels found:", html[0].querySelectorAll(".tab-panel").length);

      const tabs = html[0].querySelectorAll(".tabs .item");
      const panels = html[0].querySelectorAll(".tab-panel");

      const show = (tabId) => {
        console.log("Switching to tab:", tabId);
        tabs.forEach(t => t.classList.toggle("active", t.dataset.tab === tabId));
        panels.forEach(p => p.classList.toggle("active", p.dataset.tab === tabId));
      };

      // Force show step1 on load
      show("step1");

      tabs.forEach(tab => {
        tab.addEventListener("click", ev => {
          ev.preventDefault();
          show(tab.dataset.tab);
        });
      });
    }
  }

  game.lazyPrep = {
    open: () => new LazyPrepApp().render(true)
  };

  ui.notifications.info("Lazy Prep App (diagnostic) ready — run game.lazyPrep.open() to test.");
});
