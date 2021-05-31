import {
  GetItemFromLocalStorage,
  SaveToLocalStorageStat,
  TruncateLocalStorage,
} from "./LocalStorage.js";
import { Generate } from "./Template.js";
import { UpdateJournal, GetArticle } from "./Journal.js";

const STAT_NAME = "fvtt-encounter-stats-data";

export function GetStat() {
  const stat = GetItemFromLocalStorage(STAT_NAME);

  return stat;
}

export async function SaveStat(data) {
  const stat = SaveToLocalStorageStat(data, STAT_NAME);
  const markup = Generate(data);
  let article = await GetArticle();

  await UpdateJournal(markup, article);

  return stat;
}

export function RemoveStat() {
  TruncateLocalStorage(STAT_NAME)
}
