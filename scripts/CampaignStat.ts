import { Generate } from "./CampaignTemplate";
import EncounterJournal from "./EncounterJournal";
import { RoleType } from "./enums";

export default class CampaignStat {
  private static Date() {
    const date = new Date().toISOString();
    return {
      id: date.replace(/[-]/g, "").substring(0, 8),
      dateDisplay: date.substring(0, 10),
    };
  }

  static async AddKill(actorName: string, tokenName: string) {
    const campaignStats = await this.Get();
    const date = this.Date();

    const kill = <KillTrack>{
      actorName: actorName,
      tokenName: tokenName,
      date: new Date().toISOString(),
    };

    const dateEntry = campaignStats.kills.find((f) => f.id === date.id);
    if (dateEntry) {
      dateEntry.data.push(kill);
    } else {
      campaignStats.kills.push({
        id: date.id,
        dateDisplay: date.dateDisplay,
        data: [kill],
      });
    }

    await this.Save(campaignStats);
  }

  static async AddHeal(
    actorName: string,
    itemLink: string,
    spellName: string,
    total: number
  ) {
    const campaignStats = await this.Get();
    const date = this.Date();

    const heal = <HealTrack>{
      actorName: actorName,
      itemLink: itemLink,
      spellName: spellName,
      total: total,
      date: new Date().toISOString(),
    };

    const dateEntry = campaignStats.heals.find((f) => f.id === date.id);
    if (dateEntry) {
      dateEntry.data.push(heal);
    } else {
      campaignStats.heals.push({
        id: date.id,
        dateDisplay: date.dateDisplay,
        data: [heal],
      });
    }

    await this.Save(campaignStats);
  }

  static async AddRole(type: RoleType, actorName: string, flavor: string) {
    const campaignStats = await this.Get();
    const date = this.Date();

    const dice = <DiceTrack>{
      actorName: actorName,
      flavor: flavor,
      date: new Date().toISOString(),
    };

    if (type === RoleType.Fumble) {
      const dateEntry = campaignStats.fumble.find((f) => f.id === date.id);
      if (dateEntry) {
        dateEntry.data.push(dice);
      } else {
        campaignStats.fumble.push({
          id: date.id,
          dateDisplay: date.dateDisplay,
          data: [dice],
        });
      }
    } else if (type === RoleType.Critial) {
      const dateEntry = campaignStats.critical.find((f) => f.id === date.id);
      if (dateEntry) {
        dateEntry.data.push(dice);
      } else {
        campaignStats.critical.push({
          id: date.id,
          dateDisplay: date.dateDisplay,
          data: [dice],
        });
      }
    }

    await this.Save(campaignStats);
  }

  static async Get(): Promise<CampaignStats> {
    return await EncounterJournal.GetCampaignJournal();
  }

  static async Save(campaignStats: CampaignStats) {
    EncounterJournal.UpdateCampaignDataJournal(JSON.stringify(campaignStats));
    EncounterJournal.UpdateCampaignJournal(Generate(campaignStats));
  }
}
