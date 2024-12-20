// StoryBook
import { Meta, StoryObj } from "@storybook/react";
// Component
import SearchableTable from "./SearchableTable";
// React
import React from "react";
// Font Awesome
import { faEye, faPlay } from "@fortawesome/free-solid-svg-icons";

// Used to define the story title in the storybook
const meta: Meta = {
    title: "Components/SearchableTable",
    component: SearchableTable,
};

// Export the storybook meta so StoryBook knows about the stories defined here
export default meta;

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

// Define the Template to be used for each story
const Template: StoryObj = {
    render: () => <SearchableTable
        searchCriteriaProperties={{
            title: "Search Criteria",
            submitButtonLabel: "Search",
            resetButtonLabel: "Reset",
            language: (key: string) => key,
            fixedParameters: {
                _elements: "id,name",
                _sort: "-_lastUpdated",
                "_tag:not": "http://acme.org/identifiers/codes/identifier-type|http://acme.org/identifiers/codes/identifier-type|http://acme.org/identifiers/codes/identifier-type",
            },
            inputs:
                [
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
                ],
        }
        }
        paginatedTableProperties={{
            columns: [
                {
                    header: "ID",
                    dataField: "ID",
                    width: "30%"
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
                // serverUrl: 'https://hapi.fhir.org/baseR4',
                serverUrl: 'https://demonstrator.ovh.fyrstain.com/orchestrator',
                resourceType: 'Patient'
            },
            onError: () => { },
        }}
    />,
};

// Define the stories
export const PatientTable: StoryObj = {
    ...Template,
};