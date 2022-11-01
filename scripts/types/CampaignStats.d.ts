interface CustomDataEvent {
  EventName: string;
  FlavorText: string;
  actorName?: string;
  date: string;
}

interface CampaignStat {
  id: string;
  dateDisplay: string;
  data: Array<DiceTrack> | Array<CustomDataEvent>;
}

interface DiceTrack {
  actorName: string;
  flavor: string;
  date: string;
}

interface CampaignStats {
  nat1: Array<CampaignStat>;
  nat20: Array<CampaignStat>;
  heals: Array<CampaignStat>;
  kills: Array<CampaignStat>;
  custom: Array<CampaignStat>;
}
