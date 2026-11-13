import type { Meta, StoryObj } from '@storybook/react';
import QuestionnaireDisplay, { QuestionnaireDisplayProps } from './QuestionnaireDisplay';

const SATISFACTION_SYSTEM = 'http://chun.upcare.fr/fhir/CodeSystem/satisfaction';

const satisfactionAnswerOptions = [
    {
        valueCoding: {
            system: SATISFACTION_SYSTEM,
            code: '0',
            display: 'Pas du tout satisfait'
        }
    },
    {
        valueCoding: {
            system: SATISFACTION_SYSTEM,
            code: '1',
            display: 'Pas satisfait'
        }
    },
    {
        valueCoding: {
            system: SATISFACTION_SYSTEM,
            code: '2',
            display: 'Assez peu satisfait'
        }
    },
    {
        valueCoding: {
            system: SATISFACTION_SYSTEM,
            code: '3',
            display: 'Assez satisfait'
        }
    },
    {
        valueCoding: {
            system: SATISFACTION_SYSTEM,
            code: '4',
            display: 'Satisfait'
        }
    },
    {
        valueCoding: {
            system: SATISFACTION_SYSTEM,
            code: '5',
            display: 'Tout à fait satisfait'
        }
    }
];

const questionnaireCqlTest: QuestionnaireDisplayProps['questionnaire'] = {
    resourceType: 'Questionnaire',
    id: 'questionnaire-cql-test',
    status: 'draft',
    title: 'Questionnaire test CQL',
    item: [
        {
            linkId: 'Q_A',
            text: 'Organisation du travail',
            type: 'coding',
            extension: [
                {
                    url: 'http://hl7.org/fhir/StructureDefinition/variable',
                    valueExpression: {
                        name: 'qA',
                        language: 'text/fhirpath',
                        expression: "%resource.item.where(linkId='Q_A').answer.valueCoding.code.first().toDecimal()"
                    }
                }
            ],
            answerOption: satisfactionAnswerOptions
        },
        {
            linkId: 'Q_B',
            text: 'Relations humaines',
            type: 'coding',
            extension: [
                {
                    url: 'http://hl7.org/fhir/StructureDefinition/variable',
                    valueExpression: {
                        name: 'qB',
                        language: 'text/fhirpath',
                        expression: "%resource.item.where(linkId='Q_B').answer.valueCoding.code.first().toDecimal()"
                    }
                }
            ],
            answerOption: satisfactionAnswerOptions
        },
        {
            linkId: 'score_moyen',
            text: 'Score moyen de satisfaction',
            type: 'decimal',
            readOnly: true,
            extension: [
                {
                    url: 'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-calculatedExpression',
                    valueExpression: {
                        language: 'text/cql',
                        expression: 'ScoreMoyen'
                    }
                }
            ]
        }
    ]
};

const questionnaireResponseCqlTest: QuestionnaireDisplayProps['questionnaireResponse'] = {
    resourceType: 'QuestionnaireResponse',
    id: 'questionnaire-response-cql-test',
    status: 'in-progress',
    questionnaire: '#questionnaire-cql-test',
    item: [
        {
            linkId: 'Q_A',
            text: 'Organisation du travail',
            answer: [
                {
                    valueCoding: {
                        system: SATISFACTION_SYSTEM,
                        code: '4',
                        display: 'Satisfait'
                    }
                }
            ]
        },
        {
            linkId: 'Q_B',
            text: 'Relations humaines',
            answer: [
                {
                    valueCoding: {
                        system: SATISFACTION_SYSTEM,
                        code: '5',
                        display: 'Tout à fait satisfait'
                    }
                }
            ]
        },
        {
            linkId: 'score_moyen',
            text: 'Score moyen de satisfaction',
            answer: [
                {
                    valueDecimal: 4.5
                }
            ]
        }
    ]
};

const valueSetLoaderMock = {
    fhirClient: undefined,

    searchValueSet: async () => ({
        resourceType: 'ValueSet',
        status: 'active',
        expansion: {
            contains: []
        }
    }),

    toCodeableConcept: () => undefined
} as unknown as QuestionnaireDisplayProps['valueSetLoader'];

const cqlEvaluator: NonNullable<QuestionnaireDisplayProps['cqlEvaluator']> = (
    expression,
    questionnaireResponse,
    variables
) => {
    function getAnswerCode(linkId: string): number | null {
        const item = questionnaireResponse.item?.find(item => item.linkId === linkId);
        const answer = item?.answer?.[0];
        const code = answer?.valueCoding?.code;

        if (code === undefined || code === null) {
            return null;
        }

        const numericValue = Number(code);

        return Number.isFinite(numericValue) ? numericValue : null;
    }

    if (expression !== 'ScoreMoyen') {
        return null;
    }

    const qA =
        variables.get('qA') != null
            ? Number(variables.get('qA'))
            : getAnswerCode('Q_A');

    const qB =
        variables.get('qB') != null
            ? Number(variables.get('qB'))
            : getAnswerCode('Q_B');

    console.log('CQL evaluator appelé', {
        expression,
        qA,
        qB,
        variables,
        questionnaireResponse
    });

    if (qA == null || qB == null) {
        return null;
    }

    return (qA + qB) / 2;
};

const meta: Meta<typeof QuestionnaireDisplay> = {
    title: 'Questionnaire/QuestionnaireDisplay/CQL',
    component: QuestionnaireDisplay
};

export default meta;

type Story = StoryObj<typeof QuestionnaireDisplay>;

export const CqlMock: Story = {
    name: 'CQL Mock',
    args: {
        questionnaire: questionnaireCqlTest,
        questionnaireResponse: questionnaireResponseCqlTest,
        valueSetLoader: valueSetLoaderMock,
        onSubmit: ((questionnaireResponse) => {
            console.log('QuestionnaireResponse submit', questionnaireResponse);
        }) as QuestionnaireDisplayProps['onSubmit'],
        cqlEvaluator
    }
};
