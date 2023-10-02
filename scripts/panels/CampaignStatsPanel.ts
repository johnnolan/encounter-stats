import CampaignStat from "../CampaignStat";
import Gamemaster from "../Helpers/Gamemaster";
import Trans from "../Helpers/Trans";
import { MODULE_NAME } from "../Settings";

export default class CampaignStatsPanel extends FormApplication {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      title: Trans.Get("Settings.StatisticsManagement"),
      template: "modules/encounter-stats/templates/settings.html",
      id: `${MODULE_NAME}-chat-settings`,
      width: 520,
      height: "500",
      closeOnSubmit: true,
    });
  }

  activateListeners(html) {
    html.find("#encounter-stats-delete-statistics").on("click", this.deleteStatistics);
    html.find("#encounter-stats-export-statistics").on("click", this.exportSettingsToJSON);
    html.find("#encounter-stats-import-statistics").on("click", async () => {
      if (await this.importFromJSONDialog()) {
        this.close();
      }
    });
  }

  // @ts-expect-error TS(2416): Property 'getData' in type 'ChatSettingsPanel' is ... Remove this comment to see the full error message
  getData() {
    return;
  }

  deleteStatistics() {
    const filename = `encounter-stats-export.json`;
    saveDataToFile(
      JSON.stringify(Gamemaster.GetStats, null, 2),
      "text/json",
      filename
    );

    Gamemaster.DeleteStats();
    return ui.notifications?.info(
      Trans.Get("Settings.CampaignStatsDeleted")
    );
  }

  // @ts-expect-error TS(2416): Property '_updateObject' in type 'ChatSettingsPane... Remove this comment to see the full error message
  _updateObject(_event: any, formData: any) {
    return;
  }

  exportSettingsToJSON() {
    const filename = `encounter-stats-export.json`;
    saveDataToFile(
      JSON.stringify(Gamemaster.GetStats, null, 2),
      "text/json",
      filename
    );
  }

  importSettingsFromJSON(json) {
    if (typeof json === "string") {
      json = JSON.parse(json);
    }
    Gamemaster.DeleteStats();
    CampaignStat.Save(json);
    return ui.notifications?.info(
      Trans.Get("Settings.CampaignStatsImported")
    );
  }

  async importFromJSONDialog() {
    const content = await renderTemplate("templates/apps/import-data.html", {
      entity: "encounter-stats",
      name: "Campaign Statistics",
    });
    let dialog = new Promise((resolve, reject) => {
      new Dialog(
        {
          title: Trans.Get("Settings.ImportCampaignStatistics"),
          content: content,
          buttons: {
            import: {
              icon: '<i class="fas fa-file-import"></i>',
              label: Trans.Get("Settings.Import"),
              callback: (html) => {
                //@ts-ignore
                const form = html.find("form")[0];
                if (!form.data.files.length)
                  return ui.notifications?.error(
                    Trans.Get("Settings.FileUploadError")
                  );
                readTextFromFile(form.data.files[0]).then((json) => {
                  this.importSettingsFromJSON(json);
                  resolve(true);
                });
              },
            },
            no: {
              icon: '<i class="fas fa-times"></i>',
              label: Trans.Get("Settings.Cancel"),
              callback: (html) => resolve(false),
            },
          },
          default: "import",
        },
        {
          width: 400,
        }
      ).render(true);
    });
    return await dialog;
  }
}
