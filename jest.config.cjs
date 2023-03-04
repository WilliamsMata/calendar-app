module.exports = {
  testEnvironment: "jest-environment-jsdom",
  setupFiles: ["./jest.setup.js"],
  transformIgnorePatterns: [],

  // For ESMODULES
  transform: {
    "^.+\\.(t|j)sx?$": [
      "@swc/jest",
      {
        jsc: {
          target: "es2021",
        },
      },
    ],
  },

  // ModuleNameMapper sólo si ocupamos importar CSS en nuestros componentes para el testing
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/tests/__mocks__/styleMock.js",
  },
};
