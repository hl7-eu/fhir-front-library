// React
import React, { useState } from 'react';
// React Bootstrap
import { Button, Form } from 'react-bootstrap';
// Component
import Title from '../../Title/Title';
// FHIR
import { Extension, Questionnaire, QuestionnaireItem, QuestionnaireItemEnableWhen, QuestionnaireResponse, QuestionnaireResponseItem, QuestionnaireResponseItemAnswer } from 'fhir/r5';
import { Field, FieldRenderer } from './Fields';
import { ValueSetLoader } from '../../../services';
import { VariableDefinition, CalculatedExpressionDefinition } from './Fields/FieldConfig'
import { evaluateFhirPath } from './QuestionnaireService';

// Interface for the props of the Questionnaire component
export interface QuestionnaireDisplayProps {
    // Function to translate the text in the application
    language?: (key: string) => string;
    // Label of the primary button (Default to validate)
    submitButtonLabel?: string;
    // Function to call when you submit the form
    onSubmit: (response: QuestionnaireResponse) => void;
    // Label of the Reset button (default to Reset)
    resetButtonLabel?: string;
    //The Questionnaire to display
    questionnaire: Questionnaire
    //The QuestionnaireResponse to display
    questionnaireResponse: QuestionnaireResponse
    // The ValueSetLoader to use to load the value sets
    valueSetLoader: ValueSetLoader;
    // Disable all the form fields and hide the buttons (default to false)
    readOnly?: boolean;
    cqlEvaluator?: (
        expression: string,
        questionnaireResponse: QuestionnaireResponse,
        variables: Map<string, any>
    ) => any;
}

