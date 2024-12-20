// StoryBook
import { Meta, StoryObj } from "@storybook/react";
// Component
import PaginatedTable, { PaginatedTableProperties } from './PaginatedTable';
// React
import React from "react";
// Font Awesome
import { faEye, faPlay } from "@fortawesome/free-solid-svg-icons";

// Used to define the story PaginationTable in the storybook
interface StoryMeta extends Meta {
    component: React.FC<PaginatedTableProperties>;
    title: string;
}

// Define the storybook meta
const meta: StoryMeta = {
    title: 'Components/SearchableTable/PaginatedTable',
    component: PaginatedTable as React.FC<PaginatedTableProperties>,
};

// Export the storybook meta so StoryBook knows about the stories defined here
export default meta;

// Define the Template to be used for each story
const Template: StoryObj<PaginatedTableProperties> = {
    render: (args) => <PaginatedTable {...args} />
};

/**
 * Get the family name of the resource.
 * 
 * @param resource  the resource to get the family name from.
 * 
* @returns the family name of the resource.
*/
function getFamilyName(resource: any) {
    const family = resource.name?.[0]?.family;
    return family ? family : '';
}

// Define the storie
export const PatientList: StoryObj<PaginatedTableProperties> = {

    ...Template,
    args: {
        columns: [
            {
                header: "ID",
                dataField: "ID",
                width: "30%",
                tabletWidth: "50%"
            },
            {
                header: "Name",
                dataField: "Name",
                width: "50%"
            },
        ],
        action: [
            {
                icon: faEye,
                onClick: () => { }
            },
            {
                icon: faPlay,
                onClick: () => { }
            }
        ],
        mapResourceToData: (resource: any) => {
            return {
                ID: resource.id,
                Name: getFamilyName(resource),
            }
        },
        searchProperties: {
            serverUrl: 'https://hapi.fhir.org/baseR4',
            resourceType: 'Patient'
        },
        onError: () => { },
    }
};