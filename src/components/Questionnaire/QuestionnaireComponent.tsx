// React
import React, { useState } from 'react';
// FHIR
import Client from 'fhir-kit-client';
import { Bundle, Questionnaire, QuestionnaireResponse } from 'fhir/r5';
// Components
import QuestionnaireDisplay from './QuestionnaireDisplay';
import { ValueSetLoader } from '../../services';

// Interface for the props of the Questionnaire component
export interface QuestionnaireProps {
    // Function to translate the text in the application
    language?: (key: string) => string;
    // Label of the primary button
    primaryButtonLabel?: string;
    // Label of the secondary button
    secondaryButtonLabel?: string;
    // Server URL
    dataUrl: string;
    // SDC Engine Url
    sdcUrl: string;
    // Terminology URL
    terminologyUrl: string;
    // The url of the questionnaire
    questionnaireUrl: string;
    // Function to call when you submit the form
    onSubmit: (questionnaireResponse: QuestionnaireResponse, bundle: Bundle) => void;
    // Function to call when an error occurs
    onError: () => void;
}

const QuestionnaireComponent: React.FC<QuestionnaireProps> = (configs) => {

    ////////////////////////////////
    //           Client           //
    ////////////////////////////////

    const fhirClient = React.useMemo(() => new Client({
        baseUrl: configs.dataUrl ?? 'fhir'
    }), [configs.dataUrl]);

    const sdcClient = React.useMemo(() => new Client({
        baseUrl: configs.sdcUrl ?? 'fhir'
    }), [configs.dataUrl]);

    const terminologyClient = React.useMemo(() => new Client({
        baseUrl: configs.terminologyUrl ?? 'fhir'
    }), [configs.dataUrl]);

    const valueSetLoader = new ValueSetLoader(terminologyClient);

    ////////////////////////////////
    //           State            //
    ////////////////////////////////

    const [questionnaire, setQuestionnaire] = useState<Questionnaire>();
    const [questionnaireResponse, setQuestionnaireResponse] = useState<QuestionnaireResponse>();

    ////////////////////////////////
    //          Actions           //
    ////////////////////////////////

    /**
    * Search on a Questionnaire resource with the search params.
    *
    * @param searchParams The search params
    */
    React.useEffect(() => {
        const fetchQuestionnaire = async () => {
            try {
                const searchQuestionnaireResponse = await fhirClient.search({
                    resourceType: 'Questionnaire',
                    searchParams: { url: configs.questionnaireUrl },
                });
                setQuestionnaire(searchQuestionnaireResponse.entry[0].resource);
                
                const populateResponse = await sdcClient.operation({
                    name: "populate",
                    resourceType: 'Questionnaire',
                    method: "POST",
                    input: {
                        resourceType: "Parameters",
                        parameter: [
                            {
                                name: "questionnaire",
                                resource: searchQuestionnaireResponse.entry[0].resource
                            }
                        ]
                    },
                });
                setQuestionnaireResponse(populateResponse as QuestionnaireResponse);
            } catch (error) {
                configs.onError();
            }
        };
        fetchQuestionnaire();
    }, [configs.questionnaireUrl, configs.onError, fhirClient]);

    function extractAndSubmit(questionnaireResponse: QuestionnaireResponse) {
        sdcClient.operation({
            name: "extract",
            resourceType: 'QuestionnaireResponse',
            method: "POST",
            input: {
                resourceType: "Parameters",
                parameter: [
                    {
                        name: "questionnaire-response",
                        resource: questionnaireResponse
                    }
                ]
            }, 
        })
        .then(response => {
            if (response.resourceType !== 'Bundle') {
                throw Error(response.statusText);
            }
            configs.onSubmit(questionnaireResponse, response as Bundle);
        })
        .catch(configs.onError);
    }

    ////////////////////////////////
    //          Content           //
    ////////////////////////////////

    return (
        <QuestionnaireDisplay
            submitButtonLabel={configs.primaryButtonLabel}
            resetButtonLabel={configs.secondaryButtonLabel}
            questionnaire={questionnaire ?? {} as Questionnaire}
            questionnaireResponse={questionnaireResponse ?? {} as QuestionnaireResponse}
            valueSetLoader={valueSetLoader}
            onSubmit={(questionnaireResponse) => { extractAndSubmit(questionnaireResponse) }}
            onError={configs.onError}
        />
    );
};

export default QuestionnaireComponent;