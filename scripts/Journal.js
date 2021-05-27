import { GetFolder } from "./Folder.js";
import { GetItemFromLocalStorage } from "./LocalStorage.js";

export async function CreateJournal(createCombatEvent, html) {
  const encounterId = createCombatEvent.data._id;
  const d = new Date();
  const renderSheet = false;
  const folder = GetFolder();

  const article = {
    title: d.toISOString(),
    encounterId: encounterId,
  };
  const content = {
    html: html,
  };

  await JournalEntry.create(
    {
      name: article.title,
      content: content.html,
      folder: folder ? folder.id : null,
      "flags.fvtt-encounter-stats.encounterId": encounterId,
    },
    { renderSheet }
  );
  ui.notifications.info(`fvtt-encounter-stats article ${article.title}`);
}

export async function UpdateJournal(html, article) {
  await article.update({
    name: article.title,
    content: html,
  });
}

export async function GetArticle() {
  const encounterId = GetItemFromLocalStorage()?.encounterId;
  return game.journal.find(
    (e) => e.getFlag("fvtt-encounter-stats", "encounterId") === encounterId
  );
}
