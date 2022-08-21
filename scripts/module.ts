import { MODULE_ID, OPT_ENABLE } from "./Settings.js";
import { CreateFolder } from "./Folder.js";
import { SetupHooks } from "./Hooks.js";
import ModuleSettings from "./ModuleSettings.js";

Hooks.once("init", async function () {
  ModuleSettings.Register();
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
