// React
import React, { useState } from 'react';
// Components
import { FieldConfig } from '.';
import { Form } from 'react-bootstrap';

const BooleanField: React.FC<FieldConfig> = (configs) => {

    ////////////////////////////////
    //           State            //
    ////////////////////////////////

    const [isTrue, setIsTrue] = useState<boolean | undefined>(false);
    const [isFalse, setIsFalse] = useState<boolean | undefined>(false);

    ////////////////////////////////
    //       Form Handling        //
    ////////////////////////////////

    /**
    * Initialize the disable status
    */
    React.useEffect(() => {
        setIsTrue(configs.form[configs.field.id][0] === 'true');
        setIsFalse(configs.form[configs.field.id][0] === 'false');
    }, [configs.form]);

    /**
    * Handle the change of the form.
    *
    * @param event     the event of the change.
    */
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.id.startsWith('true') && !isTrue) {
            configs.updateForm({ ...configs.form, [configs.field.id]: ['true'] });
        } else if (event.target.id.startsWith('true')) {
            configs.updateForm({ ...configs.form, [configs.field.id]: [''] });
        } else if (!isFalse) {
            configs.updateForm({ ...configs.form, [configs.field.id]: ['false'] });
        } else {
            configs.updateForm({ ...configs.form, [configs.field.id]: [''] });
        }
    };

    ////////////////////////////////
    //          Content           //
    ////////////////////////////////

    return (
        <Form.Group key={configs.field.id} hidden={ configs.field.disabled(configs.form) && configs.field.hideOnDisabled }>
            <Form.Label>
                <b>{configs.field.prefix && configs.field.prefix} </b>
                {configs.field.label} {configs.field.required && "* "}:
            </Form.Label>
            <div style={configs.field.advancedRendering}>
                <Form.Check
                    inline
                    id={'false-' + configs.field.id}
                    label='False'
                    name={configs.field.id}
                    type={configs.field.required ? 'radio' : 'checkbox'}
                    required={configs.field.required}
                    disabled={configs.field.readOnly || configs.field.disabled(configs.form)}
                    checked={isFalse}
                    onChange={handleChange}
                />
                <Form.Check
                    inline
                    id={'true-' + configs.field.id}
                    label='True'
                    name={configs.field.id}
                    type={configs.field.required ? 'radio' : 'checkbox'}
                    required={configs.field.required}
                    disabled={configs.field.readOnly || configs.field.disabled(configs.form)}
                    checked={isTrue}
                    onChange={handleChange}
                />
            <Form.Control.Feedback type="invalid">
                {/* TODO translate */}
                {"This field is required."}
            </Form.Control.Feedback>
            </div>
        </Form.Group>
    );
};

export default BooleanField;