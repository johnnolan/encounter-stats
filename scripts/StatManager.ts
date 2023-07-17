import EncounterJournal from "./EncounterJournal";
import CombatFlag from "./CombatFlag";
import Logger from "./Helpers/Logger";
import { STORAGE_NAME } from "./Settings";
import EncounterRenderer from "./EncounterRenderer";

class StatManager {
  static IsInCombat() {
    return CombatFlag.IsCurrentSceneCombatSet(STORAGE_NAME);
  }

  static async GetStat(actorId?: string): Promise<Encounter | undefined> {
    const encounterStat = await CombatFlag.Get(STORAGE_NAME, actorId);
    return deepClone(encounterStat);
  }

  static async SaveStat(encounter: Encounter) {
    const currentEncounter = await StatManager.GetStat();
    if (currentEncounter) {
      const diff = diffObject(currentEncounter, encounter);
      if (Object.keys(diff)?.length < 1) return;
    }
    if (!encounter?.encounterId) {
      Logger.error(`No encounterId to save stat`, "statmanager.SaveStat");
      return;
    }
    await CombatFlag.Save(STORAGE_NAME, encounter);

    const markup = await EncounterRenderer.Render(encounter);

    await EncounterJournal.UpdateJournalData(
      markup.html,
      "encounterId",
      encounter.encounterId,
    );
  }
}

export default StatManager;
