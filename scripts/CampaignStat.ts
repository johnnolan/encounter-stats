import CampaignRenderer from "./CampaignRenderer";
import Chat from "./Chat";
import EncounterJournal from "./EncounterJournal";
import { RoleType } from "./enums";
import Dates from "./Helpers/Dates";
import Gamemaster from "./Helpers/Gamemaster";
import Trans from "./Helpers/Trans";
import {
  MODULE_ID,
  OPT_SETTINGS_DICE_STREAK_ENABLE,
  OPT_SETTINGS_DICE_STREAK_TO_CHAT_ENABLE,
} from "./Settings";

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

  static async AddRollStreak(
    result: number,
    actorName: string,
    actorId: string
  ) {
    if (
      !game.settings.get(`${MODULE_ID}`, `${OPT_SETTINGS_DICE_STREAK_ENABLE}`)
    ) {
      return;
    }

    const campaignStats = await this.Get();
    const date = Dates.now;

    if (!campaignStats.rollstreaklog) {
      campaignStats.rollstreaklog = [];
    }
    if (!campaignStats.rollstreak) {
      campaignStats.rollstreak = [];
    }

    const streakLogEntry = campaignStats.rollstreaklog.find(
      (f) => f.actorId === actorId
    );
    if (!streakLogEntry) {
      campaignStats.rollstreaklog.push(<RollStreakLog>{
        actorId,
        results: [result],
      });
    } else {
      const logIndex = campaignStats.rollstreaklog.findIndex(
        (fi) => fi.actorId === actorId
      );
      const actorStreakLog = campaignStats.rollstreaklog[logIndex].results;
      if (actorStreakLog.indexOf(result) > -1) {
        actorStreakLog.push(result);
        if (
          game.settings.get(
            `${MODULE_ID}`,
            `${OPT_SETTINGS_DICE_STREAK_TO_CHAT_ENABLE}`
          )
        ) {
          this._sendRollStreakChatMessage(actorName, actorStreakLog);
        }
      } else {
        if (actorStreakLog.length > 1) {
          // Save to streak length and result
          campaignStats.rollstreak.push(<RollStreakTrack>{
            actorId: actorId,
            actorName: actorName,
            dateDisplay: date.dateDisplay,
            roll: actorStreakLog[0],
            total: actorStreakLog.length,
          });
        }
        campaignStats.rollstreaklog[logIndex].results = [result]; // Reset to new number
      }
    }

    await this.Save(campaignStats);
  }

  static async _sendRollStreakChatMessage(
    actorName: string,
    actorStreakLog: number[]
  ): Promise<void> {
    await Chat.Send(
      `<h2>${Trans.Get(
        "template.roll_streak"
      )}!</h2><p>@Actor[${actorName}] ${Trans.Get("template.rolled_a")} [[${
        actorStreakLog[0]
      }]] <strong>${actorStreakLog.length}</strong> ${Trans.Get(
        "template.times_in_a_row"
      )}!</p>`
    );
  }

  static async AddCustomEvent(customEvent: HookCustomEvent) {
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

  static async AddPartyEncounterStat(
    partyStat: PartyEncounterStats,
    encounterId: string
  ) {
    const campaignPartyEncounterStat: CampaignPartyEncounterStats = {
      ...partyStat,
      date: Dates.now.dateTimeDisplay,
      encounterId,
    };
    const campaignStats = await this.Get();
    if (!campaignStats.partySummary) {
      campaignStats.partySummary = [];
    }

    campaignStats.partySummary.push(campaignPartyEncounterStat);

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
