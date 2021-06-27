import { MODULE_ID, OPT_ENABLE, OPT_ENABLE_AOE_DAMAGE } from "./Settings.js";
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
  game.settings.register(`${MODULE_ID}`, `${OPT_ENABLE_AOE_DAMAGE}`, {
    name: game.i18n.format("FVTTEncounterStats.enable_aoe_damage_name"),
    hint: game.i18n.format("FVTTEncounterStats.enable_aoe_damage_hint"),
    scope: "world",
    config: true,
    default: false,
    type: Boolean,
    onChange: () => window.location.reload(),
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
