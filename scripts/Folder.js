export async function CreateFolder() {
  const folder = GetFolder();
  if (!folder) {
    await Folder.create({
      name: `fvtt-encounter-stats`,
      type: "JournalEntry",
      parent: null,
      "flags.fvtt-encounter-stats.parent": true,
    });
  }
}

export function GetFolder() {
  //const folder = game.folders.find(f => f.name("fvtt-encounter-stats"));
  const folder = game.folders.find(
    (f) => f.getFlag("fvtt-encounter-stats", "parent") === true
  );
  return folder;
}
