import {
  GetItemFromLocalStorage,
  SaveToLocalStorageStat,
} from "./LocalStorage.js";

const STAT_NAME = "fvtt-encounter-stats-data";

export function GetStat() {
  const stat = GetItemFromLocalStorage(STAT_NAME);

  return stat;
}

export function SaveStat(data) {
  const stat = SaveToLocalStorageStat(data, STAT_NAME);

  return stat;
}
