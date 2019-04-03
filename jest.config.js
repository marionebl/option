module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    testRegex: undefined,
    testMatch: ["**/*.test.ts?(x)"],
    collectCoverageFrom: ["src/**/*.ts"],
    moduleNameMapper: {
      "@marionebl/option": "<rootDir>/src/index.ts"
    }
  };
  