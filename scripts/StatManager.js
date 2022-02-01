import {
  GetItemFromLocalStorage,
  SaveToLocalStorageStat,
  TruncateLocalStorage,
} from "./LocalStorage.js";
import {
  STORAGE_NAME,
  OPT_ENABLE_MONSTER_STATS,
  MODULE_ID,
} from "./Settings.js";
import { Generate } from "./Template.js";
import { Generate as GenerateNPC } from "./NPCTemplate.js";
import { UpdateJournal, GetArticle } from "./Journal.js";

export function GetStat() {
  return GetItemFromLocalStorage(STORAGE_NAME);
}

export async function SaveStat(data) {
  SaveToLocalStorageStat(STORAGE_NAME, data);

  if (game.settings.get(`${MODULE_ID}`, `${OPT_ENABLE_MONSTER_STATS}`)) {
    const npcMarkup = GenerateNPC(data);
    let npcArticle = await GetArticle(data.encounterId, "NPC");
    await UpdateJournal(npcMarkup, npcArticle);
  }

  const markup = Generate(data);

  let article = await GetArticle(data.encounterId, "PC");

  await UpdateJournal(markup, article);
}

export function RemoveStat() {
  TruncateLocalStorage();
}
