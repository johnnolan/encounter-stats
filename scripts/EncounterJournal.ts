import { GetFolder } from "./Folder";
//import SimpleCalendarIntegration from "./integrations/SimpleCalendarIntegration";
import { CampaignStats } from "./types/globals";

class EncounterJournal {
  static readonly JOURNAL_TITLE = "Encounter Statistics";

  static async CreateJournal() {
    const folder = GetFolder();

    await JournalEntry.create(
      {
        name: this.JOURNAL_TITLE,
        folder: folder ? folder.id : null,
      },
      { renderSheet: false, activate: false }
    );
  }

  static async CreateJournalEntryPage(encounterId: string) {
    const title = `${new Date().toISOString()}`;

    /*if (SimpleCalendarIntegration.IsEnabled()) {
      title = `${SimpleCalendarIntegration.GetCurrentDateToString()} (${encounterId})`;
    }*/

    const journalEntry = game.journal.find(
      (e: JournalEntry) => e.name === this.JOURNAL_TITLE
    );
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
    const journalEntry = game.journal.find(
      (e: JournalEntry) => e.name === this.JOURNAL_TITLE
    );
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
      .find((e: JournalEntry) => e.name === this.JOURNAL_TITLE)
      ?.pages.find(
        (e: JournalEntryPage) =>
          e.getFlag("encounter-stats", "encounterId") === encounterId
      );

    await journalEntryPage?.update({
      text: {
        content: html,
      },
    });
  }

  static async UpdateCampaignDataJournal(jsonData: string) {
    const journalEntryPage = game.journal
      .find((e: JournalEntry) => e.name === this.JOURNAL_TITLE)
      ?.pages.find(
        (e: JournalEntryPage) =>
          e.getFlag("encounter-stats", "campaignstats") === "data"
      );

    await journalEntryPage?.update({
      text: {
        content: jsonData,
      },
    });
  }

  static async UpdateCampaignJournal(html: string) {
    const journalEntryPage = game.journal
      .find((e: JournalEntry) => e.name === this.JOURNAL_TITLE)
      ?.pages.find(
        (e: JournalEntryPage) =>
          e.getFlag("encounter-stats", "campaignstats") === "view"
      );

    await journalEntryPage?.update({
      text: {
        content: html,
      },
    });
  }

  static async GetCampaignJournal(): Promise<CampaignStats> {
    const journalEntryPage = game.journal
      .find((e: JournalEntry) => e.name === this.JOURNAL_TITLE)
      ?.pages.find((e: JournalEntryPage) =>
        e.getFlag("encounter-stats", "campaignstats")
      );

    return <CampaignStats>(
      JSON.parse(
        journalEntryPage.text.content.replace("<p>", "").replace("</p>", "")
      )
    );
  }

  static IsJournalSetup(): boolean {
    return (
      game.journal.find((e: JournalEntry) => e.name === this.JOURNAL_TITLE) !==
      undefined
    );
  }

  static async IsCampaignJournalSetup(): Promise<boolean> {
    return await game.journal
      .find((e: JournalEntry) => e.name === this.JOURNAL_TITLE)
      ?.pages.find(
        (e) => e.getFlag("encounter-stats", "campaignstats") === "data"
      );
  }
}

export default EncounterJournal;
