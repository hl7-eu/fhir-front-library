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

    /**
     * Check if the label should be shown.
     * If the label is empty or only contains spaces, it should not be shown.
     */
    const shouldShowLabel =
        configs.field.label && configs.field.label.trim() !== "";

    ////////////////////////////////
    //          Content           //
    ////////////////////////////////

    return (
        <Form.Group key={configs.field.id}>
            <Form.Label>
                {shouldShowLabel && (
                    <>
                        <b>{configs.field.prefix && configs.field.prefix} </b>
                        {configs.field.label} {configs.field.required && "* "}:
                    </>
                )}
            </Form.Label>
            <Form.Control
                name={configs.field.id}
                type="text"
                as="textarea"
                placeholder={configs.field.placeholder}
                style={configs.field.advancedRendering}
                disabled={configs.field.disabled(configs.form, configs.field.id)}
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