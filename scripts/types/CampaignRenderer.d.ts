interface CampaignRender {
  nat1: Array<CampaignRollData>;
  nat20: Array<CampaignRollData>;
  heals: Array<CampaignRollData>;
  kills: Array<CampaignRollData>;
  criticalHistory: Array<CampaignRollRowData>;
  fumbleHistory: Array<CampaignRollRowData>;
  healsHistory: Array<CampaignRollRowData>;
  killsHistory: Array<CampaignRollRowData>;
  rollstreak: Array<CampaignRollRowData> | undefined;
  customEventHistory: Array<CampaignCustomData> | undefined;
}

interface CampaignCustomData {
  name: string;
  events: Array<CampaignRollRowData>;
}

interface CampaignRollData {
  name: string;
  value: string;
}

interface CampaignRollRowData {
  date: string;
  entries: Array<CampaignRollRowDataItem>;
}

interface CampaignRollRowDataItem {
  actorName: string;
  flavor: string;
  date: string;
  total?: number;
}
