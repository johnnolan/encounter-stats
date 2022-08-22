/* exported config */

export default {
  globals: {
    "ts-jest": {
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
      lines: 90,
    },
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "!**/node_modules/**",
    "scripts/**/*.ts",
    "!scripts/panels/*.ts",
    "!scripts/**/*.test.ts",
    "!scripts/ModuleSettings.ts",
    "!scripts/module.ts",
  ],
};
