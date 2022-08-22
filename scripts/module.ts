import { MODULE_ID, OPT_ENABLE } from "./Settings";
import { CreateFolder } from "./Folder";
import { SetupHooks } from "./Hooks";
import ModuleSettings from "./ModuleSettings";
import EncounterJournal from "./EncounterJournal";

Hooks.once("init", async function () {
  ModuleSettings.Register();
});

Hooks.once("ready", async function () {
  if (!game.settings.get(`${MODULE_ID}`, `${OPT_ENABLE}`)) {
    return;
  }

  if (game.user.isGM) {
    CreateFolder();
    const journalEntry = await EncounterJournal.GetJournal();
    if (!journalEntry) {
      EncounterJournal.CreateJournal();
    }
  }
  SetupHooks();
});
