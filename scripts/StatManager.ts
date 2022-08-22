import EncounterJournal from "./EncounterJournal";
import {
  GetItemFromLocalStorage,
  SaveToLocalStorageStat,
  TruncateLocalStorage,
} from "./LocalStorage";
import { STORAGE_NAME } from "./Settings";
import { Generate } from "./Template";
import { Encounter } from "./types/globals";

export function GetStat() {
  return <Encounter>GetItemFromLocalStorage(STORAGE_NAME);
}

export async function SaveStat(encounter: Encounter) {
  SaveToLocalStorageStat(STORAGE_NAME, encounter);

  const markup = Generate(encounter);

  await EncounterJournal.UpdateJournal(markup, encounter.encounterId);
}

export function RemoveStat() {
  TruncateLocalStorage();
}
