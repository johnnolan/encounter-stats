import { MODULE_ID } from "../Settings";

export function SettingsList(settings: any) {
  const chatSettingsList = [];

  for (const element of settings) {
    const setting = element;

    for (const [key, value] of (game.settings as any).settings.entries()) {
      if (key === `${MODULE_ID}.${setting}`) {
        const settingValue = game.settings.get(MODULE_ID, setting);

        const choicesSelect = [];
        let isArray = false;
        if (value.choices) {
          isArray = true;
          for (const keyChoice in value.choices) {
            choicesSelect.push({
              key: keyChoice.toString(),
              value: value.choices[keyChoice],
              selected: keyChoice.toString() === settingValue,
            });
          }
        }

        chatSettingsList.push({
          module: value.namespace ? value.namespace : value.module,
          key: value.key,
          type: value.type.name,
          isBoolean: value.type.name === "Boolean",
          isString: value.type.name === "String" && !value.choices,
          isArray: isArray,
          displayname: game.i18n.format(value.name),
          hint: value.hint ? game.i18n.format(value.hint) : "",
          choices: value.choices ? value.choices : [],
          value: settingValue,
          choicesSelect: choicesSelect,
        });
      }
    }
  }

  return chatSettingsList;
}

export function UpdateObject(formData: any) {
  for (const key in formData) {
    const keySplit = key.split(".");
    game.settings.set(keySplit[0], keySplit[1], formData[key]);
  }
}
