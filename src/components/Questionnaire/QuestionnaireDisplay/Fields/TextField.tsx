//React
import React from 'react'
// Component
import { Form } from 'react-bootstrap';
import { FieldConfig } from '.';

const TextField: React.FC<FieldConfig> = (configs) => {

    ////////////////////////////////
    //       Form Handling        //
    ////////////////////////////////

    /**
    * Handle the change of the form.
    *
    * @param event     the event of the change.
    */
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        configs.updateForm({ ...configs.form, [event.target.name]: [event.target.value] });
    };

    /**
     * Reset if disabled
     */
    // React.useEffect(() => {
    //     if (configs.field.disabled(configs.form) || configs.form[configs.field.id][0] === '') {
    //         configs.updateForm({ ...configs.form, [configs.field.id]: [''] });
    //     }
    // }, [configs.form]);

    ////////////////////////////////
    //          Content           //
    ////////////////////////////////

    return (
        <Form.Group key={configs.field.id} hidden={configs.field.disabled(configs.form) && configs.field.hideOnDisabled}>
            <Form.Label>
                <b>{configs.field.prefix && configs.field.prefix} </b>
                {configs.field.label} {configs.field.required && "* "}:
            </Form.Label>
            <Form.Control
                name={configs.field.id}
                type="text"
                as="textarea"
                placeholder={configs.field.placeholder}
                style={configs.field.advancedRendering}
                disabled={configs.field.disabled(configs.form)}
                readOnly={configs.field.readOnly}
                required={configs.field.required}
                //TODO What if it is an array ??
                value={configs.form[configs.field.id]}
                maxLength={configs.field.maxLength}
                onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
                {"This field is required."}
            </Form.Control.Feedback>
        </Form.Group>
    );
};

export default TextField;