export class ConfigPanel extends FormApplication {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      title: game.i18n.format("EncounterStats.config.debug"),
      template: "modules/encounter-stats/templates/config.html",
      id: "encounter-stats-bug-report",
      width: 520,
      height: "500",
      closeOnSubmit: true,
    });
  }
  getData() {
    var moduleData = [];
    for (const [key, value] of game.modules.entries()) {
      moduleData.push({
        key: key,
        id: value.id,
        name: value.data.name,
        active: value.active,
        compatibleCoreVersion: value.data.compatibleCoreVersion,
        minimumCoreVersion: value.data.minimumCoreVersion,
        version: value.data.version,
      });
    }
    var gameSettingsData = [];
    for (const [key] of game.settings.settings.entries()) {
      if (
        key.indexOf("encounter-stats.") === 0 ||
        key.indexOf("midi-qol.") === 0
      ) {
        let keySplit = key.split(".");
        let gameSetting = game.settings.get(`${keySplit[0]}`, `${keySplit[1]}`);
        gameSettingsData.push({
          id: key,
          value: gameSetting,
        });
      }
    }
    let data = {
      debug: JSON.stringify({
        coreVersion: game.world.data.coreVersion,
        modules: moduleData,
        settings: gameSettingsData,
      }),
    };
    return data;
  }
}
