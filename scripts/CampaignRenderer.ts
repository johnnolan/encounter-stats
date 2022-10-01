class CampaignRenderer {
  static async Render(campaignStats: CampaignStats) {
    let renderData = {};
    renderData.nat1 = await this.GenerateSummaryRow(campaignStats, "nat1");
    renderData.nat20 = await this.GenerateSummaryRow(campaignStats, "nat20");
    renderData.heals = await this.GenerateSummaryRow(campaignStats, "heals");
    renderData.kills = await this.GenerateSummaryRow(campaignStats, "kills");
    renderData.criticalHistory = await this.GenerateRollRow(
      campaignStats.nat20
    );
    renderData.fumbleHistory = await this.GenerateRollRow(campaignStats.nat1);
    renderData.healsHistory = await this.GenerateHealRow(campaignStats.heals);
    renderData.killsHistory = await this.GenerateKillsRow(campaignStats.kills);
    renderData.customEventHistory = await this.GenerateCustomEventRows(
      campaignStats
    );

    const template_file = "./modules/encounter-stats/templates/campaign_1.hbs";
    const rendered_html = await renderTemplate(template_file, renderData);

    return { html: rendered_html, data: renderData };
  }

  private static async GenerateCustomEventRows(campaignStats: CampaignStats) {
    const data = [];
    let statList = campaignStats.custom;

    if (statList.length === 0) return;

    // Get unique EventIds
    const eventIds = [].concat
      .apply(
        [],
        statList?.map((m) =>
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

        const entry = {
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
    const data = [];

    campaignStatEntry.reverse().forEach((metric) => {
      const entry = {
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

  private static async GenerateKillsRow(campaignStatEntry) {
    const data = [];

    campaignStatEntry.reverse().forEach((metric) => {
      const entry = {
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
    const data = [];

    campaignStatEntry.reverse().forEach((metric) => {
      const entry = {
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
    const data = [];

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

    const flattenedResults = [].concat
      .apply(
        [],
        statList?.map((m) =>
          m.data.map((im) => {
            return im.actorName;
          })
        )
      )
      .reduce(function (prev, cur) {
        prev[cur] = (prev[cur] || 0) + 1;
        return prev;
      }, {});

    const result = [];
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
