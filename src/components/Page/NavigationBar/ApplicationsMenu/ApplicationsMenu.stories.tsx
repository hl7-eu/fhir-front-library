// StoryBook
import { Meta, StoryObj } from "@storybook/react";
// Component
import ApplicationsMenu from "./ApplicationsMenu";
// React
import React from "react";

// Used to define the story title in the storybook
const meta: Meta = {
    title: "Components/Page/NavigationBar/ApplicationsMenu",
    component: ApplicationsMenu,
};

// Export the storybook meta so StoryBook knows about the stories defined here
export default meta;

// Define the Template to be used for each story
const Template: StoryObj = {
    render: () => <ApplicationsMenu
    items={[
      {
        logoLink: 'https://integ.fyrstain.com/assets/ApplicationsLogos/Pandora.png',
        link: 'https://integ.fyrstain.com/Pandora/Home',
        alt: 'Pandora logo'
      },
      {
        logoLink: 'https://sandbox.hl7europe.eu/questionnaire/assets/HL7-EU-Logo.jpg',
        link: 'https://hl7.eu/',
        alt: 'HL7EU Logo'
      },
      {
        logoLink: 'https://integ.fyrstain.com/assets/ApplicationsLogos/Jupiter.png',
        // No link = disabled
        alt: 'Disabled'
      },
    ]}
  />,
};

// Define the stories
export const ApplicationsMenuExemple: StoryObj = {
    ...Template,
};