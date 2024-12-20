//React
import React from "react";
//Testing
import { render } from "@testing-library/react";
//Component
import SearchCriteria from "./SearchCriteria";

describe("SearchCriteria", () => {
    test("renders the SearchCriteria component", () => {
        render(<SearchCriteria
            title="Search Criteria"
            submitButtonLabel="Search"
            resetButtonLabel="Reset"
            language={(key: string) => key}
            fixedParameters={{
                _elements: "id,name",
                _sort: "-_lastUpdated",
            }}
            inputs={
                [
                    {
                        label: "ID",
                        type: "text",
                        searchParamsName: "_id",
                    },
                    {
                        label: "Name",
                        type: "text",
                        searchParamsName: "given",
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
                ]}
            onSubmit={() => { }}
            onReset={() => { }}
        />);
    });
});