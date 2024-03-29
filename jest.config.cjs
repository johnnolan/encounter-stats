/* exported config */

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  transform: {
    "^.+\\.ts?$": [
      "ts-jest",
      {
        isolatedModules: true,
        diagnostics: {
          exclude: ["**"],
        },
      },
    ],
  },
  setupFiles: [],
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
    "!scripts/macros/**/*.js",
    "!scripts/mocks/*.ts",
    "!scripts/panels/*.ts",
    "!scripts/scss.ts",
    "!scripts/Settings.ts",
    "!scripts/Template.ts",
    "!scripts/SetupHooksPF2e.ts",
    "!scripts/SetupHooksDND5e.ts",
    "!scripts/EncounterJournal.ts",
    "!scripts/**/*.test.ts",
    "!scripts/types/*.ts",
    "!scripts/ModuleSettings.ts",
    "!scripts/module.ts",
  ],
};
