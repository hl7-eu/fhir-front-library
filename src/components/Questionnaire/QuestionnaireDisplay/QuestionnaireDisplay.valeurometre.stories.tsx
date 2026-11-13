import type { Meta, StoryObj } from '@storybook/react';
import QuestionnaireDisplay, { QuestionnaireDisplayProps } from './QuestionnaireDisplay';

const VALEUROMETRE_SCORE_SYSTEM = 'http://chun.upcare.fr/fhir/CodeSystem/valeurometre-score-cs';
const VALEUROMETRE_OBSERVATION_SYSTEM =
    'http://chun.upcare.fr/fhir/CodeSystem/valeurometre-observation-cs';
const OBSERVATION_STATUS_SYSTEM = 'http://hl7.org/fhir/observation-status';
const DEMOGRAPHIC_SYSTEM = 'urn:uuid:d7ec9673-6b4f-409b-9a54-2dd7c2eb2513';
const CALCULATED_EXPRESSION_URL =
    'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-calculatedExpression';
const VARIABLE_EXTENSION_URL = 'http://hl7.org/fhir/StructureDefinition/variable';

type SectionKey = 'Bienveillance' | 'Respect' | 'FaireEquipe' | 'Engagement';

interface SectionConfig {
    key: SectionKey;
    title: string;
    groupLinkId: string;
    resultGroupLinkId: string;
    scoreLinkId: string;
    statusLinkId: string;
    codeLinkId: string;
    observationCode: string;
    observationDisplay: string;
    count: number;
}

const scoreAnswerOptions = Array.from({ length: 10 }, (_, index) => ({
    valueCoding: {
        system: VALEUROMETRE_SCORE_SYSTEM,
        code: String(index + 1),
        display: String(index + 1)
    }
}));

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

const sections: SectionConfig[] = [
    {
        key: 'Bienveillance',
        title: 'Bienveillance',
        groupLinkId: 'section-bienveillance',
        resultGroupLinkId: 'resultat-bienveillance',
        scoreLinkId: 'score_moyen_bienveillance',
        statusLinkId: 'obs_status_bienveillance',
        codeLinkId: 'obs_code_bienveillance',
        observationCode: 'valeurometre-bienveillance-score-moyen',
        observationDisplay: 'Score moyen bienveillance',
        count: 10
    },
    {
        key: 'Respect',
        title: 'Respect',
        groupLinkId: 'section-respect',
        resultGroupLinkId: 'resultat-respect',
        scoreLinkId: 'score_moyen_respect',
        statusLinkId: 'obs_status_respect',
        codeLinkId: 'obs_code_respect',
        observationCode: 'valeurometre-respect-score-moyen',
        observationDisplay: 'Score moyen respect',
        count: 16
    },
    {
        key: 'FaireEquipe',
        title: 'Faire equipe',
        groupLinkId: 'section-faire-equipe',
        resultGroupLinkId: 'resultat-faire-equipe',
        scoreLinkId: 'score_moyen_faire_equipe',
        statusLinkId: 'obs_status_faire_equipe',
        codeLinkId: 'obs_code_faire_equipe',
        observationCode: 'valeurometre-faire-equipe-score-moyen',
        observationDisplay: 'Score moyen faire equipe',
        count: 9
    },
    {
        key: 'Engagement',
        title: 'Engagement',
        groupLinkId: 'section-engagement',
        resultGroupLinkId: 'resultat-engagement',
        scoreLinkId: 'score_moyen_engagement',
        statusLinkId: 'obs_status_engagement',
        codeLinkId: 'obs_code_engagement',
        observationCode: 'valeurometre-engagement-score-moyen',
        observationDisplay: 'Score moyen engagement',
        count: 11
    }
];

function buildAverageExpression(variableNames: string[], unbalanced: boolean): string {
    const values = variableNames.map((variableName) => `%${variableName}.first().toDecimal()`);
    let expression = values[0];

    for (let index = 1; index < values.length; index++) {
        expression = `(${expression}.combine(${values[index]}))`;
    }

    if (unbalanced) {
        return `${expression.slice(0, -1)}.avg()`;
    }

    return `${expression}.avg()`;
}

