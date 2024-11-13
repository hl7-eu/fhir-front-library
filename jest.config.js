module.exports = {
    testEnvironment: "jest-environment-jsdom",
    moduleNameMapper: {
        ".(css|less|scss)$": "identity-obj-proxy",
    },
    transformIgnorePatterns: [
        "/node_modules/(?!d3-color|d3-interpolate|d3-scale|d3-array|internmap|d3-time).+\\.js$"
    ]
}