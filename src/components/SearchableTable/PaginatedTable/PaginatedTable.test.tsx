//React
import React from "react";
//Testing
import { render } from "@testing-library/react";
//Component
import PaginationTable from "./PaginatedTable";

describe("PaginatedTable", () => {
    test("renders the PaginatedTable component", () => {
        render(<PaginationTable
            columns={[
                {
                    header: "ID",
                    dataField: "ID",
                    width: "10%"
                },
                {
                    header: "Name",
                    dataField: "Name",
                    width: "10%"
                },
                {
                    header: "Description",
                    dataField: "Description",
                    width: "50%"
                },
                {
                    header: "Url",
                    dataField: "Url",
                    width: "20%"
                },
            ]}
            action={[
                {
                    icon: "eye",
                    onClick: () => { }
                },
                {
                    icon: "play",
                    onClick: () => { }
                }
            ]}
            mapResourceToData={(resource: any) => {
                return {
                    ID: resource.id,
                    Name: resource.name,
                }
            }
            }
            searchProperties={{
                serverUrl: "http://localhost:8080/fhir",
                resourceType: "Patient"
            }}
            onError={() => { }}
        />);
    });
});