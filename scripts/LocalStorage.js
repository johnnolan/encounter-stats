import { STORAGE_NAME } from "./Settings";

export function GetItemFromLocalStorage(item) {
  return JSON.parse(window.localStorage.getItem(item));
}

export function SaveToLocalStorageStat(statType, data) {
  window.localStorage.setItem(statType, JSON.stringify(data));
}

export function TruncateLocalStorage() {
  window.localStorage.removeItem(STORAGE_NAME);
}
