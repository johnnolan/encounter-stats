import { STORAGE_NAME } from "./Settings.js";
import { GetItemFromLocalStorage } from "./LocalStorage.js";
import { Generate } from "./CampaignTemplate.js";
import {
  UpdateJournal,
  GetCampaignDataArticle,
  GetCampaignArticle,
} from "./Journal.js";

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
  let data = await _getDataArticle();
  data.nat1.push({
    date: new Date().toISOString(),
    actorName: actorName,
    flavor: flavor,
  });

  _updateDataArticle(data);
}

export async function CampaignTrackNat20(actorName, flavor) {
  let data = await _getDataArticle();
  data.nat20.push({
    date: new Date().toISOString(),
    actorName: actorName,
    flavor: flavor,
  });

  _updateDataArticle(data);
}

export async function CampaignTrack(date) {
  let data = await _getDataArticle();

  let currentEncounterStats = GetItemFromLocalStorage(STORAGE_NAME);

  for (let i = 0; i < currentEncounterStats.combatants.length; i++) {
    const combatant = currentEncounterStats.combatants[i];
    if (combatant.type === "character") {
      for (let j = 0; j < combatant.kills.length; j++) {
        const event = combatant.kills[j];
        data.kills.push({
          actorId: combatant.id,
          tokenName: event.tokenName,
          actorName: combatant.name,
          date: date,
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
          data.heals.push({
            actorId: combatant.id,
            spellName: event.item.name ? event.item.name : null,
            itemLink: event.item.itemLink ? event.item.itemLink : null,
            damageTotal: event.damageTotal,
            actorName: combatant.name,
            date: date,
          });
        }
      }
    }
  }

  _updateDataArticle(data);
}
