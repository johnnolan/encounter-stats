import {
  GetItemFromLocalStorage,
  SaveToLocalStorageStat,
  TruncateLocalStorage,
} from "./LocalStorage.js";
import { Generate } from "./Template.js";
import { UpdateJournal, GetArticle } from "./Journal.js";

export function GetStat() {
  const stat = GetItemFromLocalStorage();

  return stat;
}

export async function SaveStat(data) {
  const stat = SaveToLocalStorageStat(data);
  const markup = Generate(data);
  let article = await GetArticle();

  await UpdateJournal(markup, article);

  return stat;
}

export function RemoveStat() {
  TruncateLocalStorage();
}
