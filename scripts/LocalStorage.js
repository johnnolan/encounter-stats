export function GetItemFromLocalStorage(name) {
  return JSON.parse(window.localStorage.getItem(name));
}

export function SaveToLocalStorageStat(data, name) {
  window.localStorage.setItem(name, JSON.stringify(data));
}

export function TruncateLocalStorage(name) {
  window.localStorage.removeItem(name);
}
