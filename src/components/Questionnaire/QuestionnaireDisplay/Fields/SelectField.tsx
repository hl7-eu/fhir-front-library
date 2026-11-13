//React
import React, { useState } from 'react'
// Component
import { SimpleCode } from '../../../../services';
import { faXmark, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form } from 'react-bootstrap';
import FieldConfig from './FieldConfig';
import { QuestionnaireItemAnswerOption } from 'fhir/r5';

const SelectField: React.FC<FieldConfig> = (configs) => {

    ////////////////////////////////
    //           State            //
    ////////////////////////////////

    const [valueSet, setValueSet] = useState<SimpleCode[]>([]);

    /**
     * Load the ValueSet used to select a value.
     */
    React.useMemo(() => {
        if (configs.field.answerValueSet !== undefined) {
            configs.valueSetLoader.searchValueSet(configs.field.answerValueSet)
                .then(valueSet => setValueSet(valueSet))
                .catch(error => 
                    //TODO What do we do on error ??
                    console.log(error)
                );
        }
    }, [configs.field.answerValueSet]);

    ////////////////////////////////
    //       Form Handling        //
    ////////////////////////////////

    /**
    * Handle the change of the form.
    *
    * @param event     the event of the change.
    */
    function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
        var index = 0;
        if (event.target.name !== configs.field.id) {
            index = parseInt(event.target.name.replace(configs.field.id, ''));
        }
        var newForm = { ...configs.form };
        newForm[configs.field.id][index] = event.target.value;
        configs.updateForm(newForm);
    };

    /**
     * Add an answer for the field.
     */
    function addAnswer(): void {
        var newForm = { ...configs.form };
        newForm[configs.field.id] = [...configs.form[configs.field.id], configs.field.initialValue];
        configs.updateForm(newForm);
    }

    /**
     * Removes an answer from the list of answer for a specific field.
     * 
     * @param index the index of the answer to remove.
     */
    function removeAnswer(index: number): void {
        var newForm = { ...configs.form };
        newForm[configs.field.id] = configs.form[configs.field.id].filter((v, i) => i !== index);
        configs.updateForm(newForm);
    }

    ////////////////////////////////
    //          Content           //
    ////////////////////////////////

    /**
     * Get all options for the select
     * 
     * @returns the options as HTML element.
     */
    function getOptions() {
        if (valueSet?.length > 0) {
            return valueSet.map((value, index) => getOptionFromCode(value, index));
        }

        if (configs.field.answerOption && configs.field.answerOption.length > 0) {
            return configs.field.answerOption.map((option, index) => getOptionFromOption(option, index));
        }

        return <></>;
    }

    /**
     * Transform codes into option to display in the form.
     * 
     * @param code the code to display as an option.
     * @returns the option HTML element.
     */
    function getOptionFromCode(code: SimpleCode, index: number) {  
        const value = `${code.system}|${code.code}`;
        const label = code.display ?? code.code;

        return (
            <option key={`${value}-${index}`} value={value}>
                {label}
            </option>
        );
    }

    /**
     * Transform QuestionnaireOptions into option to display in the form.
     * 
     * @param option the code to display as an option.
     * @returns the option HTML element.
     */
    function getOptionFromOption(option: QuestionnaireItemAnswerOption, index: number) {
        if (option.valueCoding) {
            const value = `${option.valueCoding.system}|${option.valueCoding.code}`;
            const label = option.valueCoding.display ?? option.valueCoding.code;

            return (
                <option key={`${value}-${index}`} value={value}>
                    {label}
                </option>
            );
        }

        if (option.valueReference) {
            const value = option.valueReference.reference ?? '';
            const label = option.valueReference.display ?? option.valueReference.reference ?? '';

            return (
                <option key={`${value}-${index}`} value={value}>
                    {label}
                </option>
            );
        }

        const value =
            option.valueInteger ??
            option.valueTime ??
            option.valueDate ??
            option.valueString ??
            '';

        return (
            <option key={`${value}-${index}`} value={value}>
                {value}
            </option>
        );
    }

    return (
        <div>{!configs.field.repeat &&
            <Form.Group key={configs.field.id}>
                <Form.Label>
                    <b>{configs.field.prefix && configs.field.prefix} </b>
                    {configs.field.label} {configs.field.required && "* "}:
                </Form.Label>
                <Form.Select
                    value={configs.form[configs.field.id][0]}
                    style={configs.field.advancedRendering}
                    disabled={configs.field.readOnly || configs.field.disabled(configs.form, configs.field.id)}
                    required={configs.field.required}
                    name={configs.field.id}
                    onChange={handleChange}
                >
                    <option disabled={configs.field.required} value="">
                        {/* TODO See what we do about that ?? */}
                        -- {configs.field.placeholder} --
                    </option>
                    {getOptions()}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                    {/* TODO Translate */}
                    {"This field is required."}
                </Form.Control.Feedback>
            </Form.Group>
        }
            {configs.field.repeat &&
                <Form.Group key={configs.field.id}>
                    <Form.Label>
                        <b>{configs.field.prefix && configs.field.prefix} </b>
                        {configs.field.label} {configs.field.required && "* "}:
                    </Form.Label>
                    {configs.form[configs.field.id].map((value, index, array) => {
                        return <Form.Group key={configs.field.id + index}>
                            <div className='repeated'>
                                <Form.Select
                                    name={configs.field.id + index}
                                    value={value}
                                    style={configs.field.advancedRendering}
                                    disabled={configs.field.readOnly || configs.field.disabled(configs.form, configs.field.id)}
                                    required={configs.field.required}
                                    onChange={handleChange}
                                >
                                    <option disabled={configs.field.required} value="">
                                        {/* TODO See what we do about that ?? */}
                                        -- {configs.field.placeholder} --
                                    </option>
                                    {getOptions()}
                                </Form.Select>
                                {index !== 0 &&
                                    <FontAwesomeIcon
                                        size='xl'
                                        className='repeat-cross'
                                        onClick={() => removeAnswer(index)}
                                        icon={faXmark}
                                    />
                                }
                            </div>

                            {index === (array.length - 1) &&
                                <div 
                                    className='repeat-add'
                                    onClick={addAnswer}
                                >
                                    <FontAwesomeIcon
                                        icon={faPlus}
                                    />
                                    {/* TODO Translate that */}
                                    &nbsp;Add an answer
                                </div>
                            }
                            <Form.Control.Feedback type="invalid">
                                {/* TODO Translate */}
                                {"This field is required."}
                            </Form.Control.Feedback>
                        </Form.Group>;
                    })}
                </Form.Group>
            }
        </div>
    );
};

export default SelectField;