const QuestionnaireDisplay: React.FC<QuestionnaireDisplayProps> = (configs) => {

    ////////////////////////////////
    //         Constants          //
    ////////////////////////////////

    const extensionToValueKeyMap: { [key: string]: string } = {
        'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-widthPercentage': 'width',
    };

    const VARIABLE_EXTENSION_URL = 'http://hl7.org/fhir/StructureDefinition/variable';
    const CALCULATED_EXPRESSION_URLS = [
        'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-calculatedExpression',
    ];
    ////////////////////////////////
    //           State            //
    ////////////////////////////////

    const [title, setTitle] = useState<string>('');
    const [fields, setFields] = useState<Field[]>([]);
    const [form, setForm] = useState<{ [key: string]: string[] }>({});
    const [validated, setValidated] = useState(false);
        
    function evaluateCqlExpression(
            expression: string,
            questionnaireResponse: QuestionnaireResponse,
            variables: Map<string, any>
        ): any {
            if (!configs.cqlEvaluator) {
            console.warn('Évaluation CQL demandée mais moteur CQL non encore branché', {
                expression,
            });

            return null;
        }
            return configs.cqlEvaluator(
                expression,
                questionnaireResponse,
                variables
            );
        }

    function evaluateExpression(
        questionnaireResponse: QuestionnaireResponse,
        expression: string,
        language: string | undefined,
        variables: Map<string, any>
        ): any {
           try {
                const expressionLanguage = language ?? 'text/fhirpath';

                if (expressionLanguage === 'text/fhirpath') {
                    return evaluateFhirPath(
                        questionnaireResponse, 
                        expression, 
                        variables
                    );
                }

                if (expressionLanguage === 'text/cql') {
                    return evaluateCqlExpression(
                        expression,
                        questionnaireResponse,
                        variables
                    );
                }

                console.warn('Langage d’expression non supporté', {
                    language: expressionLanguage,
                    expression
                });

                return null;
            } catch (error) {
                console.warn('Erreur lors de l’évaluation de l’expression', {
                    language,
                    expression,
                    error
                });

                return null;
        }
    }

    function getVariableDefinitions(extensions?: Extension[]): VariableDefinition[] {
        if (!extensions) {
            return [];
        }

        return extensions
            .filter(ext => ext.url === VARIABLE_EXTENSION_URL && ext.valueExpression)
            .map(ext => ({
                name: ext.valueExpression?.name ?? '',
                expression: ext.valueExpression?.expression ?? '',
                language: ext.valueExpression?.language
            }))
            .filter(v => v.name !== '' && v.expression !== '');
    }

    function getCalculatedExpression(extensions?: Extension[]): CalculatedExpressionDefinition | undefined {
        if (!extensions) {
            return undefined;
        }

        const ext = extensions.find(e =>
            CALCULATED_EXPRESSION_URLS.includes(e.url) &&
            e.valueExpression &&
            e.valueExpression.expression
        );

        if (!ext?.valueExpression?.expression) {
            return undefined;
        }

        return {
            expression: ext.valueExpression.expression,
            language: ext.valueExpression.language ?? 'text/fhirpath'
        };
    }

    ////////////////////////////////
    //          Actions           //
    ////////////////////////////////

    /**
    * Search on a Questionnaire resource with the search params.
    *
    * @param searchParams The search params
    */
    React.useEffect(() => {
        //TODO What if no title ??
        setTitle(configs.questionnaire.title ?? "Questionnaire Title");

        const fetchedFields = configs.questionnaire.item
            ?.map(item => getFieldFromItem(item, []))
            .flat();
        setFields(fetchedFields ?? []);

        if (fetchedFields) {
            setForm(buildFormWithExpressions(fetchedFields));
        } else {
            setForm({});
        }
    }, [configs.questionnaire, configs.questionnaireResponse]);

    React.useEffect(() => {
        if (!fields || fields.length === 0){
            return;
        }
        const questionnaireResponse = getQRFromForm(form);
        const nextVariables = new Map<string, any>();
        evaluateVariables(fields, questionnaireResponse, nextVariables);

        const nextForm = { ...form };
        calculateValue(fields, questionnaireResponse, nextForm, nextVariables);

        if (JSON.stringify(nextForm) !== JSON.stringify(form)) {
            setForm(nextForm);
        }
    }, [form, fields]);


    function evaluateVariables(fields: Field[], questionnaireResponse: QuestionnaireResponse, variables: Map<string, any> ) {
        fields.forEach(field => {
            if (field.variableDefinitions) {
                field.variableDefinitions.forEach(variable =>  {
                    const value = evaluateExpression(
                        questionnaireResponse,
                        variable.expression,
                        variable.language,
                        variables
                    );
                    variables.set(variable.name, value);
                });
            }
            if (field.subField && field.subField.length > 0) {
                evaluateVariables(field.subField, questionnaireResponse, variables);
            }
        })  
    }

    function calculateValue(
            fields: Field[],
            questionnaireResponse: QuestionnaireResponse,
            form: { [key: string]: string[] },
            variables: Map<string, any>
        ) {
            fields.forEach(field => {
                if (field.calculatedExpression) {
                    const calculatedValue = evaluateExpression(
                        questionnaireResponse,
                        field.calculatedExpression.expression,
                        field.calculatedExpression.language,
                        variables
                    );

                    if (calculatedValue !== undefined && calculatedValue !== null) {
                        form[field.id] = Array.isArray(calculatedValue)
                            ? calculatedValue.map(value => String(value))
                            : [String(calculatedValue)];
                    } else {
                        form[field.id] = [''];
                    }
                }

                if (field.subField && field.subField.length > 0) {
                    calculateValue(field.subField, questionnaireResponse, form, variables);
                }
            });
        }
    /**
     * Complete the form with all the fields retrieved from the Questionnaire.
     * 
     * @param form the form to complete.
     * @returns the completed form.
     */
    function massageFormForDisabledFields(fields: Field[], form: { [key: string]: string[] }): { [key: string]: string[] } {
        fields.forEach(field => {
            if (field.disabled(form, field.id)) {
                var newValue = [field.initialValue];
                console.log("reseting field : " + field.id + " to " + field.initialValue);
                form = { ...form, [field.id]: newValue };
            }
            if (field.subField) {
                form = massageFormForDisabledFields(field.subField, form);
            }
        })
        return form;
    }

    /**
     * Return the Component configuration extracted from the Questionnaire
     * 
     * @param item the Questionnaire Item
     * @returns the mapped Field
     */
    function getFieldFromItem(item: QuestionnaireItem, fieldList: Field[]): Field[] {
        const variableDefinitions = getVariableDefinitions(item.extension);
        const calculatedExpression = getCalculatedExpression(item.extension);

        var field = {
            id: item.linkId,
            prefix: item.prefix,
            label: item.text,
            type: item.type,
            placeholder: item.text,
            advancedRendering: getAdvancedRenderingFromExtensions(item.extension),
            hidden: isHidden(item.extension),
            disabled: (form, questionId) => configs.readOnly || !getFieldEnabled(item)(form, questionId),
            hideOnDisabled: configs.readOnly ? false : (!item.disabledDisplay || item.disabledDisplay === "hidden"),
            readOnly: (item.readOnly ?? false) || !!calculatedExpression,
            required: item.required ?? false,
            repeat: item.repeats ?? false,
            maxLength: item.maxLength,
            initialValue: getFieldInitialValue(item),
            subField: [],
            answerValueSet: item.answerValueSet,
            answerOption: item.answerOption,
            variableDefinitions: variableDefinitions,
            calculatedExpression: calculatedExpression,
        } as Field;
        fieldList.push(field);
        if (field.type !== 'group' && item.item && item.item.length > 0) {
            item.item?.forEach(item => getFieldFromItem(item, fieldList));
        } else if (field.type === 'group' && item.item) {
            var subFields = [] as Field[];
            item.item.forEach(item => getFieldFromItem(item, subFields));
            field.subField = subFields;
        }
        return fieldList;
    }

    /**
     * Gets the list of style properties based on extensions found in the Questionnaire for a specific item.
     * 
     * @param extensions the list of extensions for the item.
     * @returns the list of properties in a key/value format.
     */
    function getAdvancedRenderingFromExtensions(extensions: Extension[] | undefined): { [key: string]: string } {
        if (!extensions) {
            return {};
        }
        var style = extensions.filter(extension => extensionToValueKeyMap[extension.url] !== undefined)
            .map((extension: Extension) => {
                return {
                    key: extensionToValueKeyMap[extension.url],
                    value: (extension.valueString
                        || extension.valueBoolean
                        || extension.valueCode
                        || extension.valueUri
                        || extension.valuePositiveInt
                        || extension.valueDecimal) as string
                };
            }).reduce((acc: any, curr: any) => {
                return { ...acc, [curr.key]: curr.value };
            }, {});
        return style;
    }

    function isHidden(extensions: Extension[] | undefined): boolean {
        if (!extensions) {
            return false;
        }
        var isHidden = extensions.find(extension => extension.url === 'http://hl7.org/fhir/StructureDefinition/questionnaire-hidden')?.valueBoolean;
        return isHidden ?? false;
    }

    /**
     * Extract initial value of the field from the QuestionnaireResponse resource handed as props.
     * 
     * @param item    the Questionnaire item for the field
     * @returns the initial value for the field
     */
    function getFieldInitialValue(item: QuestionnaireItem): string {

        const id = item.linkId;
        const type = item.type as string;

        //TODO how do we handle repeating response ?
        var answers = [] as QuestionnaireResponseItemAnswer[];
        if (configs.questionnaireResponse.item) {
            const item = getItemByLinkId(id, configs.questionnaireResponse.item);
            answers = item?.answer ?? [];
        }
        if (answers.length > 0) {
            switch (type) {
                case 'choice':
                    if (item.answerValueSet != undefined) {
                        return (answers[0].valueCoding
                            ? answers[0].valueCoding.system + '|' + answers[0].valueCoding.code
                            : '') as string;
                    } else if (item.answerOption !== undefined && item.answerOption.length > 0) {
                        const option = item.answerOption[0];
                        if (option.valueCoding) {
                            return (answers[0].valueCoding
                                ? answers[0].valueCoding.system + '|' + answers[0].valueCoding.code
                                : '') as string;
                        } if (option.valueInteger) {
                            return (answers[0].valueInteger ?? '') as string;
                        } if (option.valueDate) {
                            return (answers[0].valueDate ?? '') as string;
                        } if (option.valueTime) {
                            return (answers[0].valueTime ?? '') as string;
                        } if (option.valueString) {
                            return (answers[0].valueString ?? '') as string;
                        } if (option.valueReference) {
                            return (answers[0].valueReference?.reference ?? '') as string;
                        }
                    } else {
                        if (answers[0].valueCoding) {
                            return answers[0].valueCoding.system + '|' + answers[0].valueCoding.code;
                        } else if (answers[0].valueReference) {
                            return answers[0].valueReference.reference ?? '';
                        } else {
                            var value = answers[0].valueInteger ?? answers[0].valueTime ?? answers[0].valueDate ?? answers[0].valueString;
                            return value as string;
                        }
                    }
                case 'quantity':
                    return (answers[0].valueQuantity ? answers[0].valueQuantity.value + "|" + answers[0].valueQuantity.unit : '') as string;
                case 'decimal':
                    return (answers[0].valueDecimal ?? '') as string;
                case 'integer':
                    return (answers[0].valueInteger ?? '') as string;
                case 'url':
                    return answers[0].valueUri ?? '';
                case 'boolean':
                    return (answers[0].valueBoolean ?? '') as string;
                case 'coding':
                    return (answers[0].valueCoding
                        ? answers[0].valueCoding.system + '|' + answers[0].valueCoding.code
                        : '') as string;
                case 'date':
                    return (answers[0].valueDate ?? '') as string;
                case 'dateTime':
                    if (answers[0].valueDateTime) {
                        if (answers[0].valueDateTime.endsWith("Z")) {
                            return answers[0].valueDateTime.slice(0, -4) as string;
                        } else {
                            return answers[0].valueDateTime
                        }
                    }
                    return '' as string;
                case 'time':
                    return (answers[0].valueTime ?? '') as string;
                case 'text':
                case 'string':
                case 'group':
                case 'display':
                case 'question':
                //TODO Banish Question ??
                case 'attachment':
                //TODO
                case 'reference':
                //TODO
                default:
                    return answers[0].valueString ?? '';
            }
        } else {
            switch (type) {
                case 'choice':
                    if (item.answerValueSet != undefined) {
                        //TODO
                        return '';
                    } else if ((item.answerOption?.length ?? 0) > 0) {
                        const initialSelectedOption = item.answerOption?.find(option => option.initialSelected);
                        if (initialSelectedOption) {
                            if (initialSelectedOption.valueCoding) {
                                return initialSelectedOption.valueCoding.system + '|' + initialSelectedOption.valueCoding.code;
                            } else {
                                //TODO Support reference options
                                var value = initialSelectedOption.valueInteger ?? initialSelectedOption.valueTime ?? initialSelectedOption.valueDate ?? initialSelectedOption.valueString;
                                return value as string;
                            }
                        }
                        return '';
                    } else {
                        return ''
                    }
                //TODO Same for other types of fields
            }
        }
        return '';
    }

    /**
     * Create the method to decide if the field shoud be enabled or not.
     * 
     * @param item the questionnaire item.
     * @returns the computed function.
     */
    function getFieldEnabled(item: QuestionnaireItem): (form: { [key: string]: string[] }, idInForm: string) => boolean {
        if (!item.enableWhen || item.enableWhen.length === 0) {
            return () => item.disabledDisplay !== 'protected';
        } else {
            var enableFunctions = item.enableWhen.map(enableWhen => getEnableWhenFunction(item.linkId, enableWhen));
            if (item.enableBehavior === 'all') {
                return (form, idInForm) => enableFunctions.every(f => {
                    console.log("Evaluating field enabled for %s", idInForm)
                    f(form, idInForm)
                }) && item.disabledDisplay !== 'protected';
            } else {
                return (form, idInForm) => enableFunctions.some(f => f(form, idInForm)) && item.disabledDisplay !== 'protected';
            }
        }
    }

    /**
     * Create the method to decide if the field shoud be enabled or not.
     * 
     * @param questionId the ID of the question.
     * @param enableWhen the enableWhen element form the FHIR Questionnaire.
     * @returns the computed function.
     */
    function getEnableWhenFunction(questionId: string, enableWhen: QuestionnaireItemEnableWhen): (form: { [key: string]: string[] }, idInForm: string) => boolean {
        if (enableWhen.operator === 'exists') {
            if (enableWhen.answerBoolean) {
                return (form, idInForm) => {
                    return form[getActualEnableId(idInForm, enableWhen.question)] !== undefined && form[getActualEnableId(idInForm, enableWhen.question)].some(a => a !== '');
                }
            } else {
                return (form, idInForm) => {
                    return form[getActualEnableId(idInForm, enableWhen.question)] !== undefined && form[getActualEnableId(idInForm, enableWhen.question)].every(a => a !== '');
                }
            }
        } else if (enableWhen.operator === '!=') {
            if (enableWhen.answerBoolean !== undefined) {
                return (form, idInForm) => form[getActualEnableId(idInForm, enableWhen.question)]?.some(a => a !== enableWhen.answerBoolean?.toString());
            } else if (enableWhen.answerDecimal !== undefined) {
                return (form, idInForm) => form[getActualEnableId(idInForm, enableWhen.question)]?.some(a => a !== enableWhen.answerDecimal?.toString());
            } else if (enableWhen.answerInteger !== undefined) {
                return (form, idInForm) => form[getActualEnableId(idInForm, enableWhen.question)]?.some(a => a !== enableWhen.answerInteger?.toString());
            } else if (enableWhen.answerDate !== undefined) {
                return (form, idInForm) => form[getActualEnableId(idInForm, enableWhen.question)]?.some(a => a !== enableWhen.answerDate?.toString());
            } else if (enableWhen.answerDateTime !== undefined) {
                return (form, idInForm) => form[getActualEnableId(idInForm, enableWhen.question)]?.some(a => a !== enableWhen.answerDateTime?.toString());
            } else if (enableWhen.answerTime !== undefined) {
                return (form, idInForm) => form[getActualEnableId(idInForm, enableWhen.question)]?.some(a => a !== enableWhen.answerTime?.toString());
            } else if (enableWhen.answerString !== undefined) {
                return (form, idInForm) => form[getActualEnableId(idInForm, enableWhen.question)]?.some(a => a !== enableWhen.answerString?.toString());
            } else if (enableWhen.answerCoding !== undefined) {
                return (form, idInForm) => {
                    const expectedValue = enableWhen.answerCoding?.system + '|' + enableWhen.answerCoding?.code;
                    return form[getActualEnableId(idInForm, enableWhen.question)]?.some(a => a !== expectedValue);
                };
            }
        } else if (enableWhen.operator === '=') {
            if (enableWhen.answerBoolean !== undefined) {
                return (form, idInForm) => form[getActualEnableId(idInForm, enableWhen.question)]?.some(a => a === enableWhen.answerBoolean?.toString());
            } else if (enableWhen.answerDecimal !== undefined) {
                return (form, idInForm) => form[getActualEnableId(idInForm, enableWhen.question)]?.some(a => a === enableWhen.answerDecimal?.toString());
            } else if (enableWhen.answerInteger !== undefined) {
                return (form, idInForm) => form[getActualEnableId(idInForm, enableWhen.question)]?.some(a => a === enableWhen.answerInteger?.toString());
            } else if (enableWhen.answerDate !== undefined) {
                return (form, idInForm) => form[getActualEnableId(idInForm, enableWhen.question)]?.some(a => a === enableWhen.answerDate?.toString());
            } else if (enableWhen.answerDateTime !== undefined) {
                return (form, idInForm) => form[getActualEnableId(idInForm, enableWhen.question)]?.some(a => a === enableWhen.answerDateTime?.toString());
            } else if (enableWhen.answerTime !== undefined) {
                return (form, idInForm) => form[getActualEnableId(idInForm, enableWhen.question)]?.some(a => a === enableWhen.answerTime?.toString());
            } else if (enableWhen.answerString !== undefined) {
                return (form, idInForm) => form[getActualEnableId(idInForm, enableWhen.question)]?.some(a => a === enableWhen.answerString);
            } else if (enableWhen.answerCoding !== undefined) {
                return (form, idInForm) => {
                    const expectedValue = enableWhen.answerCoding?.system + '|' + enableWhen.answerCoding?.code;
                    return form[getActualEnableId(idInForm, enableWhen.question)]?.some(a => a === expectedValue);
                };
            }
        } else if (enableWhen.operator === '<') {
            if (enableWhen.answerDecimal !== undefined) {
                return (form, idInForm) => {
                    return form[getActualEnableId(idInForm, enableWhen.question)]?.some(a => parseFloat(a) < (enableWhen.answerDecimal ?? 0));
                };
            } else if (enableWhen.answerInteger !== undefined) {
                return (form, idInForm) => {
                    return form[getActualEnableId(idInForm, enableWhen.question)]?.some(a => parseInt(a) < (enableWhen.answerInteger ?? 0));
                };
            }
        } else if (enableWhen.operator === '>') {
            if (enableWhen.answerDecimal !== undefined) {
                return (form, idInForm) => {
                    return form[getActualEnableId(idInForm, enableWhen.question)]?.some(a => parseFloat(a) > (enableWhen.answerDecimal ?? 0));
                };
            } else if (enableWhen.answerInteger !== undefined) {
                return (form, idInForm) => {
                    return form[getActualEnableId(idInForm, enableWhen.question)]?.some(a => parseInt(a) > (enableWhen.answerInteger ?? 0));
                };
            }
        } else if (enableWhen.operator === '<=') {
            if (enableWhen.answerDecimal !== undefined) {
                return (form, idInForm) => {
                    return form[getActualEnableId(idInForm, enableWhen.question)]?.some(a => parseFloat(a) <= (enableWhen.answerDecimal ?? 0));
                };
            } else if (enableWhen.answerInteger !== undefined) {
                return (form, idInForm) => {
                    return form[getActualEnableId(idInForm, enableWhen.question)]?.some(a => parseInt(a) <= (enableWhen.answerInteger ?? 0));
                };
            }
        } else if (enableWhen.operator === '>=') {
            if (enableWhen.answerDecimal !== undefined) {
                return (form, idInForm) => {
                    return form[getActualEnableId(idInForm, enableWhen.question)]?.some(a => parseFloat(a) >= (enableWhen.answerDecimal ?? 0));
                };
            } else if (enableWhen.answerInteger !== undefined) {
                return (form, idInForm) => {
                    return form[getActualEnableId(idInForm, enableWhen.question)]?.some(a => parseInt(a) >= (enableWhen.answerInteger ?? 0));
                };
            }
        }

        console.log("enableWhen not supported for operator [%s] and with type [%s] for question [%s]",
            enableWhen.operator,
            enableWhen.answerBoolean ? 'boolean'
                : enableWhen.answerDecimal ? 'decimal'
                    : enableWhen.answerInteger ? 'integer'
                        : enableWhen.answerDate ? 'date'
                            : enableWhen.answerDateTime ? 'dateTime'
                                : enableWhen.answerTime ? 'time'
                                    : enableWhen.answerString ? 'string'
                                        : enableWhen.answerCoding ? 'Coding'
                                            : enableWhen.answerQuantity ? 'Quantity'
                                                : 'Reference'
            , questionId);
        return () => true;
    }

    function getActualEnableId(questionId: string, enableWhenQuestion: string): string {
        var actualEnableQuestionId: string;
        if (questionId.includes('@@')) {
            const [groupId, groupIndexStr, subFieldId] = questionId.split("@@");
            actualEnableQuestionId = `${groupId}@@${groupIndexStr}@@${enableWhenQuestion}`;
        } else {
            actualEnableQuestionId = enableWhenQuestion;
        }
        return actualEnableQuestionId;
    }

    ////////////////////////////////
    //       Form Handling        //
    ////////////////////////////////

    /**
    * Reset the form.
    */
    function onReset() {
        setForm(buildFormWithExpressions(fields));
        setValidated(false);
    }

    /**
     * Handle the submition event.
     * 
     * @param event the submit event.
     */
    const handleSubmit = (event: any) => {
        event.preventDefault();
        const eventForm = event.currentTarget;
        if (eventForm.checkValidity() === true) {
            configs.onSubmit(getQRFromForm(form));
        }
        setValidated(true);
    };

    const getQRFromForm = (form: { [key: string]: string[] }) => {
        var newQuestionnaireResponse = JSON.parse(
            JSON.stringify(configs.questionnaireResponse)
        ) as QuestionnaireResponse;
        addAnswers(newQuestionnaireResponse, form);
        pruneEmptyItemArrays(newQuestionnaireResponse);
        return newQuestionnaireResponse;
    }

    ////////////////////////////////
    //      Answer handling       //
    ////////////////////////////////

    function addAnswers(questionnaireResponse: QuestionnaireResponse, form: { [key: string]: string[] }): QuestionnaireResponse {
        const deepCloneWithoutAnswers = (base: any) => {
            const cloned = JSON.parse(JSON.stringify(base));

            const clear = (it: any) => {
                if (it && typeof it === "object") {
                    delete it.answer;
                    if (Array.isArray(it.item)) it.item.forEach(clear);
                }
            };
            clear(cloned);

            return cloned;
        };

        const setItemAnswer = (
            item: QuestionnaireResponseItem,
            answer: QuestionnaireResponseItemAnswer[] | undefined
        ) => {
            if (answer && answer.length > 0) {
                item.answer = answer;
                return;
            }

            delete item.answer;
        };

        const resolveItemByKeyPath = (
            key: string,
            rootItems: QuestionnaireResponseItem[]
        ): QuestionnaireResponseItem | undefined => {
            const parts = key.split("@@");

            if (parts.length === 1) {
                return getItemByLinkId(parts[0], rootItems);
            }

            let currentItems: QuestionnaireResponseItem[] = rootItems;

            for (let i = 0; i < parts.length - 1; i += 2) {
                const groupId = parts[i];
                const groupIndexStr = parts[i + 1];
                const groupIndex = parseInt(groupIndexStr, 10);

                if (Number.isNaN(groupIndex)) {
                    console.warn(`Invalid group index "${groupIndexStr}" in key "${key}"`);
                    return undefined;
                }

                const [parentArray, groupItems] = getItemsByLinkId(groupId, currentItems);

                if (!groupItems || groupItems.length === 0) {
                    console.warn(`Group ${groupId} not found at this level for key "${key}"`);
                    return undefined;
                }

                while (groupItems.length <= groupIndex) {
                    const base = groupItems[0];
                    const cloned = deepCloneWithoutAnswers(base);
                    parentArray.push(cloned);
                    groupItems.push(cloned);
                }

                const repeatedInstance = groupItems[groupIndex];
                if (!repeatedInstance.item) repeatedInstance.item = [];

                currentItems = repeatedInstance.item as QuestionnaireResponseItem[];
            }

            const leafId = parts[parts.length - 1];
            const leaf = currentItems.find((i) => i.linkId === leafId);

            if (!leaf) {
                console.warn(`Leaf ${leafId} not found for key "${key}"`);
                return undefined;
            }
            return leaf;
        };

        for (const [key, value] of Object.entries(form)) {
            let item: QuestionnaireResponseItem | undefined;

            if (questionnaireResponse.item) {
                item = resolveItemByKeyPath(key, questionnaireResponse.item);
            }

            if (!item) continue;

            const originalFieldKey = key.includes("@@") ? key.split("@@").at(-1)! : key;
            const type = getFieldType(originalFieldKey, fields);

            if (!type || type === "group" || type === "display") continue;

            delete item.answer;

            switch (type) {
                case "date":
                    setItemAnswer(item, mapToDateAnswer(value));
                    break;
                case "decimal":
                    setItemAnswer(item, mapToDecimalAnswer(value));
                    break;
                case "integer":
                    setItemAnswer(item, mapToIntegerAnswer(value));
                    break;
                case "url":
                    setItemAnswer(item, mapToUrlAnswer(value));
                    break;
                case "boolean":
                    setItemAnswer(item, mapToBooleanAnswer(value));
                    break;
                case "text":
                case "string":
                    setItemAnswer(item, mapToStringAnswer(value));
                    break;
                case "coding":
                    setItemAnswer(item, mapToCodingAnswer(value));
                    break;
                case "dateTime":
                    setItemAnswer(item, mapToDateTimeAnswer(value));
                    break;
                case "time":
                    setItemAnswer(item, mapToTimeAnswer(value));
                    break;
                case "quantity":
                    setItemAnswer(item, mapToQuantityAnswer(value));
                    break;
                case "choice": {
                    const field = getField(originalFieldKey, fields);

                    if (field?.answerValueSet) {
                        setItemAnswer(item, mapToCodingAnswer(value));
                        break;
                    }

                    if (field && (field.answerOption?.length ?? 0) > 0) {
                        const firstOption = field.answerOption![0];
                        // It is implied that all options have the same type here
                        if (firstOption?.valueInteger) setItemAnswer(item, mapToIntegerAnswer(value));
                        else if (firstOption?.valueDate) setItemAnswer(item, mapToDateAnswer(value));
                        else if (firstOption?.valueTime) setItemAnswer(item, mapToTimeAnswer(value));
                        else if (firstOption?.valueString) setItemAnswer(item, mapToStringAnswer(value));
                        else if (firstOption?.valueCoding) setItemAnswer(item, mapToCodingAnswer(value));
                        else if (firstOption?.valueReference) setItemAnswer(item, mapToReferenceAnswer(value));
                        break;
                    }
                    break;
                }
                case "attachment":
                    setItemAnswer(item, mapToAttachmentAnswer(value));
                    break;
                case "reference":
                default:
                    //TODO
                    console.log("Cannot convert answers for field [%s] of type [%s]", key, type);
                    break;
            }
        }
        return questionnaireResponse;
    }

    function pruneEmptyItemArrays(questionnaireResponse: QuestionnaireResponse): QuestionnaireResponse {
        const pruneItems = (items: QuestionnaireResponseItem[] | undefined): QuestionnaireResponseItem[] | undefined => {
            if (!items) {
                return undefined;
            }

            const prunedItems = items.map((item) => {
                const updatedItem = { ...item };
                const nestedItems = pruneItems(updatedItem.item);

                if (nestedItems && nestedItems.length > 0) {
                    updatedItem.item = nestedItems;
                } else {
                    delete updatedItem.item;
                }

                return updatedItem;
            });

            return prunedItems;
        };

        const prunedRootItems = pruneItems(questionnaireResponse.item);

        if (prunedRootItems && prunedRootItems.length > 0) {
            questionnaireResponse.item = prunedRootItems;
        } else {
            delete questionnaireResponse.item;
        }

        return questionnaireResponse;
    }

    function mapToCodingAnswer(value: string[]): QuestionnaireResponseItemAnswer[] | undefined {
        const answer = value.map(value => {
            if (value === '') {
                return undefined;
            }
            var splittedValue = value.split('|');
            return {
                valueCoding: {
                    system: splittedValue[0],
                    code: splittedValue[1]
                }
            } as QuestionnaireResponseItemAnswer;
        }).filter((v): v is QuestionnaireResponseItemAnswer => !!v)
        return answer.length > 0 ? answer : undefined;
    }

    function mapToReferenceAnswer(value: string[]): QuestionnaireResponseItemAnswer[] | undefined {
        const answer = value.map(value => {
            if (value === '') {
                return undefined;
            }
            return {
                valueReference: {
                    reference: value
                }
            } as QuestionnaireResponseItemAnswer;
        }).filter((v): v is QuestionnaireResponseItemAnswer => !!v);
        return answer.length > 0 ? answer : undefined;
    }

    function mapToIntegerAnswer(value: string[]): QuestionnaireResponseItemAnswer[] | undefined {
        const answer = value.map(value => {
            if (value === '') {
                return undefined;
            }
            return {
                valueInteger: parseInt(value)
            } as QuestionnaireResponseItemAnswer;
        }).filter((v): v is QuestionnaireResponseItemAnswer => !!v);
        return answer.length > 0 ? answer : undefined;
    }

    function mapToDateAnswer(value: string[]): QuestionnaireResponseItemAnswer[] | undefined {
        const answer = value.map(value => {
            if (value === '') {
                return undefined;
            }
            return {
                valueDate: value
            } as QuestionnaireResponseItemAnswer;
        }).filter((v): v is QuestionnaireResponseItemAnswer => !!v);
        return answer.length > 0 ? answer : undefined;
    }

    function mapToTimeAnswer(value: string[]): QuestionnaireResponseItemAnswer[] | undefined {
        const answer = value.map(value => {
            if (value === '') {
                return undefined;
            }
            return {
                valueTime: value
            } as QuestionnaireResponseItemAnswer;
        }).filter((v): v is QuestionnaireResponseItemAnswer => !!v);
        return answer.length > 0 ? answer : undefined;
    }

    function mapToStringAnswer(value: string[]): QuestionnaireResponseItemAnswer[] | undefined {
        const answer = value.map(value => {
            if (value === '') {
                return undefined;
            }
            return {
                valueString: value
            } as QuestionnaireResponseItemAnswer;
        }).filter((v): v is QuestionnaireResponseItemAnswer => !!v);
        return answer.length > 0 ? answer : undefined;
    }

    function mapToDecimalAnswer(value: string[]): QuestionnaireResponseItemAnswer[] | undefined {
        const answer = value.map(value => {
            if (value === '') {
                return undefined;
            }
            return {
                valueDecimal: parseFloat(value)
            } as QuestionnaireResponseItemAnswer;
        }).filter((v): v is QuestionnaireResponseItemAnswer => !!v);
        return answer.length > 0 ? answer : undefined;
    }

    function mapToUrlAnswer(value: string[]): QuestionnaireResponseItemAnswer[] | undefined {
        const answer = value.map(value => {
            if (value === '') {
                return undefined;
            }
            return {
                valueUri: value
            } as QuestionnaireResponseItemAnswer;
        }).filter((v): v is QuestionnaireResponseItemAnswer => !!v);
        return answer.length > 0 ? answer : undefined;
    }

    function mapToBooleanAnswer(value: string[]): QuestionnaireResponseItemAnswer[] | undefined {
        const answer = value.map(value => {
            if (value === '') {
                return undefined;
            }
            return {
                valueBoolean: value === 'true'
            } as QuestionnaireResponseItemAnswer;
        }).filter((v): v is QuestionnaireResponseItemAnswer => !!v);
        return answer.length > 0 ? answer : undefined;
    }

    function mapToDateTimeAnswer(value: string[]): QuestionnaireResponseItemAnswer[] | undefined {
        const answer = value.map(value => {
            if (value === '') {
                return undefined;
            }
            return {
                valueDateTime: value + ':00Z'
            } as QuestionnaireResponseItemAnswer;
        }).filter((v): v is QuestionnaireResponseItemAnswer => !!v);
        return answer.length > 0 ? answer : undefined;
    }

    function mapToQuantityAnswer(value: string[]): QuestionnaireResponseItemAnswer[] | undefined {
        const answer = value.map(value => {
            if (value === '') {
                return undefined;
            }
            var splittedValue = value.split('|');
            return {
                valueQuantity: {
                    value: parseFloat(splittedValue[0]),
                    unit: splittedValue[1]
                }
            } as QuestionnaireResponseItemAnswer;
        }).filter((v): v is QuestionnaireResponseItemAnswer => !!v);
        return answer.length > 0 ? answer : undefined;
    }

    /**
     * Function to map attachment values to QuestionnaireResponseItemAnswer.
     * 
     * @param value the value of the attachment field.
     * @returns a list of QuestionnaireResponseItemAnswer or undefined if no valid attachment found.
     */
    function mapToAttachmentAnswer(
        value: string[]
    ): QuestionnaireResponseItemAnswer[] | undefined {
        const answer = value
            .map((value) => {
                // If the value is empty, return undefined
                if (value === "") {
                    return undefined;
                }
                // Try to parse the value as a JSON object
                try {
                    const attachmentObj = JSON.parse(value);
                    return {
                        valueAttachment: {
                            contentType: attachmentObj.contentType,
                            data: attachmentObj.data,
                            title: attachmentObj.title,
                        },
                    } as QuestionnaireResponseItemAnswer;
                } catch (error) {
                    console.error("Error parsing attachment value:", error);
                    return undefined;
                }
            })
            .filter((v): v is QuestionnaireResponseItemAnswer => !!v);
        // Return the answer if it has valid items, otherwise return undefined
        return answer.length > 0 ? answer : undefined;
    }

    function getItemsByLinkId(linkId: string, items: QuestionnaireResponseItem[]): [QuestionnaireResponseItem[], QuestionnaireResponseItem[]] {
        var children = items.filter(item => item.linkId === linkId);

        if (children.length > 0) {
            return [items, children];
        } else {
            for (var item of items) {
                if (item.item && item.item.length > 0) {
                    var [unused, resultFromChild] = getItemsByLinkId(linkId, item.item);
                    if (resultFromChild.length > 0) {
                        return [unused, resultFromChild];
                    }
                }
            }
        }
        return [[], []];
    }

    function getItemByLinkId(linkId: string, items: QuestionnaireResponseItem[]): QuestionnaireResponseItem | undefined {
        return items?.map((item: QuestionnaireResponseItem) => {
            if (item.linkId === linkId) {
                return item;
            } else if (item.item && item.item.length > 0) {
                return getItemByLinkId(linkId, item.item);
            }
            return undefined;
        }).find(item => item !== undefined);
    }

    function getFieldType(linkId: string, fieldList: Field[]): string | undefined {
        return fieldList.map((field: Field) => {
            if (field.id === linkId) {
                return field.type;
            } else if (field.subField && field.subField.length > 0) {
                return getFieldType(linkId, field.subField);
            }
            return undefined;
        }).find(item => item !== undefined);
    }

    function getField(linkId: string, fieldList: Field[]): Field | undefined {
        return fieldList.map((field: Field) => {
            if (field.id === linkId) {
                return field;
            } else if (field.subField && field.subField.length > 0) {
                return getField(linkId, field.subField);
            }
            return undefined;
        }).find(item => item !== undefined);
    }

    function buildFormWithExpressions(
        fields: Field[],
    ): { [key: string]: string[] } {
        //Form is ready with default values
        var form = buildFormFromQuestionnaireAndResponse(fields, configs.questionnaireResponse.item, {});
        
        //Transform form -> QR
        var currentQuestionnaireResponse = getQRFromForm(form);

        var variables: Map<string, any> = new Map<string,any>();
        evaluateVariables(fields, currentQuestionnaireResponse, variables);

        calculateValue(fields, currentQuestionnaireResponse, form, variables);

        return form;
    }

    function buildFormFromQuestionnaireAndResponse(
        fields: Field[],
        responseItems: QuestionnaireResponseItem[] | undefined,
        form: { [key: string]: string[] } = {}
    ): { [key: string]: string[] } {
        const leafId = (id: string) => id.split("@@").at(-1)!;

        for (const field of fields) {
            const fhirId = leafId(field.id);

            if (field.type === "group") {
                const groupOcc = responseItems
                    ? responseItems.filter((it) => it.linkId === fhirId)
                    : [];

                if (!field.repeat) {
                    const scopedItems = groupOcc[0]?.item ?? [];
                    if (field.subField?.length) {
                        form = buildFormFromQuestionnaireAndResponse(field.subField, scopedItems, form);
                    }
                    continue;
                }

                const count = Math.max(groupOcc.length, 1);

                form[field.id] = Array.from({ length: count }, () => field.initialValue ?? "");

                for (let idx = 0; idx < count; idx++) {
                    const scopedItems = groupOcc[idx]?.item ?? [];

                    if (field.subField?.length) {
                        const prefixedSubFields = field.subField.map((sf) => ({
                            ...sf,
                            id: `${field.id}@@${idx}@@${leafId(sf.id)}`,
                        })) as Field[];

                        form = buildFormFromQuestionnaireAndResponse(prefixedSubFields, scopedItems, form);
                    }
                }

                continue;
            }

            const item = responseItems ? responseItems.find((it) => it.linkId === fhirId) : undefined;
            const answers = item?.answer ?? [];
            form[field.id] = [getInitialValueFromAnswers(field, answers)];
        }

        return form;
    }

    function getInitialValueFromAnswers(
        field: Field,
        answers: QuestionnaireResponseItemAnswer[]
    ): string {
        const type = field.type;

        if (!answers || answers.length === 0) {
            if (type === "choice" && field.answerOption?.length) {
                const initialSelected = field.answerOption.find((o) => o.initialSelected);

                if (initialSelected?.valueCoding) {
                return `${initialSelected.valueCoding.system}|${initialSelected.valueCoding.code}`;
                }

                if (initialSelected?.valueReference) {
                return initialSelected.valueReference.reference ?? "";
                }

                if (initialSelected?.valueString) {
                return initialSelected.valueString;
                }
            }

            return field.initialValue ?? "";
        }

        switch (type) {
            case "choice":
            case "coding":
                {
                    const answer = answers[0];

                    if (answer.valueCoding) {
                        return `${answer.valueCoding.system}|${answer.valueCoding.code}`;
                    }

                    if (answer.valueReference) {
                        return answer.valueReference.reference ?? "";
                    }

                    if (answer.valueString) {
                        return answer.valueString;
                    }

                    return "";
                }
            case "quantity":
                return answers[0].valueQuantity
                    ? `${answers[0].valueQuantity.value}|${answers[0].valueQuantity.unit}`
                    : "";

            case "decimal":
                return answers[0].valueDecimal !== undefined ? String(answers[0].valueDecimal) : "";

            case "integer":
                return answers[0].valueInteger !== undefined ? String(answers[0].valueInteger) : "";

            case "url":
                return answers[0].valueUri ?? "";

            case "boolean":
                return answers[0].valueBoolean !== undefined ? String(answers[0].valueBoolean) : "";

            case "date":
                return answers[0].valueDate ?? "";

            case "dateTime":
                if (answers[0].valueDateTime) {
                    return answers[0].valueDateTime.endsWith("Z")
                        ? answers[0].valueDateTime.slice(0, -4)
                        : answers[0].valueDateTime;
                }
                return "";

            case "time":
                return answers[0].valueTime ?? "";

            case "text":
            case "string":
            default:
                return answers[0].valueString ?? "";
        }
    }

    ////////////////////////////////
    //          Content           //
    ////////////////////////////////

    return (
        <div className='d-flex flex-column gap-1'>
            <Title
                level={2}
                content={title}
            />
            <Form noValidate validated={validated} onSubmit={handleSubmit} className='d-flex flex-column gap-4'>
                <Form.Group>
                    {fields.map(field => (
                        <React.Fragment key={field.id}>
                            {FieldRenderer.getFieldComponent(field, form, (updatedForm) => {
                                var newForm = massageFormForDisabledFields(fields, updatedForm);
                                //Transform form -> QR
                                var currentQuestionnaireResponse = getQRFromForm(updatedForm);
                                var variables: Map<string, any> = new Map<string,any>();
                                evaluateVariables(fields, currentQuestionnaireResponse, variables);
                                calculateValue(fields, currentQuestionnaireResponse, newForm, variables);

                                setForm(newForm);
                            }, configs.valueSetLoader)}
                        </React.Fragment>
                    ))}
                </Form.Group>
                {!configs.readOnly &&
                    <Form.Group className="d-flex flex-wrap align-items-start gap-4">
                        <Button
                            className="button"
                            variant="primary"
                            type='submit'
                        >
                            {
                                //TODO if we have a language, dont we want to pass keys instead of labels ?..
                                configs.submitButtonLabel ||
                                (configs.language ?
                                    configs.language('button.validate')
                                    : 'Validate')}
                        </Button>
                        <Button
                            className="button"
                            variant="secondary"
                            onClick={() => onReset()}
                        >
                            {configs.resetButtonLabel ||
                                (configs.language ?
                                    configs.language('button.reset')
                                    : 'Reset')}
                        </Button>
                    </Form.Group>
                }
            </Form>
        </div>
    );
};

export default QuestionnaireDisplay;
