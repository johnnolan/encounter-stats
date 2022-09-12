import { MODULE_ID, OPT_ENABLE } from "./Settings";
import SetupHooks from "./SetupHooks";
import ModuleSettings from "./ModuleSettings";
import EncounterJournal from "./EncounterJournal";
import Logger from "./Helpers/Logger";

Hooks.once("init", async function () {
  ModuleSettings.Register();

  Logger.log(`Settings Registered`, "module.init");
});

Hooks.once("ready", async function () {
  if (!game.settings.get(`${MODULE_ID}`, `${OPT_ENABLE}`)) {
    return;
  }

  if (game.user?.isGM) {
    if (!EncounterJournal.IsJournalSetup()) {
      await EncounterJournal.CreateJournal();
    }
    if (!(await EncounterJournal.IsCampaignJournalSetup())) {
      await EncounterJournal.CreateCampaignJournalEntryPage();
    }
  }
  SetupHooks.Setup();

  Logger.log(`Module Ready`, "module.ready");
});
