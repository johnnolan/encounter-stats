import {
  STORAGE_NAME_CAMPAIGN_DATA,
  STORAGE_NAME_CAMPAIGN_ID,
} from "./Settings.js";
import { Generate } from "./CampaignTemplate.js";
import { UpdateJournal, GetArticle } from "./Journal.js";

async function _getDataArticle() {
  let article = await GetArticle(STORAGE_NAME_CAMPAIGN_DATA);

  return article;
}

async function _updateDataArticle(data) {
  const markup = Generate(data);

  let article = await GetArticle(STORAGE_NAME_CAMPAIGN_ID);

  await UpdateJournal(markup, article);
}

export async function CampaignTrackNat1(actorId) {
  console.error("en-nat1", actorId);
  let data = _getDataArticle();

  _updateDataArticle(data);
}

export async function CampaignTrackNat20(actorId) {
  console.error("en-nat20", actorId);
  let data = _getDataArticle();

  _updateDataArticle(data);
}

export async function CampaignTrackKill(targetName, tokenId) {
  console.error("en-kill", { tokenId, targetName });
  let data = _getDataArticle();

  _updateDataArticle(data);
}

export async function CampaignTrackHealing(actorId, amount) {
  console.error("en-healing", { actorId, amount });
  let data = _getDataArticle();

  _updateDataArticle(data);
}