function buildDefinitionExtractValueExtensions() {
    return [
        {
            url: 'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-definitionExtractValue',
            extension: [
                {
                    url: 'definition',
                    valueUri: 'http://hl7.org/fhir/StructureDefinition/Observation#Observation.effective'
                },
                {
                    url: 'expression',
                    valueExpression: {
                        language: 'text/fhirpath',
                        expression: '(%resource.authored | %resource.meta.lastUpdated | now()).first()'
                    }
                }
            ]
        },
        {
            url: 'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-definitionExtractValue',
            extension: [
                {
                    url: 'definition',
                    valueUri: 'http://hl7.org/fhir/StructureDefinition/Observation#Observation.subject'
                },
                {
                    url: 'expression',
                    valueExpression: {
                        language: 'text/fhirpath',
                        expression: '%resource.subject'
                    }
                }
            ]
        },
        {
            url: 'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-definitionExtractValue',
            extension: [
                {
                    url: 'definition',
                    valueUri: 'http://hl7.org/fhir/StructureDefinition/Observation#Observation.focus'
                },
                {
                    url: 'expression',
                    valueExpression: {
                        language: 'text/fhirpath',
                        expression: '%resource.subject'
                    }
                }
            ]
        }
    ];
}

function buildSectionQuestionText(section: SectionConfig, index: number): string {
    return `${section.title} - question ${index}`;
}

function buildQuestionLinkId(section: SectionConfig, index: number): string {
    return `${section.groupLinkId}-q${index}`;
}

function buildVariableName(section: SectionConfig, index: number): string {
    return `q${section.key}${index}`;
}

function buildSectionQuestions(section: SectionConfig) {
    return Array.from({ length: section.count }, (_, index) => {
        const questionIndex = index + 1;
        const linkId = buildQuestionLinkId(section, questionIndex);
        const variableName = buildVariableName(section, questionIndex);

        return {
            linkId,
            prefix: String(questionIndex),
            text: buildSectionQuestionText(section, questionIndex),
            type: 'choice',
            required: true,
            answerOption: scoreAnswerOptions,
            extension: [
                {
                    url: 'http://hl7.org/fhir/StructureDefinition/questionnaire-itemControl',
                    valueCodeableConcept: {
                        coding: [
                            {
                                system: 'http://hl7.org/fhir/questionnaire-item-control',
                                code: 'radio-button'
                            }
                        ]
                    }
                },
                {
                    url: VARIABLE_EXTENSION_URL,
                    valueExpression: {
                        name: variableName,
                        language: 'text/fhirpath',
                        expression: `%resource.repeat(item).where(linkId='${linkId}').answer.valueCoding.code`
                    }
                }
            ]
        };
    });
}

function buildSectionGroup(section: SectionConfig) {
    return {
        linkId: section.groupLinkId,
        text: section.title,
        type: 'group',
        required: true,
        item: buildSectionQuestions(section)
    };
}

function buildResultGroup(section: SectionConfig, unbalancedCalculatedExpressions: boolean) {
    const variableNames = Array.from(
        { length: section.count },
        (_, index) => buildVariableName(section, index + 1)
    );

    return {
        linkId: section.resultGroupLinkId,
        definition: 'http://hl7.org/fhir/StructureDefinition/Observation#Observation',
        text: `Resultat ${section.title}`,
        type: 'group',
        readOnly: true,
        extension: buildDefinitionExtractValueExtensions(),
        item: [
            {
                linkId: section.scoreLinkId,
                definition: 'http://hl7.org/fhir/StructureDefinition/Observation#Observation.valueQuantity.value',
                text: section.observationDisplay,
                type: 'decimal',
                readOnly: true,
                code: [
                    {
                        system: VALEUROMETRE_OBSERVATION_SYSTEM,
                        code: section.observationCode,
                        display: section.observationDisplay
                    }
                ],
                extension: [
                    {
                        url: CALCULATED_EXPRESSION_URL,
                        valueExpression: {
                            language: 'text/fhirpath',
                            expression: buildAverageExpression(variableNames, unbalancedCalculatedExpressions)
                        }
                    }
                ]
            },
            {
                linkId: section.statusLinkId,
                definition: 'http://hl7.org/fhir/StructureDefinition/Observation#Observation.status',
                text: "Statut de l'observation",
                type: 'choice',
                readOnly: true,
                answerOption: [
                    {
                        valueCoding: {
                            system: OBSERVATION_STATUS_SYSTEM,
                            code: 'final',
                            display: 'Final'
                        },
                        initialSelected: true
                    }
                ]
            },
            {
                linkId: section.codeLinkId,
                definition: 'http://hl7.org/fhir/StructureDefinition/Observation#Observation.code',
                text: "Code de l'observation",
                type: 'choice',
                readOnly: true,
                answerOption: [
                    {
                        valueCoding: {
                            system: VALEUROMETRE_OBSERVATION_SYSTEM,
                            code: section.observationCode,
                            display: section.observationDisplay
                        },
                        initialSelected: true
                    }
                ]
            }
        ]
    };
}

