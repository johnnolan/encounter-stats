import { MODULE_ID, OPT_ENABLE } from "./Settings";
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
    if (!EncounterJournal.IsJournalSetup()) {
      EncounterJournal.CreateJournal();
    }
    if (!(await EncounterJournal.IsCampaignJournalSetup())) {
      EncounterJournal.CreateCampaignJournalEntryPage();
    }
  }
  SetupHooks();
});
