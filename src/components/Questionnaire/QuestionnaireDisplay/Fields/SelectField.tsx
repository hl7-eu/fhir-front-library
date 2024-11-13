//React
import React, { useState } from 'react'
// Component
import { SimpleCode } from '../../../../services';
import { faXmark, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form } from 'react-bootstrap';
import FieldConfig from './FieldConfig';

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
     * Reset if disabled
     */
    // React.useEffect(() => {
    //     if (configs.field.disabled(configs.form) || configs.form[configs.field.id][0] === '') {
    //         var newForm = { ...configs.form };
    //         newForm[configs.field.id] = [''];
    //         configs.updateForm(newForm);
    //     }
    // }, [configs.form]);

    ////////////////////////////////
    //          Content           //
    ////////////////////////////////

    /**
     * Transform codes into option to display in the form.
     * 
     * @param code the code to display as an option.
     * @returns the option HTML element.
     */
    function getOption(code: SimpleCode) {
        return <option value={code.system + '|' + code.code}>{code.display ?? code.code}</option>;
    }

    return (
        <div hidden={configs.field.disabled(configs.form) && configs.field.hideOnDisabled}>{!configs.field.repeat &&
            <Form.Group key={configs.field.id}>
                <Form.Label>
                    <b>{configs.field.prefix && configs.field.prefix} </b>
                    {configs.field.label} {configs.field.required && "* "}:
                </Form.Label>
                <Form.Select className="select"
                    value={configs.form[configs.field.id][0]}
                    style={configs.field.advancedRendering}
                    disabled={configs.field.readOnly || configs.field.disabled(configs.form)}
                    required={configs.field.required}
                    name={configs.field.id}
                    onChange={handleChange}
                >
                    <option disabled={configs.field.required} value="">
                        {/* TODO See what we do about that ?? */}
                        -- {configs.field.placeholder} --
                    </option>
                    {valueSet.map(value => getOption(value))}
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
                                <Form.Select className="select"
                                    name={configs.field.id + index}
                                    value={value}
                                    style={configs.field.advancedRendering}
                                    disabled={configs.field.readOnly || configs.field.disabled(configs.form)}
                                    required={configs.field.required}
                                    onChange={handleChange}
                                >
                                    <option disabled={configs.field.required} value="">
                                        {/* TODO See what we do about that ?? */}
                                        -- {configs.field.placeholder} --
                                    </option>
                                    {valueSet.map(value => getOption(value))}
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