// React
import React from "react";

// Testing
import { fireEvent, render, screen } from "@testing-library/react";

// Component
import QuestionnaireDisplay from "./QuestionnaireDisplay";

describe("QuestionnaireDisplay", () => {
  test("preserves hidden context answers and removes empty item arrays on submit", async () => {
    const qr = {
      resourceType: "QuestionnaireResponse",
      status: "in-progress",
      item: [
        {
          linkId: "service",
          text: "Votre service",
          answer: [
            {
              valueReference: {
                reference: "Organization/service-1",
                display: "Service 1",
              },
            },
          ],
          item: [],
        },
        {
          linkId: "visible-question",
          text: "Question visible",
          answer: [
            {
              valueString: "Valeur visible",
            },
          ],
          item: [],
        },
      ],
    };

    const questionnaire = {
      resourceType: "Questionnaire",
      title: "Test Questionnaire",
      item: [
        {
          linkId: "visible-question",
          text: "Question visible",
          type: "string",
        },
      ],
    };
    const onSubmit = jest.fn();

    render(
      <QuestionnaireDisplay
        questionnaire={questionnaire as any}
        questionnaireResponse={qr as any}
        valueSetLoader={{} as any}
        onSubmit={onSubmit}
      />
    );

    await screen.findByDisplayValue("Valeur visible");

    fireEvent.click(screen.getByRole("button", { name: "Validate" }));

    expect(onSubmit).toHaveBeenCalledTimes(1);

    const submittedResponse = onSubmit.mock.calls[0][0];
    expect(submittedResponse.item).toEqual([
      {
        linkId: "service",
        text: "Votre service",
        answer: [
          {
            valueReference: {
              reference: "Organization/service-1",
              display: "Service 1",
            },
          },
        ],
      },
      {
        linkId: "visible-question",
        text: "Question visible",
        answer: [
          {
            valueString: "Valeur visible",
          },
        ],
      },
    ]);
  });
});
