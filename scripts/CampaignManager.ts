import { STORAGE_NAME } from "./Settings";
import { GetItemFromLocalStorage } from "./LocalStorage";
import { Generate } from "./CampaignTemplate";
import EncounterJournal from "./EncounterJournal";
import SimpleCalendarIntegration from "./integrations/SimpleCalendarIntegration";

function _getDateGroup() {
  let dName;

  if (SimpleCalendarIntegration.IsEnabled()) {
    dName = `D${SimpleCalendarIntegration
      .GetCurrentDateToString()
      .replace(/ /g, "")}`;
  } else {
    let d = new Date().toISOString();
    dName = `D${d.substring(0, 10).replace(/-/g, "")}`;
  }

  return dName;
}

function _simpleCalendarName() {
  let dName;

  if (SimpleCalendarIntegration.IsEnabled()) {
    dName = `${SimpleCalendarIntegration.GetCurrentDateToString()}`;
  } else {
    let d = new Date().toISOString();
    dName = `${d.substring(0, 10)}`;
  }
  return dName;
}

async function _getDataArticle() {
  let article = await GetCampaignDataArticle();
  let content = article.data.content.replace("<p>", "").replace("</p>", "");
  return JSON.parse(content);
}

async function _updateDataArticle(data) {
  let article = await GetCampaignDataArticle();
  await UpdateJournal(JSON.stringify(data), article);

  const markup = Generate(data);

  let campaignArticle = await GetCampaignArticle();

  await UpdateJournal(markup, campaignArticle);
}

export async function CampaignTrackNat1(actorName, flavor) {
  const dName = _getDateGroup();

  let data = await _getDataArticle();
  if (!data.nat1[dName]) {
    data.nat1[dName] = [];
  }

  data.nat1[dName].push({
    date: new Date().toISOString(),
    actorName: actorName,
    flavor: flavor,
    simpleCalendarName: _simpleCalendarName(),
  });

  _updateDataArticle(data);
}

export async function CampaignTrackNat20(actorName, flavor) {
  const dName = _getDateGroup();

  let data = await _getDataArticle();
  if (!data.nat20[dName]) {
    data.nat20[dName] = [];
  }

  data.nat20[dName].push({
    date: new Date().toISOString(),
    actorName: actorName,
    flavor: flavor,
    simpleCalendarName: _simpleCalendarName(),
  });

  _updateDataArticle(data);
}

export async function CampaignTrack(date) {
  const dName = _getDateGroup();

  let data = await _getDataArticle();

  let currentEncounterStats = GetItemFromLocalStorage(STORAGE_NAME);

  for (let i = 0; i < currentEncounterStats.combatants.length; i++) {
    const combatant = currentEncounterStats.combatants[i];
    if (combatant.type === "character") {
      for (let j = 0; j < combatant.kills.length; j++) {
        const event = combatant.kills[j];
        if (!data.kills[dName]) {
          data.kills[dName] = [];
        }
        data.kills[dName].push({
          actorId: combatant.id,
          tokenName: event.tokenName,
          actorName: combatant.name,
          date: date,
          simpleCalendarName: _simpleCalendarName(),
        });
      }
    }
  }

  for (let i = 0; i < currentEncounterStats.combatants.length; i++) {
    const combatant = currentEncounterStats.combatants[i];
    if (combatant.type === "character") {
      for (let j = 0; j < combatant.events.length; j++) {
        const event = combatant.events[j];
        if (event.actionType === "heal") {
          if (!data.heals[dName]) {
            data.heals[dName] = [];
          }
          data.heals[dName].push({
            actorId: combatant.id,
            spellName: event.item.name ? event.item.name : null,
            itemLink: event.item.itemLink ? event.item.itemLink : null,
            damageTotal: event.damageTotal,
            actorName: combatant.name,
            date: date,
            simpleCalendarName: _simpleCalendarName(),
          });
        }
      }
    }
  }

  _updateDataArticle(data);
}
