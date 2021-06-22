import "core-js/stable";
import "regenerator-runtime/runtime";
import { MODULE_ID, OPT_ENABLE } from "./Settings.js";
import { CreateFolder } from "./Folder.js";
import { SetupHooks } from "./Hooks.js";

Hooks.once("init", async function () {
  game.settings.register(`${MODULE_ID}`, `${OPT_ENABLE}`, {
    name: game.i18n.format("FVTTEncounterStats.opt_enable_name"),
    hint: game.i18n.format("FVTTEncounterStats.opt_enable_hint"),
    scope: "world",
    config: true,
    default: true,
    type: Boolean,
  });
});

Hooks.once("ready", async function () {
  if (!game.settings.get(`${MODULE_ID}`, `${OPT_ENABLE}`)) {
    return;
  }

  if (game.user.isGM) {
    CreateFolder();
  }
  SetupHooks();
});
