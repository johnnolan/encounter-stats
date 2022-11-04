import Trans from "../Helpers/Trans";
import { MODULE_NAME, OPT_SETTINGS_DICE_STREAK_ENABLE, OPT_SETTINGS_DICE_STREAK_TO_CHAT_ENABLE } from "../Settings";
import { SettingsList, UpdateObject } from "./Helpers";

export default class CampaignTrackingPanel extends FormApplication {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      title: Trans.Get("Settings.CampaignTrackingOptions"),
      template: "modules/encounter-stats/templates/tracking.html",
      id: `${MODULE_NAME}-tracking-settings`,
      width: 520,
      height: "500",
      closeOnSubmit: true,
    });
  }

  settingsList(settings: any) {
    return SettingsList(settings);
  }

  // @ts-expect-error TS(2416): Property 'getData' in type 'ChatSettingsPanel' is ... Remove this comment to see the full error message
  getData() {
    const settings = [
      OPT_SETTINGS_DICE_STREAK_ENABLE,
      OPT_SETTINGS_DICE_STREAK_TO_CHAT_ENABLE,
    ];

    return {
      modules: this.settingsList(settings),
    };
  }

  // @ts-expect-error TS(2416): Property '_updateObject' in type 'ChatSettingsPane... Remove this comment to see the full error message
  _updateObject(_event: any, formData: any) {
    UpdateObject(formData);
  }
}
