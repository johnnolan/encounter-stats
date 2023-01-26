import { MODULE_ID, OPT_SETTINGS_DICE_STREAK_ENABLE } from "./Settings";

class CampaignRenderer {
  static async Render(campaignStats: CampaignStats) {
    const renderData: CampaignRender = {
      nat1: await this.GenerateSummaryRow(campaignStats, "nat1"),
      nat20: await this.GenerateSummaryRow(campaignStats, "nat20"),
      heals: await this.GenerateSummaryRow(campaignStats, "heals"),
      kills: await this.GenerateSummaryRow(campaignStats, "kills"),
      criticalHistory: await this.GenerateRollRow(campaignStats.nat20),
      fumbleHistory: await this.GenerateRollRow(campaignStats.nat1),
      healsHistory: await this.GenerateHealRow(campaignStats.heals),
      killsHistory: await this.GenerateKillsRow(campaignStats.kills),
      rollstreak: await this.GenerateKillStreakRow(campaignStats.rollstreak),
      customEventHistory: await this.GenerateCustomEventRows(campaignStats),
      partySummary: campaignStats.partySummary.reverse(),
    };

    const template_file = "./modules/encounter-stats/templates/campaign_1.hbs";
    const rendered_html = await renderTemplate(template_file, renderData);

    return { html: rendered_html, data: renderData };
  }

  private static async GenerateCustomEventRows(campaignStats: CampaignStats) {
    const data: Array<CampaignCustomData> = [];
    const statList = campaignStats.custom;

    if (statList.length === 0) return;

    // Get unique EventIds
    const eventIds = []
      .concat(
        // eslint-disable-next-line no-unsafe-optional-chaining
        ...statList?.map((m) =>
          m.data.map((im) => {
            return im.EventName;
          })
        )
      )
      .reduce(
        (unique, item) => (unique.includes(item) ? unique : [...unique, item]),
        []
      );

    // Foreach eventid
    eventIds.forEach((eventName) => {
      const event = {
        name: eventName,
        events: [],
      };
      statList.forEach((statItem) => {
        // filter statList
        const dateStatList = statItem.data.filter(
          (f) => f.EventName === eventName
        );
        if (dateStatList?.length === 0) return;

        const entry: CampaignRollRowData = {
          date: statItem.dateDisplay,
          entries: [],
        };
        dateStatList.forEach((statEntry) => {
          // Generate row
          entry.entries.push({
            actorName: statEntry.actorName,
            flavor: statEntry.FlavorText,
            date: statEntry.date,
          });
        });
        event.events.push(entry);
      });

      data.push(event);
    });

    return data;
  }

  private static async GenerateHealRow(campaignStatEntry) {
    const data: Array<CampaignRollRowData> = [];

    campaignStatEntry.reverse().forEach((metric) => {
      const entry: CampaignRollRowData = {
        date: metric.dateDisplay,
        entries: [],
      };

      metric.data.forEach((healTrack: HealTrack) => {
        entry.entries.push({
          actorName: healTrack.actorName,
          flavor: healTrack.itemLink ? healTrack.itemLink : healTrack.spellName,
          date: healTrack.date,
          total: healTrack.total,
        });
      });
      data.push(entry);
    });

    return data;
  }

  private static async GenerateKillStreakRow(campaignStatEntry) {
    const data: Array<CampaignRollRowData> = [];
    if (
      !game.settings.get(`${MODULE_ID}`, `${OPT_SETTINGS_DICE_STREAK_ENABLE}`)
    ) {
      return data;
    }

    if (!campaignStatEntry) {
      return;
    }

    campaignStatEntry.reverse().forEach((rollStreak: RollStreakTrack) => {
      const entry: CampaignRollRowData = {
        date: rollStreak.dateDisplay,
        entries: [],
      };

      entry.entries.push({
        actorName: rollStreak.actorName,
        flavor: `<strong>${rollStreak.roll}</strong> - <i>${rollStreak.total}</i>`,
        date: rollStreak.dateDisplay,
      });

      data.push(entry);
    });

    return data;
  }

  private static async GenerateKillsRow(campaignStatEntry) {
    const data: Array<CampaignRollRowData> = [];

    campaignStatEntry.reverse().forEach((metric) => {
      const entry: CampaignRollRowData = {
        date: metric.dateDisplay,
        entries: [],
      };

      metric.data.forEach((kill: KillTrack) => {
        entry.entries.push({
          actorName: kill.actorName,
          flavor: kill.tokenName,
          date: kill.date,
        });
      });
      data.push(entry);
    });

    return data;
  }

  private static async GenerateRollRow(campaignStatEntry) {
    const data: Array<CampaignRollRowData> = [];

    campaignStatEntry.reverse().forEach((metric) => {
      const entry: CampaignRollRowData = {
        date: metric.dateDisplay,
        entries: [],
      };

      metric.data.forEach((diceTrack: DiceTrack) => {
        entry.entries.push({
          actorName: diceTrack.actorName,
          flavor: diceTrack.flavor,
          date: diceTrack.date,
        });
      });
      data.push(entry);
    });

    return data;
  }

  private static async GenerateSummaryRow(
    campaignStats: CampaignStats,
    type: string
  ) {
    const data: Array<CampaignRollData> = [];

    let statList;

    switch (type) {
      case "nat20":
        statList = campaignStats.nat20;
        break;
      case "nat1":
        statList = campaignStats.nat1;
        break;
      case "heals":
        statList = campaignStats.heals;
        break;
      case "kills":
        statList = campaignStats.kills;
        break;
    }

    const flattenedResults = []
      .concat(
        // eslint-disable-next-line no-unsafe-optional-chaining
        ...statList?.map((m) =>
          m.data?.map((im) => {
            return im?.actorName;
          })
        )
      )
      .reduce(function (prev, cur) {
        prev[cur] = (prev[cur] || 0) + 1;
        return prev;
      }, {});

    const result: Array<CampaignRollData> = [];
    Object.entries(flattenedResults).forEach(([key, value]) => {
      result.push({
        name: key,
        value: value,
      });
    });

    result.forEach((entry) => {
      data.push({ name: entry.name, value: entry.value });
    });

    return data;
  }
}

export default CampaignRenderer;
