//React
import React from 'react'
// Component
import DefaultField from './DefaultField';
import { FieldConfig } from '.';

const UrlField: React.FC<FieldConfig> = (configs) => {

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
        newForm[configs.field.id][index] = event.target.value;
        configs.updateForm(newForm);
    };

    ////////////////////////////////
    //          Content           //
    ////////////////////////////////

    return (
        <DefaultField 
            id={configs.field.id}
            prefix={configs.field.prefix}
            label={configs.field.label}
            type="string"
            pattern='\S*'
            placeholder={configs.field.placeholder}
            advancedRendering={configs.field.advancedRendering}
            disabled={configs.field.disabled}
            hideOnDisabled={configs.field.hideOnDisabled}
            readOnly={configs.field.readOnly}
            required={configs.field.required}
            repeat={configs.field.repeat}
            values={configs.form[configs.field.id]}
            maxLength={configs.field.maxLength}
            handleChange={handleChange}
            form={configs.form}
            updateForm={configs.updateForm}
        />
    );
};

export default UrlField;