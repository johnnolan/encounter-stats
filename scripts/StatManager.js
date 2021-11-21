import {
  GetItemFromLocalStorage,
  SaveToLocalStorageStat,
  TruncateLocalStorage,
} from "./LocalStorage.js";
import { STORAGE_NAME } from "./Settings.js";
import { Generate } from "./Template.js";
import { UpdateJournal, GetArticle } from "./Journal.js";

export function GetStat() {
  return GetItemFromLocalStorage(STORAGE_NAME);
}

export async function SaveStat(data) {
  SaveToLocalStorageStat(STORAGE_NAME, data);
  const markup = Generate(data);

  let article = await GetArticle(data.encounterId);

  await UpdateJournal(markup, article);
}

export function RemoveStat() {
  TruncateLocalStorage();
}
