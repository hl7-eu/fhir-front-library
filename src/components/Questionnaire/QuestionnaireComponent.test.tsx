import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { TextDecoder, TextEncoder } from "util";
import QuestionnaireComponent from "./QuestionnaireComponent";

const mockOperation = jest.fn();
const mockSearch = jest.fn();

jest.mock("fhir-kit-client", () =>
    jest.fn().mockImplementation(() => ({
        search: mockSearch,
        operation: mockOperation,
    }))
);

describe("QuestionnaireComponent", () => {
    const questionText = "Ce questionnaire aborde différents aspects de votre vie...";

    beforeEach(() => {
        mockOperation.mockReset();
        mockSearch.mockReset();
        global.fetch = jest.fn();
        global.TextDecoder = TextDecoder as typeof global.TextDecoder;
    });

    test("keeps UTF-8 questionnaire text intact from load to populate to render", async () => {
        const questionnaireBundle = {
            resourceType: "Bundle",
            entry: [
                {
                    resource: {
                        resourceType: "Questionnaire",
                        url: "http://example.org/Questionnaire/test",
                        title: "Questionnaire de démonstration",
                        item: [
                            {
                                linkId: "intro",
                                text: questionText,
                                type: "string",
                            },
                        ],
                    },
                },
            ],
        };

        const populateResponse = {
            resourceType: "QuestionnaireResponse",
            status: "in-progress",
            item: [
                {
                    linkId: "intro",
                    answer: [
                        {
                            valueString: "Réponse",
                        },
                    ],
                },
            ],
        };

        const encodedBundle = new TextEncoder().encode(
            JSON.stringify(questionnaireBundle)
        );

        (global.fetch as jest.Mock).mockResolvedValue({
            ok: true,
            status: 200,
            statusText: "OK",
            headers: {
                get: (headerName: string) =>
                    headerName.toLowerCase() === "content-type"
                        ? "application/fhir+json; charset=UTF-8"
                        : null,
            },
            arrayBuffer: async () => encodedBundle.buffer,
        });

        mockOperation.mockResolvedValue(populateResponse);

        render(
            <QuestionnaireComponent
                questionnaireUrl="http://example.org/Questionnaire/test"
                dataUrl="https://had.sandbox.fyrstain.com/fhir"
                sdcUrl="https://had.sandbox.fyrstain.com/fhir"
                terminologyUrl="https://had.sandbox.fyrstain.com/fhir"
                onSubmit={() => {}}
                onError={() => {}}
            />
        );

        const renderedQuestion = await screen.findByPlaceholderText(questionText);
        expect(renderedQuestion).toBeDefined();

        await waitFor(() => {
            expect(mockOperation).toHaveBeenCalledTimes(1);
        });

        expect(mockSearch).not.toHaveBeenCalled();
        expect(global.fetch).toHaveBeenCalledWith(
            "https://had.sandbox.fyrstain.com/fhir/Questionnaire?url=http%3A%2F%2Fexample.org%2FQuestionnaire%2Ftest&_count=1",
            {
                headers: {
                    accept: "application/fhir+json, application/json",
                },
            }
        );

        const populateQuestionnaire =
            mockOperation.mock.calls[0][0].input.parameter[0].resource;

        expect(populateQuestionnaire.item[0].text).toBe(questionText);
    });
});
