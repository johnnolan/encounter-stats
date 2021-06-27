export class ConfigPanel extends FormApplication {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      title: game.i18n.format("FVTTEncounterStats.config.debug"),
      template: "modules/fvtt-encounter-stats/templates/config.html",
      id: "fvtt-encounter-stats-bug-report",
      width: 520,
      height: "500",
      closeOnSubmit: true,
    });
  }
  getData() {
    let data = {
      debug: `World Core Version: ${
        game.world.data.coreVersion
      }. Modules: ${JSON.stringify(Object.fromEntries(game.modules))}`,
    };
    return data;
  }
}
