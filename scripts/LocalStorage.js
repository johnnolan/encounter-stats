export function GetItemFromLocalStorage(name = "fvtt-encounter-stats") {
  return JSON.parse(window.localStorage.getItem(name));
}

export function SaveToLocalStorageStat(data, name = "fvtt-encounter-stats") {
  window.localStorage.setItem(name, JSON.stringify(data));
}

export function SaveToLocalStorage(encounterId, round) {
  const data = {
    encounterId: encounterId,
    round: round,
  };
  window.localStorage.setItem("fvtt-encounter-stats", JSON.stringify(data));
}

export function TruncateLocalStorage() {
  window.localStorage.removeItem("fvtt-encounter-stats");
  window.localStorage.removeItem("fvtt-encounter-stats-data");
}
