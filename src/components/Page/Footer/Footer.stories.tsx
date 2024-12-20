// StoryBook
import { Meta, StoryObj } from "@storybook/react";
// Component
import Footer from "./Footer";
// React
import React from "react";

// Used to define the story title in the storybook
const meta: Meta = {
    title: "Components/Page/Footer",
    component: Footer,
};

// Export the storybook meta so StoryBook knows about the stories defined here
export default meta;

// Define the Templates to be used for each story
const Template: StoryObj = {
    render: () => <Footer
        logo={[
            {
                logoLink: 'https://sandbox.hl7europe.eu/questionnaire/assets/HL7-EU-Logo.jpg',
                link: 'https://hl7.eu/',
                alt: 'HL7EU Logo'
            }
        ]}
        items={[
            {
                label: 'About',
                link: '#',
            },
            {
                label: 'Contact',
                link: '#',
            },
            {
                label: 'Problem Tracking',
                link: '#',
            },
        ]}
        languages={
            {
                default: "en",
                onChange: () => {return;},
                options: [
                    {
                        label: 'English',
                        value: 'en'
                    },
                    {
                        label: 'Français',
                        value: 'fr'
                    }
                ]
            }}
    />,
};

// Define the stories
export const ClassicFooter: StoryObj = {
    ...Template,
};