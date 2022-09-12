import EncounterJournal from "./EncounterJournal";
import LocalStorage from "./LocalStorage";
import Logger from "./Helpers/Logger";
import { STORAGE_NAME } from "./Settings";
import Template from "./Template";

class StatManager {
  static IsInCombat() {
    const isLocalStorageSet = LocalStorage.IsSet(STORAGE_NAME);
    if (!game.combat?.active && isLocalStorageSet) {
      this.RemoveStat();
      return false;
    }
    return isLocalStorageSet;
  }

  static GetStat() {
    return <Encounter>LocalStorage.GetItemFromLocalStorage(STORAGE_NAME);
  }

  static async SaveStat(encounter: Encounter) {
    if (!encounter?.encounterId) {
      Logger.error(`No encounterId to save stat`, "statmanager.SaveStat");
      return;
    }
    LocalStorage.SaveToLocalStorageStat(STORAGE_NAME, encounter);

    const markup = Template.Generate(encounter);

    await EncounterJournal.UpdateJournalData(
      markup,
      "encounterId",
      encounter.encounterId
    );
  }

  static RemoveStat() {
    LocalStorage.TruncateLocalStorage();
  }
}

export default StatManager;
