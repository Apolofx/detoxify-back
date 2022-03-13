/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  modulePathIgnorePatterns: ["dist", "build"],
  moduleNameMapper: {
    "@database": "<rootDir>/prisma",
    "@middlewares": "<rootDir>/src/middlewares",
    "@routes": "<rootDir>/src/routes",
    "@config": "<rootDir>/src/config",
    "@utils": "<rootDir>/src/utils",
  },
};
