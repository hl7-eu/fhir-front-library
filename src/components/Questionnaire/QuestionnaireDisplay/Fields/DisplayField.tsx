//React
import React from 'react'
// Component
import Title from '../../../Title/Title';
import { FieldConfig } from '.';

const DisplayField: React.FC<FieldConfig> = (configs) => {

    ////////////////////////////////
    //          Content           //
    ////////////////////////////////

    return (
        <div className='display-field' hidden={configs.field.disabled(configs.form) && configs.field.hideOnDisabled}>
            <Title level={5} prefix={configs.field.prefix} content={configs.field.label} />
        </div>
    );
};

export default DisplayField;