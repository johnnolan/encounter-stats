import { GetFolder } from "./Folder.js";
import { MODULE_ID, OPT_ENABLE_JOURNAL_NOTIFICATION } from "./Settings.js";
import SimpleCalendarIntegration from "./integrations/SimpleCalendarIntegration.js";

export async function CreateJournal(encounterId, type) {
  let title = `${new Date().toISOString()} - ${type}`;
  const folder = GetFolder();

  if (SimpleCalendarIntegration.IsEnabled()) {
    title = `${SimpleCalendarIntegration.GetCurrentDateToString()} (${encounterId} - ${type})`;
  }

  const article = {
    title: title,
  };
  const content = {
    html: "",
  };

  await JournalEntry.create(
    {
      name: article.title,
      content: content.html,
      folder: folder ? folder.id : null,
      "flags.fvtt-encounter-stats.encounterId": encounterId + type,
    },
    { renderSheet: false, activate: false }
  );

  if (game.settings.get(`${MODULE_ID}`, `${OPT_ENABLE_JOURNAL_NOTIFICATION}`)) {
    ui.notifications.info(`fvtt-encounter-stats article ${article.title}`);
  }
}

export async function UpdateJournal(html, article) {
  await article.update({
    name: article.title,
    content: html,
  });
}

export async function GetArticle(encounterId, type) {
  return game.journal.find(
    (e) =>
      e.getFlag("fvtt-encounter-stats", "encounterId") === encounterId + type
  );
}

// Campaign Data Article
async function _getCampaignDataArticle() {
  return game.journal.find(
    (e) =>
      e.getFlag("fvtt-encounter-stats", "campaigndatastats") ===
      "campaigndatastats"
  );
}

export async function GetCampaignDataArticle() {
  let article = await _getCampaignDataArticle();

  if (!article) {
    await CreateCampaignDataJournal();
  }

  return _getCampaignDataArticle();
}

export async function CreateCampaignDataJournal() {
  const folder = GetFolder();

  const article = {
    title: "Campaign Data Stats",
  };
  const content = {
    html: `{"kills": {}, "nat1": {}, "nat20": {}, "heals": {}}`,
  };

  await JournalEntry.create(
    {
      name: article.title,
      content: content.html,
      folder: folder ? folder.id : null,
      "flags.fvtt-encounter-stats.campaigndatastats": "campaigndatastats",
    },
    { renderSheet: false, activate: false }
  );
}

// Campaign Article
async function _getCampaignArticle() {
  return game.journal.find(
    (e) =>
      e.getFlag("fvtt-encounter-stats", "campaignstats") === "campaignstats"
  );
}

export async function GetCampaignArticle() {
  let article = await _getCampaignArticle();

  if (!article) {
    await CreateCampaignJournal();
  }

  return _getCampaignArticle();
}

export async function CreateCampaignJournal() {
  const folder = GetFolder();

  const article = {
    title: "Campaign Stats",
  };
  const content = {
    html: ``,
  };

  await JournalEntry.create(
    {
      name: article.title,
      content: content.html,
      folder: folder ? folder.id : null,
      "flags.fvtt-encounter-stats.campaignstats": "campaignstats",
    },
    { renderSheet: false, activate: false }
  );
}
