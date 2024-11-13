//React
import React, { useState } from 'react';
// Component
import DefaultField from './DefaultField';
import FieldConfig from './FieldConfig';

const DecimalField: React.FC<FieldConfig> = (configs) => {

    ////////////////////////////////
    //           State            //
    ////////////////////////////////

    const [isValid, setIsValid] = useState<boolean>(true);

    ////////////////////////////////
    //       Form Handling        //
    ////////////////////////////////

    /**
    * Handle the change of the form.
    *
    * @param event     the event of the change.
    */
    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        var index = 0;
        if (event.target.name !== configs.field.id) {
            index = parseInt(event.target.name.replace(configs.field.id, ''));
        }
        var newForm = { ...configs.form };
        if (event.target.value.trim() == '') {
            newForm[configs.field.id][index] = '';
            setIsValid(true);
        }
        var floatValue = parseFloat(event.target.value);
        if (!isNaN(floatValue)) {
            newForm[configs.field.id][index] = floatValue.toString();
            setIsValid(true);
        } else {
            setIsValid(false);
        }
        configs.updateForm(newForm);
    };

    /**
     * Returns the validation message for the field.
     * 
     * @returns the validation message.
     */
    function getValidationMessage(): string {
        return isValid ? "This field is required." : "Answer must be a valid decimal.";
    }

    ////////////////////////////////
    //          Content           //
    ////////////////////////////////

    return (
        <DefaultField 
            id={configs.field.id}
            prefix={configs.field.prefix}
            label={configs.field.label}
            type="number"
            placeholder={configs.field.placeholder}
            advancedRendering={configs.field.advancedRendering}
            disabled={configs.field.disabled}
            hideOnDisabled={configs.field.hideOnDisabled}
            readOnly={configs.field.readOnly}
            required={configs.field.required}
            repeat={configs.field.repeat}
            values={configs.form[configs.field.id]}
            maxLength={configs.field.maxLength}
            getValidationMessage={getValidationMessage}
            handleChange={handleChange}
            form={configs.form}
            updateForm={configs.updateForm}
        />
    );
};

export default DecimalField;