module.exports = {
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  testEnvironment: "jest-environment-jsdom",
  moduleFileExtensions: ["js", "jsx"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(axios|react-hot-toast)/)",
  ],
};