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
      lines: 80,
    },
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "!**/node_modules/**",
    "scripts/**/*.ts",
    "!scripts/integrations/*.ts",
    "!scripts/mockdata/**/*.ts",
    "!scripts/mocks/*.ts",
    "!scripts/panels/*.ts",
    "!scripts/LocalStorage.ts",
    "!scripts/scss.ts",
    "!scripts/Settings.ts",
    "!scripts/Template.ts",
    "!scripts/SetupHooks.ts",
    "!scripts/EncounterJournal.ts",
    "!scripts/**/*.test.ts",
    "!scripts/types/*.ts",
    "!scripts/ModuleSettings.ts",
    "!scripts/module.ts",
  ],
};