function buildValeurometreQuestionnaire(
    unbalancedCalculatedExpressions: boolean
): QuestionnaireDisplayProps['questionnaire'] {
    return {
        resourceType: 'Questionnaire',
        id: unbalancedCalculatedExpressions ? 'Q-Valeurometre-current-ig' : 'Q-Valeurometre-fixed-story',
        status: 'draft',
        language: 'fr-FR',
        url: 'http://chun.upcare.fr/fhir/Questionnaire/Q-Valeurometre',
        title: 'CHRU Questionnaire Valeurometre',
        subjectType: ['Organization'],
        item: [
            {
                linkId: '3616a7e5-a7df-4a62-9a6a-c15c4dcb192a',
                type: 'display',
                text: "Ce questionnaire permet d'evaluer le ressenti des equipes sur les valeurs vecues au sein du service."
            },
            {
                linkId: '05e5342c-4745-46e5-898b-9de7f6345085',
                text: 'Informations generales',
                type: 'group',
                item: [
                    {
                        linkId: 'f2a7c9d4-3b6e-4a10-8f52-c9e1d7b4a630',
                        text: 'Vous etes',
                        type: 'choice',
                        required: true,
                        answerOption: [
                            {
                                valueCoding: {
                                    system: DEMOGRAPHIC_SYSTEM,
                                    code: 'female',
                                    display: 'Une femme'
                                }
                            },
                            {
                                valueCoding: {
                                    system: DEMOGRAPHIC_SYSTEM,
                                    code: 'male',
                                    display: 'Un homme'
                                }
                            }
                        ]
                    },
                    {
                        linkId: '9d3b6e2a-7c4f-41a9-8b05-f6e2c7a1d948',
                        text: 'Votre age',
                        type: 'integer',
                        required: true
                    },
                    {
                        linkId: 'b7a4e1d9-2f6c-4e83-9a10-d3c8f5b2a746',
                        text: "Votre date d'arrivee dans le service",
                        type: 'date',
                        required: true
                    },
                    {
                        linkId: 'e6c2a9f3-4d7b-41e8-9f50-a1b6d3c8e274',
                        text: 'Votre fonction',
                        type: 'choice',
                        required: true,
                        answerOption: [
                            {
                                valueCoding: {
                                    system: DEMOGRAPHIC_SYSTEM,
                                    code: 'ash',
                                    display: 'ASH'
                                }
                            },
                            {
                                valueCoding: {
                                    system: DEMOGRAPHIC_SYSTEM,
                                    code: 'as',
                                    display: 'AS'
                                }
                            },
                            {
                                valueCoding: {
                                    system: DEMOGRAPHIC_SYSTEM,
                                    code: 'ide',
                                    display: 'IDE'
                                }
                            }
                        ]
                    }
                ]
            },
            {
                linkId: '7b77e11c-0cf7-416e-a71c-bd72f633d5d2',
                text: 'Questionnaire',
                type: 'group',
                required: true,
                item: sections.map(buildSectionGroup)
            },
            ...sections.map((section) => buildResultGroup(section, unbalancedCalculatedExpressions))
        ]
    } as QuestionnaireDisplayProps['questionnaire'];
}

