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

// Interface for the props of the Questionnaire component
export interface QuestionnaireDisplayProps {
    // Function to translate the text in the application
    language?: (key: string) => string;

    // Label of the primary button (Default to validate)
    submitButtonLabel?: string;
    onSubmit: (response: QuestionnaireResponse) => void;
    // Label of the Reset button (default to Reset)
    resetButtonLabel?: string;

    //The Questionnaire to display
    questionnaire: Questionnaire
    //The QuestionnaireResponse to display
    questionnaireResponse: QuestionnaireResponse

    valueSetLoader: ValueSetLoader;

    // Function to call when an error occurs
    onError: () => void;
}

const QuestionnaireDisplay: React.FC<QuestionnaireDisplayProps> = (configs) => {

    ////////////////////////////////
    //         Constants          //
    ////////////////////////////////

    const extensionToValueKeyMap: { [key: string]: string } = {
        'http://hl7.org/fhir/uv/sdc/StructureDefinition/sdc-questionnaire-widthPercentage': 'width',
    };

    ////////////////////////////////
    //           State            //
    ////////////////////////////////

    const [title, setTitle] = useState<string>('');
    const [fields, setFields] = useState<Field[]>([]);
    const [form, setForm] = useState<{ [key: string]: string[] }>({});
    const [validated, setValidated] = useState(false);

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
        setForm(fetchedFields ? getFormFromFields(fetchedFields, {}) : {});
    }, [configs]);

    /**
     * Complete the form with all the fields retrieved from the Questionnaire.
     * 
     * @param fields the list of fields.
     * @param form the form to complete.
     * @returns the completed form.
     */
    function getFormFromFields(fields: Field[], form: { [key: string]: string[] }): { [key: string]: string[] } {
        fields.forEach(field => {
            var newValue = [field.initialValue];
            form = { ...form, [field.id]: newValue };
            if (field.subField) {
                form = getFormFromFields(field.subField, form);
            }
        })
        return form;
    }

    /**
     * Complete the form with all the fields retrieved from the Questionnaire.
     * 
     * @param form the form to complete.
     * @returns the completed form.
     */
    function massageFormForDisabledFields(fields: Field[], form: { [key: string]: string[] }): { [key: string]: string[] } {
        fields.forEach(field => {
            if (field.disabled(form)) {
                var newValue = [field.initialValue];
                console.log ("reseting field : " + field.id + " to " + field.initialValue);
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
        var field = {
            id: item.linkId,
            prefix: item.prefix,
            label: item.text,
            type: item.type,
            placeholder: item.text,
            advancedRendering: getAdvancedRenderingFromExtensions(item.extension),
            disabled: (form) => !getFieldEnabled(item)(form),
            hideOnDisabled: !item.disabledDisplay || item.disabledDisplay === "hidden",
            readOnly: item.readOnly ?? false,
            required: item.required ?? false,
            repeat: item.repeats ?? false,
            maxLength: item.maxLength,
            initialValue: getFieldInitialValue(item.linkId, item.type),
            subField: [],
            answerValueSet: item.answerValueSet,
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

    /**
     * Extract initial value of the field from the QuestionnaireResponse resource handed as props.
     * 
     * @param id    the field ID
     * @param type  the field type
     * @returns the initial value for the field
     */
    function getFieldInitialValue(id: string, type: string): string {
        //TODO how do we handle repeating response ?
        var answers = [] as QuestionnaireResponseItemAnswer[];
        if (configs.questionnaireResponse.item) {
            const item = getItemByLinkId(id, configs.questionnaireResponse.item);
            answers = item?.answer ?? [];
        }
        if (answers.length > 0) {
            switch (type) {
                case 'group':
                case 'display':
                case 'question':
                //TODO Banish Question ??
                case 'attachment':
                //TODO
                case 'reference':
                //TODO
                case 'quantity':
                    //TODO
                    console.log("Cannot find initial value for field [%s] of type [%s]", id, type);
                    break;
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
                    return (answers[0].valueDateTime ?? '') as string;
                case 'time':
                    return (answers[0].valueTime ?? '') as string;
                case 'text':
                case 'string':
                default:
                    return answers[0].valueString ?? '';
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
    function getFieldEnabled(item: QuestionnaireItem): (form: { [key: string]: string[] }) => boolean {
        if (!item.enableWhen || item.enableWhen.length === 0) {
            return () => item.disabledDisplay !== 'protected';
        } else {
            var enableFunctions = item.enableWhen.map(enableWhen => getEnableWhenFunction(item.linkId, enableWhen));
            if (item.enableBehavior === 'all') {
                return (form) => enableFunctions.every(f => f(form)) && item.disabledDisplay !== 'protected';
            } else {
                return (form) => enableFunctions.some(f => f(form)) && item.disabledDisplay !== 'protected';
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
    function getEnableWhenFunction(questionId: string, enableWhen: QuestionnaireItemEnableWhen): (form: { [key: string]: string[] }) => boolean {
        if (enableWhen.operator === 'exists') {
            if (enableWhen.answerBoolean) {
                return (form) => {
                    return form[enableWhen.question] !== undefined && form[enableWhen.question].some(a => a !== '');
                }
            } else {
                return (form) => {
                    return form[enableWhen.question] !== undefined && form[enableWhen.question].every(a => a !== '');
                }
            }
        } else if (enableWhen.operator === '!=') {
            if (enableWhen.answerBoolean !== undefined) {
                return (form) => form[enableWhen.question].some(a => a !== enableWhen.answerBoolean?.toString());
            } else if (enableWhen.answerDecimal !== undefined) {
                return (form) => form[enableWhen.question].some(a => a !== enableWhen.answerDecimal?.toString());
            } else if (enableWhen.answerInteger !== undefined) {
                return (form) => form[enableWhen.question].some(a => a !== enableWhen.answerInteger?.toString());
            } else if (enableWhen.answerDate !== undefined) {
                return (form) => form[enableWhen.question].some(a => a !== enableWhen.answerDate?.toString());
            } else if (enableWhen.answerDateTime !== undefined) {
                return (form) => form[enableWhen.question].some(a => a !== enableWhen.answerDateTime?.toString());
            } else if (enableWhen.answerTime !== undefined) {
                return (form) => form[enableWhen.question].some(a => a !== enableWhen.answerTime?.toString());
            } else if (enableWhen.answerString !== undefined) {
                return (form) => form[enableWhen.question].some(a => a !== enableWhen.answerString?.toString());
            }
        } else if (enableWhen.operator === '=') {
            if (enableWhen.answerBoolean !== undefined) {
                return (form) => form[enableWhen.question].some(a => a === enableWhen.answerBoolean?.toString());
            } else if (enableWhen.answerDecimal !== undefined) {
                return (form) => form[enableWhen.question].some(a => a === enableWhen.answerDecimal?.toString());
            } else if (enableWhen.answerInteger !== undefined) {
                return (form) => form[enableWhen.question].some(a => a === enableWhen.answerInteger?.toString());
            } else if (enableWhen.answerDate !== undefined) {
                return (form) => form[enableWhen.question].some(a => a === enableWhen.answerDate?.toString());
            } else if (enableWhen.answerDateTime !== undefined) {
                return (form) => form[enableWhen.question].some(a => a === enableWhen.answerDateTime?.toString());
            } else if (enableWhen.answerTime !== undefined) {
                return (form) => form[enableWhen.question].some(a => a === enableWhen.answerTime?.toString());
            } else if (enableWhen.answerString !== undefined) {
                return (form) => form[enableWhen.question].some(a => a === enableWhen.answerString);
            }
        } else if (enableWhen.operator === '<') {
            if (enableWhen.answerDecimal !== undefined) {
                return (form) => {
                    return form[enableWhen.question].some(a => parseFloat(a) < (enableWhen.answerDecimal ?? 0));
                };
            } else if (enableWhen.answerInteger !== undefined) {
                return (form) => {
                    return form[enableWhen.question].some(a => parseInt(a) < (enableWhen.answerInteger ?? 0));
                };
            }
        } else if (enableWhen.operator === '>') {
            if (enableWhen.answerDecimal !== undefined) {
                return (form) => {
                    return form[enableWhen.question].some(a => parseFloat(a) > (enableWhen.answerDecimal ?? 0));
                };
            } else if (enableWhen.answerInteger !== undefined) {
                return (form) => {
                    return form[enableWhen.question].some(a => parseInt(a) > (enableWhen.answerInteger ?? 0));
                };
            }
        } else if (enableWhen.operator === '<=') {
            if (enableWhen.answerDecimal !== undefined) {
                return (form) => {
                    return form[enableWhen.question].some(a => parseFloat(a) <= (enableWhen.answerDecimal ?? 0));
                };
            } else if (enableWhen.answerInteger !== undefined) {
                return (form) => {
                    return form[enableWhen.question].some(a => parseInt(a) <= (enableWhen.answerInteger ?? 0));
                };
            }
        } else if (enableWhen.operator === '>=') {
            if (enableWhen.answerDecimal !== undefined) {
                return (form) => {
                    return form[enableWhen.question].some(a => parseFloat(a) >= (enableWhen.answerDecimal ?? 0));
                };
            } else if (enableWhen.answerInteger !== undefined) {
                return (form) => {
                    return form[enableWhen.question].some(a => parseInt(a) >= (enableWhen.answerInteger ?? 0));
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

    ////////////////////////////////
    //       Form Handling        //
    ////////////////////////////////

    /**
    * Reset the form.
    */
    function onReset() {
        setForm(getFormFromFields(fields, {}));
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
            var newQuestionnaireResponse = { ...configs.questionnaireResponse };
            addAnswers(newQuestionnaireResponse, form);
            configs.onSubmit(newQuestionnaireResponse);
        }
        setValidated(true);
    };

    ////////////////////////////////
    //      Answer handling       //
    ////////////////////////////////

    function addAnswers(questionnaireResponse: QuestionnaireResponse, form: { [key: string]: string[] }): QuestionnaireResponse {
        for (const [key, value] of Object.entries(form)) {
            var item = undefined;
            if (questionnaireResponse.item) {
                item = getItemByLinkId(key, questionnaireResponse.item);
            }
            if (item) {
                var type = getFieldType(key, fields);
                switch (type) {
                    case 'date':
                        item.answer = value.map(value => {
                            if (value === '') {
                                return undefined;
                            }
                            return {
                                valueDate: value
                            } as QuestionnaireResponseItemAnswer;
                        }).filter((v): v is QuestionnaireResponseItemAnswer => !!v);
                        break;
                    case 'decimal':
                        item.answer = value.map(value => {
                            if (value === '') {
                                return undefined;
                            }
                            return {
                                valueDecimal: parseFloat(value)
                            } as QuestionnaireResponseItemAnswer;
                        }).filter((v): v is QuestionnaireResponseItemAnswer => !!v);
                        break;
                    case 'integer':
                        item.answer = value.map(value => {
                            if (value === '') {
                                return undefined;
                            }
                            return {
                                valueInteger: parseInt(value)
                            } as QuestionnaireResponseItemAnswer;
                        }).filter((v): v is QuestionnaireResponseItemAnswer => !!v);
                        break;
                    case 'url':
                        item.answer = value.map(value => {
                            if (value === '') {
                                return undefined;
                            }
                            return {
                                valueUri: value
                            } as QuestionnaireResponseItemAnswer;
                        }).filter((v): v is QuestionnaireResponseItemAnswer => !!v);
                        break;
                    case 'boolean':
                        item.answer = value.map(value => {
                            if (value === '') {
                                return undefined;
                            }
                            return {
                                valueBoolean: value === 'true'
                            } as QuestionnaireResponseItemAnswer;
                        }).filter((v): v is QuestionnaireResponseItemAnswer => !!v);
                        break;
                    case 'text':
                    case 'string':
                        item.answer = value.map(value => {
                            if (value === '') {
                                return undefined;
                            }
                            return {
                                valueString: value
                            } as QuestionnaireResponseItemAnswer;
                        }).filter((v): v is QuestionnaireResponseItemAnswer => !!v);
                        break;
                    case 'coding':
                        item.answer = value.map(value => {
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
                        }).filter((v): v is QuestionnaireResponseItemAnswer => !!v);
                        break;
                    case 'dateTime':
                        item.answer = value.map(value => {
                            if (value === '') {
                                return undefined;
                            }
                            return {
                                valueDateTime: value + ':00'
                            } as QuestionnaireResponseItemAnswer;
                        }).filter((v): v is QuestionnaireResponseItemAnswer => !!v);
                        break;
                    case 'time':
                        item.answer = value.map(value => {
                            if (value === '') {
                                return undefined;
                            }
                            return {
                                valueTime: value
                            } as QuestionnaireResponseItemAnswer;
                        }).filter((v): v is QuestionnaireResponseItemAnswer => !!v);
                        break;
                    case 'attachment':
                    case 'reference':
                    case 'quantity':
                    default:
                        //TODO
                        console.log("Cannot convert answers for field [%s] of type [%s]", key, type);
                        break;
                }
            }
        }
        return questionnaireResponse;
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

    ////////////////////////////////
    //          Content           //
    ////////////////////////////////

    return (
        <>
            <Title
                level={2}
                content={title}
            />
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group>
                    {fields.map(field => FieldRenderer.getFieldComponent(field, form, (form) => setForm(massageFormForDisabledFields(fields, form)), configs.valueSetLoader))}
                </Form.Group>
                <Form.Group className="col">
                    <Button
                        className="button"
                        variant="danger"
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
            </Form>
        </>
    );
};

export default QuestionnaireDisplay;