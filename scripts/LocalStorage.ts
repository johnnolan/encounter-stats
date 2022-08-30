import Logger from "./Logger";
import { STORAGE_NAME } from "./Settings";

export function IsSet(item: string): boolean {
  return window.localStorage.getItem(item) !== null;
}

export function GetItemFromLocalStorage(item: string): string | undefined {
  const storageValue = window.localStorage.getItem(item);
  if (!storageValue) {
    Logger.error(
      `${item} does not exist in Local Storage.`,
      "localstorage.GetItemFromLocalStorage"
    );
    return;
  }
  return JSON.parse(storageValue);
}

export function SaveToLocalStorageStat(statType: string, data: Encounter) {
  window.localStorage.setItem(statType, JSON.stringify(data));
}

export function TruncateLocalStorage() {
  window.localStorage.removeItem(STORAGE_NAME);
}
