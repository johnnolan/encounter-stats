import Logger from "./Helpers/Logger";
import { STORAGE_NAME } from "./Settings";

export default class LocalStorage {
  static IsSet(item: string): boolean {
    return localStorage.getItem(item) !== null;
  }

  static GetItemFromLocalStorage(item: string): string | undefined {
    const storageValue = localStorage.getItem(item);
    if (!storageValue) {
      Logger.error(
        `${item} does not exist in Local Storage.`,
        "localstorage.GetItemFromLocalStorage"
      );
      return;
    }
    return JSON.parse(storageValue);
  }

  static SaveToLocalStorageStat(statType: string, data: Encounter) {
    localStorage.setItem(statType, JSON.stringify(data));
  }

  static TruncateLocalStorage() {
    localStorage.removeItem(STORAGE_NAME);
  }
}
