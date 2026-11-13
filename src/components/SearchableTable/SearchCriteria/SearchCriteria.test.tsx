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
                        label: "Service",
                        type: "select",
                        placeholder: "-- Please choose a service --",
                        options: [
                            {
                                value: "cardiology",
                                label: "Cardiologie",
                            },
                            {
                                value: "oncology",
                                label: "Oncology",
                            },
                            {
                                value: "radiology",
                                label: "Radiology",
                            },
                        ],
                        searchParamsName: "service",
                    },
                ]}
            onSubmit={() => { }}
            onReset={() => { }}
        />);
    });
});