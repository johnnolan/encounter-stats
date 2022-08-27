import { STORAGE_NAME } from "./Settings";

export function IsSet(item: string): boolean {
  return window.localStorage.getItem(item) !== null;
}

export function GetItemFromLocalStorage(item: string) {
  return JSON.parse(window.localStorage.getItem(item));
}

export function SaveToLocalStorageStat(statType: string, data: Encounter) {
  window.localStorage.setItem(statType, JSON.stringify(data));
}

export function TruncateLocalStorage() {
  window.localStorage.removeItem(STORAGE_NAME);
}