import {
  GetItemFromLocalStorage,
  SaveToLocalStorageStat,
  TruncateLocalStorage,
} from "./LocalStorage.js";
import { STORAGE_NAME } from "./Settings.js";
import { Generate } from "./Template.js";
import { UpdateJournal, GetArticle } from "./Journal.js";
import { Encounter } from "./types/globals.js";

export function GetStat() {
  return <Encounter>GetItemFromLocalStorage(STORAGE_NAME);
}

export async function SaveStat(encounter: Encounter) {
  SaveToLocalStorageStat(STORAGE_NAME, encounter);

  const markup = Generate(encounter);

  const article = await GetArticle(encounter.encounterId, "PC");

  await UpdateJournal(markup, article);
}

export function RemoveStat() {
  TruncateLocalStorage();
}
