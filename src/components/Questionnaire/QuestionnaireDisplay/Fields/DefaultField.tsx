// React
import React from 'react'
// Component
import { Form } from 'react-bootstrap';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Style
import "./Fields.css";

export interface DefaultFieldConf {
    id: string;
    prefix?: string;
    label: string;
    type: string;
    pattern?: string;
    placeholder?: string;
    advancedRendering: { [key: string]: string };
    disabled: (form: { [key: string]: string[] }) => boolean;
    hideOnDisabled: boolean;
    readOnly: boolean;
    required: boolean;
    repeat: boolean;
    values: string[];
    maxLength?: number;
    getValidationMessage?: () => string;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    form: { [key: string]: string[] };
    // updateForm: React.Dispatch<React.SetStateAction<{
    //     [key: string]: string[];
    // }>>;
    updateForm: (form: { [key: string]: string[] }) => void;
}

const DefaultField: React.FC<DefaultFieldConf> = (configs) => {

    ////////////////////////////////
    //        Validation          //
    ////////////////////////////////

    /**
     * Default validation message.
     * 
     * @returns the validation message for the field.
     */
    //TODO translate
    function getValidationMessage(): string {
        if (configs.required && configs.values.some(value => value === '')) {
            return "This field is required.";
        } else if (configs.pattern) {
            //TODO See if we need to check the field in particular
            return "Invalid answer. (Pattern : " + configs.pattern + ")";
        }
        return "Invalid answer.";
    }

    /**
     * Add an answer for the field.
     */
    function addAnswer(): void {
        var newForm = { ...configs.form };
        newForm[configs.id] = [...configs.values, ''];
        configs.updateForm(newForm);
    }

    /**
     * Removes an answer from the list of answer for a specific field.
     * 
     * @param index the index of the answer to remove.
     */
    function removeAnswer(index: number): void {
        var newForm = { ...configs.form };
        newForm[configs.id] = configs.values.filter((v, i) => i !== index);
        configs.updateForm(newForm);
    }

    ////////////////////////////////
    //          Content           //
    ////////////////////////////////

    return (
        <div className='field' hidden={configs.disabled(configs.form) && configs.hideOnDisabled}>{!configs.repeat &&
            <Form.Group key={configs.id}>
                <Form.Label>
                    <b>{configs.prefix && configs.prefix} </b>
                    {configs.label} {configs.required && "* "}:
                </Form.Label>
                <Form.Control
                    name={configs.id}
                    type={configs.type}
                    pattern={configs.pattern}
                    placeholder={configs.placeholder}
                    style={configs.advancedRendering}
                    disabled={configs.disabled(configs.form)}
                    readOnly={configs.readOnly}
                    required={configs.required}
                    value={configs.values[0]}
                    maxLength={configs.maxLength}
                    onChange={configs.handleChange}
                    step={configs.type === "time" ? "1" : "any"}
                />
                <Form.Control.Feedback type="invalid">
                    {configs.getValidationMessage ? configs.getValidationMessage() : getValidationMessage()}
                </Form.Control.Feedback>
            </Form.Group>
        }
            {configs.repeat &&
                <Form.Group key={configs.id}>
                    <Form.Label>
                        <b>{configs.prefix && configs.prefix} </b>
                        {configs.label} {configs.required && "* "}:
                    </Form.Label>
                    {configs.values.map((value, index, array) => {
                        return <Form.Group key={configs.id + index}>
                            <div className='repeated'>
                                <Form.Control
                                    name={configs.id + index}
                                    type={configs.type}
                                    pattern={configs.pattern}
                                    placeholder={configs.placeholder}
                                    style={configs.advancedRendering}
                                    disabled={configs.disabled(configs.form)}
                                    readOnly={configs.readOnly}
                                    required={configs.required}
                                    value={value}
                                    maxLength={configs.maxLength}
                                    onChange={configs.handleChange}
                                    step="any"
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
                                {configs.getValidationMessage ? configs.getValidationMessage() : getValidationMessage()}
                            </Form.Control.Feedback>
                        </Form.Group>;
                    })}
                </Form.Group>
            }
        </div>
    );
};

export default DefaultField;