import CampaignStat from "../CampaignStat";

class Gamemaster {
  static readonly FLAG_SCOPE = "encounter-stats";
  static readonly FLAG_NAME = "campaign-stats";
  static readonly DEFAULT_DATA: CampaignStats = {
    kills: [],
    nat1: [],
    nat20: [],
    heals: [],
    custom: [],
    rollstreak: [],
    rollstreaklog: [],
    partySummary: [],
    partySummaryTotal: {
      averageDamagePerRound: 0,
      lowestDamagePerRound: 0,
      highestDamagePerRound: 0,
      totalDamage: 0,
      totalDamagePerRound: [],
    },
  };

  static get GetActor(): Actor {
    return game.users.find((f) => f.isGM);
  }

  static get GetStats(): CampaignStats {
    let currentFlagValue: CampaignStats = <CampaignStats>(
      Gamemaster.GetActor.getFlag(this.FLAG_SCOPE, this.FLAG_NAME)
    );
    if (!currentFlagValue) {
      currentFlagValue = Gamemaster.DEFAULT_DATA;
      Gamemaster.SetStats(currentFlagValue);
    }
    return currentFlagValue;
  }

  static SetStats(campaignStats: CampaignStats) {
    Gamemaster.GetActor.setFlag(this.FLAG_SCOPE, this.FLAG_NAME, campaignStats);
  }

  static DeleteStats() {
    Gamemaster.GetActor.setFlag(
      this.FLAG_SCOPE,
      this.FLAG_NAME,
      Gamemaster.DEFAULT_DATA,
    );
    CampaignStat.Save(Gamemaster.DEFAULT_DATA);
  }
}

export default Gamemaster;
