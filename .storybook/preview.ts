// Storybook preview configuration
import type { Preview } from "@storybook/react";
// Style
import '../src/styles/global.css';
// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
