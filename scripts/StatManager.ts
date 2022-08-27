import EncounterJournal from "./EncounterJournal";
import {
  GetItemFromLocalStorage,
  SaveToLocalStorageStat,
  TruncateLocalStorage,
  IsSet,
} from "./LocalStorage";
import { STORAGE_NAME } from "./Settings";
import { Generate } from "./Template";

class StatManager {
  static IsInCombat() {
    const isLocalStorageSet = IsSet(STORAGE_NAME);
    if (!game.combat.active && isLocalStorageSet) {
      this.RemoveStat();
      return false;
    }
    return isLocalStorageSet;
  }

  static GetStat() {
    return <Encounter>GetItemFromLocalStorage(STORAGE_NAME);
  }

  static async SaveStat(encounter: Encounter) {
    SaveToLocalStorageStat(STORAGE_NAME, encounter);

    const markup = Generate(encounter);

    await EncounterJournal.UpdateJournal(markup, encounter.encounterId);
  }

  static RemoveStat() {
    TruncateLocalStorage();
  }
}

export default StatManager;
