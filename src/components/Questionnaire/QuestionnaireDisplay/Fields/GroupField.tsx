// React
import React from 'react';

// Component
import { Card } from 'react-bootstrap';
import Title from '../../../Title';
import FieldRenderer from './FieldRenderer';
import FieldConfig from './FieldConfig';

const GroupField: React.FC<FieldConfig> = (configs) => {

    ////////////////////////////////
    //          Content           //
    ////////////////////////////////

    return (
        <Card className='group-field' hidden={configs.field.disabled(configs.form) && configs.field.hideOnDisabled}>
            <Card.Header>
                <Title level={2} prefix={configs.field.prefix} content={configs.field.label} />
            </Card.Header>
            <Card.Body className="cardBody">
                {configs.field.subField.map(field => FieldRenderer.getFieldComponent(field, configs.form, configs.updateForm, configs.valueSetLoader))}
            </Card.Body>
        </Card>
    );
};

export default GroupField;