import EncounterJournal from "./EncounterJournal";
import CombatFlag from "./CombatFlag";
import Logger from "./Helpers/Logger";
import { STORAGE_NAME } from "./Settings";
import EncounterRenderer from "./EncounterRenderer";

class StatManager {
  static async IsInCombat() {
    const isFlagSet = await CombatFlag.IsSet(STORAGE_NAME);
    if (!game.combat?.active && isFlagSet) {
      return false;
    }
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

    const markup = await EncounterRenderer.RenderEncounter(encounter);

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