function buildSampleQuestionnaireResponse(
    questionnaireId: string
): QuestionnaireDisplayProps['questionnaireResponse'] {
    return {
        resourceType: 'QuestionnaireResponse',
        id: `${questionnaireId}-response`,
        status: 'in-progress',
        questionnaire: `#${questionnaireId}`,
        subject: {
            reference: 'Organization/UCA-MATERNITE'
        },
        authored: '2026-06-25T10:00:00+02:00',
        item: [
            {
                linkId: '05e5342c-4745-46e5-898b-9de7f6345085',
                text: 'Informations generales',
                item: [
                    {
                        linkId: 'f2a7c9d4-3b6e-4a10-8f52-c9e1d7b4a630',
                        text: 'Vous etes',
                        answer: [
                            {
                                valueCoding: {
                                    system: DEMOGRAPHIC_SYSTEM,
                                    code: 'female',
                                    display: 'Une femme'
                                }
                            }
                        ]
                    },
                    {
                        linkId: '9d3b6e2a-7c4f-41a9-8b05-f6e2c7a1d948',
                        text: 'Votre age',
                        answer: [
                            {
                                valueInteger: 35
                            }
                        ]
                    },
                    {
                        linkId: 'b7a4e1d9-2f6c-4e83-9a10-d3c8f5b2a746',
                        text: "Votre date d'arrivee dans le service",
                        answer: [
                            {
                                valueDate: '2024-01-15'
                            }
                        ]
                    },
                    {
                        linkId: 'e6c2a9f3-4d7b-41e8-9f50-a1b6d3c8e274',
                        text: 'Votre fonction',
                        answer: [
                            {
                                valueCoding: {
                                    system: DEMOGRAPHIC_SYSTEM,
                                    code: 'ide',
                                    display: 'IDE'
                                }
                            }
                        ]
                    }
                ]
            },
            {
                linkId: '7b77e11c-0cf7-416e-a71c-bd72f633d5d2',
                text: 'Questionnaire',
                item: sections.map((section) => ({
                    linkId: section.groupLinkId,
                    text: section.title,
                    item: Array.from({ length: section.count }, (_, index) => {
                        const questionIndex = index + 1;

                        return {
                            linkId: buildQuestionLinkId(section, questionIndex),
                            text: buildSectionQuestionText(section, questionIndex),
                            answer: [
                                {
                                    valueCoding: {
                                        system: VALEUROMETRE_SCORE_SYSTEM,
                                        code: String(((questionIndex - 1) % 3 === 0 ? 10 : 8)),
                                        display: String(((questionIndex - 1) % 3 === 0 ? 10 : 8))
                                    }
                                }
                            ]
                        };
                    })
                }))
            }
        ]
    } as QuestionnaireDisplayProps['questionnaireResponse'];
}

const minimalQuestionnaire = buildValeurometreQuestionnaire(false);
const minimalQuestionnaireResponse = {
    resourceType: 'QuestionnaireResponse',
    id: 'Q-Valeurometre-response-story',
    status: 'in-progress',
    questionnaire: '#Q-Valeurometre-fixed-story',
    item: [
        {
            linkId: 'section-bienveillance',
            text: 'Bienveillance',
            item: [
                {
                    linkId: 'section-bienveillance-q1',
                    text: 'Question 1',
                    answer: [
                        {
                            valueCoding: {
                                system: VALEUROMETRE_SCORE_SYSTEM,
                                code: '10',
                                display: '10'
                            }
                        }
                    ]
                },
                {
                    linkId: 'section-bienveillance-q2',
                    text: 'Question 2',
                    answer: [
                        {
                            valueCoding: {
                                system: VALEUROMETRE_SCORE_SYSTEM,
                                code: '10',
                                display: '10'
                            }
                        }
                    ]
                },
                {
                    linkId: 'section-bienveillance-q3',
                    text: 'Question 3',
                    answer: [
                        {
                            valueCoding: {
                                system: VALEUROMETRE_SCORE_SYSTEM,
                                code: '1',
                                display: '1'
                            }
                        }
                    ]
                }
            ]
        }
    ]
} as QuestionnaireDisplayProps['questionnaireResponse'];

const buggyAverageExpression =
    '(%qBienveillance1.first().toDecimal() | %qBienveillance2.first().toDecimal() | %qBienveillance3.first().toDecimal()).avg()';
const fixedAverageExpression =
    '(%qBienveillance1.first().toDecimal().combine(%qBienveillance2.first().toDecimal())).combine(%qBienveillance3.first().toDecimal()).avg()';

