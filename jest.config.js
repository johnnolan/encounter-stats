/* exported config */

export default {
  preset: "ts-jest",
  globals: {
    "ts-jest": {
      isolatedModules: true,
      diagnostics: {
        exclude: ["**"],
      },
    },
  },
  setupFiles: ["jest-localstorage-mock"],
  transform: { "^.+\\.ts?$": "ts-jest" },
  reporters: ["default", "jest-junit"],
  coverageThreshold: {
    global: {
      lines: 50,
    },
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "!**/node_modules/**",
    "scripts/**/*.ts",
    "!scripts/integrations/*.ts",
    "!scripts/mockdata/*.ts",
    "!scripts/mocks/*.ts",
    "!scripts/panels/*.ts",
    "!scripts/CampaignManager.ts",
    "!scripts/CampaignTemplate.ts",
    "!scripts/DataParsing.ts",
    "!scripts/EncounterJournal.ts",
    "!scripts/Handlers.ts",
    "!scripts/Hooks.ts",
    "!scripts/LocalStorage.ts",
    "!scripts/scss.ts",
    "!scripts/Settings.ts",
    "!scripts/StatManager.ts",
    "!scripts/Template.ts",
    "!scripts/Utils.ts",
    "!scripts/**/*.test.ts",
    "!scripts/types/*.ts",
    "!scripts/ModuleSettings.ts",
    "!scripts/module.ts",
  ],
};
