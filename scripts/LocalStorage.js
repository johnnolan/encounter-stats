const STORAGE_NAME = "fvtt-encounter-stats-data";

export function GetItemFromLocalStorage() {
  return JSON.parse(window.localStorage.getItem(STORAGE_NAME));
}

export function SaveToLocalStorageStat(data) {
  window.localStorage.setItem(STORAGE_NAME, JSON.stringify(data));
}

export function TruncateLocalStorage() {
  window.localStorage.removeItem(STORAGE_NAME);
}