function buildMinimalAverageQuestionnaire(
    averageExpression: string
): QuestionnaireDisplayProps['questionnaire'] {
    return {
        ...minimalQuestionnaire,
        id: averageExpression === buggyAverageExpression ? 'Q-Valeurometre-minimal-buggy' : 'Q-Valeurometre-minimal-fixed',
        item: [
            {
                linkId: 'section-bienveillance',
                text: 'Bienveillance',
                type: 'group',
                item: buildSectionQuestions(sections[0]).slice(0, 3)
            },
            {
                linkId: 'resultat-bienveillance',
                text: 'Resultat Bienveillance',
                type: 'group',
                readOnly: true,
                item: [
                    {
                        linkId: 'score_moyen_bienveillance',
                        definition:
                            'http://hl7.org/fhir/StructureDefinition/Observation#Observation.valueQuantity.value',
                        text: 'Score moyen bienveillance',
                        type: 'decimal',
                        readOnly: true,
                        code: [
                            {
                                system: VALEUROMETRE_OBSERVATION_SYSTEM,
                                code: 'valeurometre-bienveillance-score-moyen',
                                display: 'Score moyen bienveillance'
                            }
                        ],
                        extension: [
                            {
                                url: CALCULATED_EXPRESSION_URL,
                                valueExpression: {
                                    language: 'text/fhirpath',
                                    expression: averageExpression
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    } as QuestionnaireDisplayProps['questionnaire'];
}

const meta: Meta<typeof QuestionnaireDisplay> = {
    title: 'Questionnaire/QuestionnaireDisplay/Valeurometre',
    component: QuestionnaireDisplay
};

export default meta;

type Story = StoryObj<typeof QuestionnaireDisplay>;

export const ValeurometreOriginalExpression: Story = {
    name: 'Valeurometre - expression actuelle',
    args: {
        questionnaire: buildMinimalAverageQuestionnaire(buggyAverageExpression),
        questionnaireResponse: {
            ...minimalQuestionnaireResponse,
            questionnaire: '#Q-Valeurometre-minimal-buggy'
        },
        valueSetLoader: valueSetLoaderMock,
        onSubmit: ((questionnaireResponse) => {
            console.log('QuestionnaireResponse submit', questionnaireResponse);
        }) as QuestionnaireDisplayProps['onSubmit']
    }
};

export const ValeurometreCombineFix: Story = {
    name: 'Valeurometre - correction combine',
    args: {
        questionnaire: buildMinimalAverageQuestionnaire(fixedAverageExpression),
        questionnaireResponse: {
            ...minimalQuestionnaireResponse,
            questionnaire: '#Q-Valeurometre-minimal-fixed'
        },
        valueSetLoader: valueSetLoaderMock,
        onSubmit: ((questionnaireResponse) => {
            console.log('QuestionnaireResponse submit', questionnaireResponse);
        }) as QuestionnaireDisplayProps['onSubmit']
    }
};

export const ValeurometreCompletIGActuel: Story = {
    name: 'Valeurometre complet - IG actuel',
    args: {
        questionnaire: buildValeurometreQuestionnaire(true),
        questionnaireResponse: buildSampleQuestionnaireResponse('Q-Valeurometre-current-ig'),
        valueSetLoader: valueSetLoaderMock,
        onSubmit: ((questionnaireResponse) => {
            console.log('QuestionnaireResponse submit', questionnaireResponse);
        }) as QuestionnaireDisplayProps['onSubmit']
    },
    parameters: {
        docs: {
            description: {
                story:
                    "Version complete du Valeurometre avec les 4 sections et les expressions calculees telles qu'elles arrivent actuellement de l'IG. Les expressions de moyenne sont en combine(...), mais il manque une parenthese fermante sur chaque formule."
            }
        }
    }
};

export const ValeurometreCompletCorrige: Story = {
    name: 'Valeurometre complet - corrige',
    args: {
        questionnaire: buildValeurometreQuestionnaire(false),
        questionnaireResponse: buildSampleQuestionnaireResponse('Q-Valeurometre-fixed-story'),
        valueSetLoader: valueSetLoaderMock,
        onSubmit: ((questionnaireResponse) => {
            console.log('QuestionnaireResponse submit', questionnaireResponse);
        }) as QuestionnaireDisplayProps['onSubmit']
    },
    parameters: {
        docs: {
            description: {
                story:
                    "Version complete corrigee pour Storybook, avec les memes sections mais des expressions de moyenne bien fermees. Utile pour verifier si le probleme d'affichage vient du contenu du Questionnaire ou du rendu du composant."
            }
        }
    }
};
