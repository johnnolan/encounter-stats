export async function CreateFolder() {
  const folder = GetFolder();
  if (!folder) {
    await Folder.create({
      name: `encounter-stats`,
      type: "JournalEntry",
      parent: null,
      "flags.encounter-stats.parent": true,
    });
  }
}

export function GetFolder() {
  const folder = game.folders.find(
    (f) => f.getFlag("encounter-stats", "parent") === true
  );
  return folder;
}
