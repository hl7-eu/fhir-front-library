//React
import React, { useState } from 'react'
// Component
import { faXmark, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form } from 'react-bootstrap';
import FieldConfig from './FieldConfig';

const QuantityField: React.FC<FieldConfig> = (configs) => {

    ////////////////////////////////
    //       Form Handling        //
    ////////////////////////////////

    function getValueFromForm(formAnswer: string): string {
        if (formAnswer === '' || formAnswer.startsWith('|')) {
            return '';
        }
        return formAnswer.split('|')[0];
    }

    function getUnitFromForm(formAnswer: string): string {
        if (formAnswer === '' || formAnswer.endsWith('|')) {
            return '';
        }
        return formAnswer.split('|')[1];
    }

    /**
    * Handle the change of the form.
    *
    * @param event     the event of the change.
    */
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        var index = 0;
        if (event.target.name.replace('value:', '').replace('unit:', '') !== configs.field.id) {
            index = parseInt(event.target.name.replace(configs.field.id, '').replace('value:', '').replace('unit:', ''));
        }
        var newFormValue = ''
        if (event.target.name.startsWith('value:')) {
            newFormValue = event.target.value + "|" + getUnitFromForm(configs.form[configs.field.id][index]);
        } else {
            newFormValue = getValueFromForm(configs.form[configs.field.id][index]) + "|" + event.target.value;
        }
        var newForm = { ...configs.form };
        newForm[configs.field.id][index] = newFormValue;
        configs.updateForm(newForm);
    };

    /**
     * Add an answer for the field.
     */
    function addAnswer(): void {
        var newForm = { ...configs.form };
        newForm[configs.field.id] = [...configs.form[configs.field.id], ''];
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

    /**
     * Default validation message.
     * 
     * @returns the validation message for the field.
     */
    function getValidationMessage(): string {
        if (configs.field.required && configs.form[configs.field.id].some(value => value === '')) {
            return "This field is required.";
        }
        return "Invalid answer.";
    }

    ////////////////////////////////
    //          Content           //
    ////////////////////////////////

    return (
        <div className='field' hidden={configs.field.disabled(configs.form) && configs.field.hideOnDisabled}>{!configs.field.repeat &&
            <Form.Group key={configs.field.id}>
                <Form.Label>
                    <b>{configs.field.prefix && configs.field.prefix} </b>
                    {configs.field.label} {configs.field.required && "* "}:
                </Form.Label>
                <Form.Control
                    name={"value:" + configs.field.id}
                    type="number"
                    placeholder={"Value"}
                    style={configs.field.advancedRendering}
                    disabled={configs.field.disabled(configs.form)}
                    readOnly={configs.field.readOnly}
                    required={configs.field.required}
                    value={getValueFromForm(configs.form[configs.field.id][0])}
                    onChange={handleChange}
                    step={"any"}
                />
                <Form.Control
                    name={"unit:" + configs.field.id}
                    type="string"
                    placeholder={"Unit"}
                    style={configs.field.advancedRendering}
                    disabled={configs.field.disabled(configs.form)}
                    readOnly={configs.field.readOnly}
                    required={configs.field.required}
                    value={getUnitFromForm(configs.form[configs.field.id][0])}
                    onChange={handleChange}
                    step={"any"}
                />
                <Form.Control.Feedback type="invalid">
                    {getValidationMessage()}
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
                                <Form.Control
                                    name={"value:" + configs.field.id + index}
                                    type="number"
                                    placeholder={"Value"}
                                    style={configs.field.advancedRendering}
                                    disabled={configs.field.disabled(configs.form)}
                                    readOnly={configs.field.readOnly}
                                    required={configs.field.required}
                                    value={getValueFromForm(value)}
                                    onChange={handleChange}
                                    step={"any"}
                                />
                                <Form.Control
                                    name={"unit:" + configs.field.id + index}
                                    type="string"
                                    placeholder={"Unit"}
                                    style={configs.field.advancedRendering}
                                    disabled={configs.field.disabled(configs.form)}
                                    readOnly={configs.field.readOnly}
                                    required={configs.field.required}
                                    value={getUnitFromForm(value)}
                                    onChange={handleChange}
                                    step={"any"}
                                />
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
                                {getValidationMessage()}
                            </Form.Control.Feedback>
                        </Form.Group>;
                    })}
                </Form.Group>
            }
        </div>
    );
};

export default QuantityField;