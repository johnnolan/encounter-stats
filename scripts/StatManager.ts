import EncounterJournal from "./EncounterJournal";
import CombatFlag from "./CombatFlag";
import Logger from "./Helpers/Logger";
import { STORAGE_NAME } from "./Settings";
import Template from "./Template";

class StatManager {
  static async IsInCombat() {
    const isFlagSet = await CombatFlag.IsSet(STORAGE_NAME);
    if (!game.combat?.active && isFlagSet) {
      return false;
    }
    return isFlagSet;
  }

  static async GetStat(): Promise<Encounter | undefined> {
    return await CombatFlag.Get(STORAGE_NAME);
  }

  static async SaveStat(encounter: Encounter) {
    if (!encounter?.encounterId) {
      Logger.error(`No encounterId to save stat`, "statmanager.SaveStat");
      return;
    }
    await CombatFlag.Save(STORAGE_NAME, encounter);

    const markup = Template.Generate(encounter);

    await EncounterJournal.UpdateJournalData(
      markup,
      "encounterId",
      encounter.encounterId
    );
  }

  static RemoveStat() {
    CombatFlag.Remove();
  }
}

export default StatManager;
