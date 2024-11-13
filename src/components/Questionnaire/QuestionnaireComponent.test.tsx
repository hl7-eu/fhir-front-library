//React
import React from "react";
//Testing
import { render } from "@testing-library/react";
//Component
import QuestionnaireComponent from "./QuestionnaireComponent";

describe("Questionnaire", () => {
    test("renders the Questionnaire component", () => {
        render(
            <QuestionnaireComponent
                questionnaireUrl="http://fyrstain.com/fhir/R5/socle-ig/Questionnaire/EXP-QuestionnairePatientSimplesFields"
                dataUrl='https://integ.fyrstain.com/r5-data'
                sdcUrl='https://integ.fyrstain.com/r5/questionnaire-processor'
                terminologyUrl='https://integ.fyrstain.com/r5-data'
                onSubmit={() => { }}
                onError={() => { }}
            />
        );
    });
});