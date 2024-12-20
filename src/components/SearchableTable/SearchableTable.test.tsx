//React
import React from "react";
//Testing
import { render } from "@testing-library/react";
//Component
import SearchableTable from "./SearchableTable";

describe("SearchableTable", () => {
    test("renders the SearchableTable component", () => {
        render(<SearchableTable
            searchCriteriaProperties={{
                title: "Search Criteria",
                submitButtonLabel: "Search",
                resetButtonLabel: "Reset",
                language: (key: string) => key,
                fixedParameters: {
                    _elements: "id,name",
                    _sort: "-_lastUpdated",
                },
                inputs:
                    [
                        {
                            label: "ID",
                            type: "text",
                            searchParamsName: "_id",
                        },
                        {
                            label: "Name",
                            type: "text",
                            searchParamsName: "family:exact",
                        },
                    ],
            }}
            paginatedTableProperties={{
                columns: [
                    {
                        header: "ID",
                        dataField: "id",
                        width: "30%"
                    },
                    {
                        header: "Name",
                        dataField: "name",
                        width: "50%"
                    },
                ],
                action: [
                    {
                        icon: "eye",
                        onClick: () => { }
                    },
                    {
                        icon: "play",
                        onClick: () => { }
                    }
                ],
                mapResourceToData: (resource: any) => {
                    return {
                        id: resource.id,
                        name: resource.name,
                    }
                },
                searchProperties: {
                    serverUrl: "http://localhost:8080/fhir",
                    resourceType: "Patient"
                },
                onError: () => { },
            }}
        />);
    });
});