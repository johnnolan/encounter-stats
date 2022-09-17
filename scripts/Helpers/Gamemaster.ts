class Gamemaster {
  static readonly FLAG_SCOPE = "encounter-stats";
  static readonly FLAG_NAME = "campaign-stats";

  static get GetActor(): Actor {
    return game.users.find((f) => f.isGM);
  }

  static get GetStats(): CampaignStats {
    let currentFlagValue: CampaignStats = <CampaignStats>(
      Gamemaster.GetActor.getFlag(this.FLAG_SCOPE, this.FLAG_NAME)
    );
    if (!currentFlagValue) {
      currentFlagValue = {
        kills: [],
        nat1: [],
        nat20: [],
        heals: [],
      };
      Gamemaster.SetStats(currentFlagValue);
    }
    return currentFlagValue;
  }

  static SetStats(campaignStats: CampaignStats) {
    Gamemaster.GetActor.setFlag(this.FLAG_SCOPE, this.FLAG_NAME, campaignStats);
  }
}

export default Gamemaster;
