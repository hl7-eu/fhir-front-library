// StoryBook
import type { StorybookConfig } from "@storybook/react-webpack5";
// Webpack
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {
      builder: {
        useSWC: true,
      },
    },
  },
  docs: {
    autodocs: "tag",
  },
  webpackFinal: async (config) => {
    config.plugins = config.plugins || [];
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          { from: path.resolve(__dirname, '../public/assets'), to: 'assets' },
        ],
      })
    );
    return config;
  },
};

export default config;