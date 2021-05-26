export function GetItemFromLocalStorage() {
  return JSON.parse(window.localStorage.getItem("fvtt-encounter-stats"));
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
}
