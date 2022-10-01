import CampaignRenderer from "./CampaignRenderer";
import EncounterJournal from "./EncounterJournal";
import { RoleType } from "./enums";
import Dates from "./Helpers/Dates";
import Gamemaster from "./Helpers/Gamemaster";

export default class CampaignStat {
  static async AddKill(actorName: string, tokenName: string) {
    const campaignStats = await this.Get();
    const date = Dates.now;

    const kill = <KillTrack>{
      actorName: actorName,
      tokenName: tokenName,
      date: date.dateTimeDisplay,
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
    const date = Dates.now;

    const heal = <HealTrack>{
      actorName: actorName,
      itemLink: itemLink,
      spellName: spellName,
      total: total,
      date: date.dateTimeDisplay,
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
    const date = Dates.now;

    const dice = <DiceTrack>{
      actorName: actorName,
      flavor: flavor,
      date: date.dateTimeDisplay,
    };

    if (type === RoleType.Fumble) {
      const dateEntry = campaignStats.nat1.find((f) => f.id === date.id);
      if (dateEntry) {
        dateEntry.data.push(dice);
      } else {
        campaignStats.nat1.push({
          id: date.id,
          dateDisplay: date.dateDisplay,
          data: [dice],
        });
      }
    } else if (type === RoleType.Critial) {
      const dateEntry = campaignStats.nat20.find((f) => f.id === date.id);
      if (dateEntry) {
        dateEntry.data.push(dice);
      } else {
        campaignStats.nat20.push({
          id: date.id,
          dateDisplay: date.dateDisplay,
          data: [dice],
        });
      }
    }

    await this.Save(campaignStats);
  }

  static async AddCustomEvent(customEvent: CustomHookEvent) {
    const campaignStats = await this.Get();
    if (!campaignStats.custom) {
      campaignStats.custom = [];
    }
    const date = Dates.now;
    let actorName = "";

    if (customEvent.actorId) {
      actorName = game.actors?.get(customEvent.actorId)?.name ?? "";
    }

    const customDataEvent = <CustomDataEvent>{
      EventName: customEvent.EventName,
      actorName: actorName,
      FlavorText: customEvent.FlavorText,
      date: date.dateTimeDisplay,
    };

    const dateEntry = campaignStats.custom.find((f) => f.id === date.id);
    if (dateEntry) {
      dateEntry.data.push(customDataEvent);
    } else {
      campaignStats.custom.push({
        id: date.id,
        dateDisplay: date.dateDisplay,
        data: [customDataEvent],
      });
    }

    await this.Save(campaignStats);
  }

  static async Get(): Promise<CampaignStats> {
    return Gamemaster.GetStats;
  }

  static async Save(campaignStats: CampaignStats) {
    Gamemaster.SetStats(campaignStats);
    const markup = await CampaignRenderer.Render(campaignStats);
    EncounterJournal.UpdateJournalData(markup.html, "campaignstats", "view");
  }
}
