interface CampaignStats {
  nat1: Array<CampaignStat>;
  nat20: Array<CampaignStat>;
  heals: Array<CampaignStat>;
  kills: Array<CampaignStat>;
  rollstreak: Array<RollStreakTrack>;
  custom: Array<CampaignStat>;
  rollstreaklog: Array<RollStreakLog>;
}

interface CampaignStat {
  id: string;
  dateDisplay: string;
  data: Array<DiceTrack> | Array<CustomDataEvent> | Array<RollStreakTrack>;
}

interface RollStreakTrack {
  actorId: string;
  actorName: string;
  dateDisplay: string;
  roll: number;
  total: number;
}

interface CustomDataEvent {
  EventName: string;
  FlavorText: string;
  actorName?: string;
  date: string;
}

interface DiceTrack {
  actorName: string;
  flavor: string;
  date: string;
}

interface RollStreakLog {
  actorId: string;
  result: number;
}
