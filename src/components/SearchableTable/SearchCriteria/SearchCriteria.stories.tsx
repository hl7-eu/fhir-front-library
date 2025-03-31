// StoryBook
import { Meta, StoryObj } from "@storybook/react";
// Component
import SearchCriteria, { SearchCriteriaProperties } from "./SearchCriteria";
// React
import React from "react";

// Used to define the story SearchCriteria in the storybook
interface StoryMeta extends Meta {
    component: React.FC<SearchCriteriaProperties>;
    title: string;
}

// Define the storybook meta
const meta: StoryMeta = {
    title: 'Components/SearchableTable/SearchCriteria',
    component: SearchCriteria as React.FC<SearchCriteriaProperties>,
};

// Export the storybook meta so StoryBook knows about the stories defined here
export default meta;

// Define the Template to be used for each story
const Template: StoryObj<SearchCriteriaProperties> = {
    render: (args) => <SearchCriteria {...args} />
};

// Define the stories for each level
export const searchSection: StoryObj<SearchCriteriaProperties> = {
    ...Template,
    args: {
        title: "Search Criteria",
        submitButtonLabel: "Search",
        resetButtonLabel: "Reset",
        language: (key: string) => key,
        fixedParameters: {
            _elements: "id,name",
            _sort: "-_lastUpdated",
        },
        inputs: [
            {
                label: "ID",
                type: "text",
                placeholder: "-- ID of the patient --",
                searchParamsName: "_id",
            },
            {
                label: "Name",
                type: "text",
                placeholder: "-- Patient's Name --",
                searchParamsName: "family:exact",
            },
            {
                label: "Patient",
                type: "select",
                placeholder: "-- Please choose a patient --",
                options: [
                    {
                        value: "Dupont",
                        label: "Dupont",
                    },
                    {
                        value: "Renou",
                        label: "Renou",
                    },
                    {
                        value: "Martin",
                        label: "Martin",
                    },
                ],
                searchParamsName: "family",
            },
            {
                label: "Birthdate",
                type: "date",
                searchParamsName: "birthdate",
            },
        ],
        onReset: () => {},
        onSubmit: (searchParameters) => {console.log(searchParameters)}
    },
};