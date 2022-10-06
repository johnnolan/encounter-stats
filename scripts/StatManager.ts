import EncounterJournal from "./EncounterJournal";
import CombatFlag from "./CombatFlag";
import Logger from "./Helpers/Logger";
import { STORAGE_NAME } from "./Settings";
import EncounterRenderer from "./EncounterRenderer";

class StatManager {
  static async IsInCombat() {
    const isFlagSet = await CombatFlag.IsCurrentSceneCombatSet(STORAGE_NAME);

    return isFlagSet;
  }

  static async GetStat(actorId?: string): Promise<Encounter | undefined> {
    return await CombatFlag.Get(STORAGE_NAME, actorId);
  }

  static async SaveStat(encounter: Encounter) {
    if (!encounter?.encounterId) {
      Logger.error(`No encounterId to save stat`, "statmanager.SaveStat");
      return;
    }
    await CombatFlag.Save(STORAGE_NAME, encounter);

    const markup = await EncounterRenderer.Render(encounter);

    await EncounterJournal.UpdateJournalData(
      markup.html,
      "encounterId",
      encounter.encounterId
    );
  }

  static RemoveStat() {
    CombatFlag.Remove();
  }
}

export default StatManager;
