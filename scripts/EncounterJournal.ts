import SimpleCalendarIntegration from "./integrations/SimpleCalendarIntegration";

import Logger from "./Logger";

class EncounterJournal {
  static readonly JOURNAL_TITLE = "Encounter Statistics";

  static async CreateJournal() {
    await JournalEntry.create(
      {
        name: this.JOURNAL_TITLE,
      },
      { renderSheet: false, activate: false }
    );
  }

  static async CreateJournalEntryPage(encounterId: string) {
    let title = `${new Date().toISOString()}`;

    if (SimpleCalendarIntegration.IsEnabled()) {
      title = `${SimpleCalendarIntegration.GetCurrentDateToString()} (${encounterId})`;
    }

    const journalEntry = game.journal?.find(
      (e: JournalEntry) => e.name === this.JOURNAL_TITLE
    );

    if (!journalEntry) {
      Logger.error(
        `No Journal found with name ${this.JOURNAL_TITLE}`,
        "encounterjournal.CreateJournalEntryPage"
      );
      return;
    }
    journalEntry.createEmbeddedDocuments("JournalEntryPage", [
      {
        name: title,
        type: "text",
        text: {
          content: "",
          format: CONST.JOURNAL_ENTRY_PAGE_FORMATS.HTML,
        },
        "flags.encounter-stats.encounterId": encounterId,
      },
    ]);
  }

  static async CreateCampaignJournalEntryPage() {
    const journalEntry = game.journal?.find(
      (e: JournalEntry) => e.name === this.JOURNAL_TITLE
    );

    if (!journalEntry) {
      Logger.error(
        `No Journal found with name ${this.JOURNAL_TITLE}`,
        "encounterjournal.CreateCampaignJournalEntryPage"
      );
      return;
    }
    journalEntry.createEmbeddedDocuments("JournalEntryPage", [
      {
        name: "Campaign Data - Do Not Delete",
        type: "text",
        text: {
          content: `{"kills": [], "nat1": [], "nat20": [], "heals": []}`,
          format: CONST.JOURNAL_ENTRY_PAGE_FORMATS.HTML,
        },
        "flags.encounter-stats.campaignstats": "data",
      },
    ]);
    journalEntry.createEmbeddedDocuments("JournalEntryPage", [
      {
        name: "Campaign Statistics",
        type: "text",
        text: {
          content: "",
          format: CONST.JOURNAL_ENTRY_PAGE_FORMATS.HTML,
        },
        "flags.encounter-stats.campaignstats": "view",
      },
    ]);
  }

  static async UpdateJournal(html: string, encounterId: string) {
    const journalEntryPage = game.journal
      ?.find((e: JournalEntry) => e.name === this.JOURNAL_TITLE)
      ?.pages.find(
        (e: JournalEntryPage) =>
          e.getFlag("encounter-stats", "encounterId") === encounterId
      );

    if (!journalEntryPage) {
      Logger.error(
        `No Journal found with name ${this.JOURNAL_TITLE} and encounterId ${encounterId}`,
        "encounterjournal.UpdateJournal"
      );
      return;
    }

    await journalEntryPage?.update({
      text: {
        content: html,
      },
    });
  }

  static async UpdateCampaignDataJournal(jsonData: string) {
    const journalEntryPage = game.journal
      ?.find((e: JournalEntry) => e.name === this.JOURNAL_TITLE)
      ?.pages.find(
        (e: JournalEntryPage) =>
          e.getFlag("encounter-stats", "campaignstats") === "data"
      );
    if (!journalEntryPage) {
      Logger.error(
        `No Journal found with name ${this.JOURNAL_TITLE} and campaignstats data`,
        "encounterjournal.UpdateCampaignDataJournal"
      );
      return;
    }

    await journalEntryPage?.update({
      text: {
        content: jsonData,
      },
    });
  }

  static async UpdateCampaignJournal(html: string) {
    const journalEntryPage = game.journal
      ?.find((e: JournalEntry) => e.name === this.JOURNAL_TITLE)
      ?.pages.find(
        (e: JournalEntryPage) =>
          e.getFlag("encounter-stats", "campaignstats") === "view"
      );

    if (!journalEntryPage) {
      Logger.error(
        `No Journal found with name ${this.JOURNAL_TITLE} and campaignstats view`,
        "encounterjournal.UpdateCampaignJournal"
      );
      return;
    }

    await journalEntryPage?.update({
      text: {
        content: html,
      },
    });
  }

  static async GetCampaignJournal(): Promise<CampaignStats | undefined> {
    const journalEntryPage = game.journal
      ?.find((e: JournalEntry) => e.name === this.JOURNAL_TITLE)
      ?.pages.find((e: JournalEntryPage) =>
        e.getFlag("encounter-stats", "campaignstats")
      );

    if (!journalEntryPage) {
      Logger.error(
        `No Journal found with name ${this.JOURNAL_TITLE} and campaignstats flag`,
        "encounterjournal.GetCampaignJournal"
      );
      return;
    }

    return <CampaignStats>(
      JSON.parse(
        journalEntryPage.text.content.replace("<p>", "").replace("</p>", "")
      )
    );
  }

  static IsJournalSetup(): boolean {
    return (
      game.journal?.find((e: JournalEntry) => e.name === this.JOURNAL_TITLE) !==
      undefined
    );
  }

  static async IsCampaignJournalSetup(): Promise<boolean> {
    return game.journal
      ?.find((e: JournalEntry) => e.name === this.JOURNAL_TITLE)
      ?.pages.find(
        (e) => e.getFlag("encounter-stats", "campaignstats") === "data"
      );
  }
}

export default EncounterJournal;
