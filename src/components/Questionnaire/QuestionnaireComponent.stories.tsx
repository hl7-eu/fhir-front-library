// StoryBook
import { Meta, StoryObj } from "@storybook/react";
// Component
import QuestionnaireComponent, { QuestionnaireProps } from "./QuestionnaireComponent";
// React
import React from "react";

// Used to define the story title in the storybook
interface StoryMeta extends Meta {
    component: React.FC<QuestionnaireProps>;
    title: string;
}

// Define the storybook meta
const meta: StoryMeta = {
    title: 'Components/Questionnaire',
    component: QuestionnaireComponent,
};

// Export the storybook meta so StoryBook knows about the stories defined here
export default meta;

// Define the Template to be used for each story
const Template: StoryObj<QuestionnaireProps> = {
    render: (args) => <QuestionnaireComponent {...args} />,
};

// Define the stories for each level
export const Questionnaire1: StoryObj<QuestionnaireProps> = {
    ...Template,
    args: {
        dataUrl: 'https://integ.fyrstain.com/r5-data',
        sdcUrl: 'https://integ.fyrstain.com/r5/questionnaire-processor',
        terminologyUrl: 'https://integ.fyrstain.com/r5-data',
        questionnaireUrl: "http://fyrstain.com/fhir/R5/socle-ig/Questionnaire/EXP-QuestionnairePatientSimplesFields",
        onSubmit: () => { },
        onError: () => { },
    },
};

export const Questionnaire2: StoryObj<QuestionnaireProps> = {
    ...Template,
    args: {
        dataUrl: 'https://integ.fyrstain.com/r5-data',
        sdcUrl: 'https://integ.fyrstain.com/r5/questionnaire-processor',
        terminologyUrl: 'https://integ.fyrstain.com/r5-data',
        questionnaireUrl: "http://fyrstain.com/fhir/R5/socle-ig/Questionnaire/EXP-QuestionnaireEnableWhen",
        onSubmit: () => { },
        onError: () => { },
    },
};