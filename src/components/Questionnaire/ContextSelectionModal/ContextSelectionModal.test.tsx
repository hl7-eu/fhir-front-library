import { getContextSearchInputs } from "./ContextSelectionModal";

describe("ContextSelectionModal", () => {
    test("uses the default search inputs for known resource types", () => {
        expect(getContextSearchInputs("Practitioner")).toEqual([
            {
                label: "ID",
                type: "text",
                searchParamsName: "_id",
            },
            {
                label: "Name",
                type: "text",
                searchParamsName: "name",
            },
        ]);
    });

    test("falls back to generic search inputs for unknown resource types", () => {
        expect(getContextSearchInputs("Observation")).toEqual([
            {
                label: "ID",
                type: "text",
                searchParamsName: "_id",
            },
            {
                label: "Name",
                type: "text",
                searchParamsName: "name",
            },
        ]);
    });
});
