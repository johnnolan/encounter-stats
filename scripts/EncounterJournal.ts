import SimpleCalendarIntegration from "./integrations/SimpleCalendarIntegration";
import Logger from "./Helpers/Logger";
import Dates from "./Helpers/Dates";

class EncounterJournal {
  static readonly JOURNAL_TITLE = "Encounter Statistics";

  static get IsJournalSetup(): boolean {
    return (
      game.journal?.find((e: JournalEntry) => e.name === this.JOURNAL_TITLE) !==
      undefined
    );
  }

  static async CreateJournal() {
    await JournalEntry.create(
      {
        name: this.JOURNAL_TITLE,
      },
      { renderSheet: false, activate: false }
    );

    await EncounterJournal.CreateCampaignJournalEntryPage();
  }

  static async CreateJournalEntryPage(encounterId: string) {
    let title = `${Dates.now.dateTimeDisplay}`;

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
    await journalEntry.createEmbeddedDocuments("JournalEntryPage", [
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

  // Temporary for migration from Journal
  static async DeleteCampaignJournalEntryPageData() {
    const journalEntryPage = game.journal
      ?.find((e: JournalEntry) => e.name === this.JOURNAL_TITLE)
      ?.pages.find(
        (e: JournalEntryPage) =>
          e.getFlag("encounter-stats", "campaignstats") === "data"
      );

    journalEntryPage.delete();
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

  static async UpdateJournalData(
    data: string,
    flagName: string,
    flagValue: string
  ) {
    const journalEntryPage = game.journal
      ?.find((e: JournalEntry) => e.name === this.JOURNAL_TITLE)
      ?.pages.find(
        (e: JournalEntryPage) =>
          e.getFlag("encounter-stats", flagName) === flagValue
      );

    if (!journalEntryPage) {
      Logger.error(
        `No Journal found with name ${this.JOURNAL_TITLE} and ${flagName} ${flagValue}`,
        "encounterjournal.UpdateJournalData"
      );
      return;
    }

    await journalEntryPage?.update({
      text: {
        content: data,
      },
    });

    this.SortJournalData();
  }

  private static async SortJournalData() {
    const journalEntry = game.journal?.find(
      (e) => e.name === "Encounter Statistics"
    );

    let sortValue = 2000;

    const sortedJournalsByName = new Map(
      [...journalEntry.pages.entries()].sort((a, b) =>
        a.name > b.name ? 1 : -1
      )
    );

    sortedJournalsByName.forEach((journalEntryPage) => {
      if (
        journalEntryPage.getFlag("encounter-stats", "campaignstats") === "view"
      ) {
        journalEntryPage.update({
          sort: 1000,
        });
      } else {
        journalEntryPage.update({
          sort: sortValue,
        });
        sortValue = sortValue + 1000;
      }
    });
  }

  // Temporary for migration from Journal
  static async GetCampaignJournal(): Promise<CampaignStats | undefined> {
    const journalEntryPage = game.journal
      ?.find((e: JournalEntry) => e.name === this.JOURNAL_TITLE)
      ?.pages.find(
        (e: JournalEntryPage) =>
          e.getFlag("encounter-stats", "campaignstats") === "data"
      );

    if (!journalEntryPage) {
      return;
    }

    return <CampaignStats>(
      JSON.parse(
        journalEntryPage.text.content.replace("<p>", "").replace("</p>", "")
      )
    );
  }
}

export default EncounterJournal;
