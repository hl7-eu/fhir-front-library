// React
import React from 'react';
// Component
import { Card } from 'react-bootstrap';
import Title from '../../../Title';
import FieldRenderer from './FieldRenderer';
import FieldConfig from './FieldConfig';
// FontAwesome
import { faXmark, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const GroupField: React.FC<FieldConfig> = (configs) => {

    ////////////////////////////////
    //       Form Handling        //
    ////////////////////////////////

    /**
     * Add a group instance for repeating groups.
     */
    function addGroup(): void {
        const newForm = { ...configs.form };
        const current = newForm[configs.field.id] ?? [""];
        const newIndex = current.length;

        newForm[configs.field.id] = [...current, ""];

        const initSubFields = (subFields: any[], parentKey: string) => {
            for (const sf of subFields ?? []) {
                const key = `${parentKey}@@${newIndex}@@${sf.id}`;

                if (sf.type === "group") {
                    newForm[key] = [""];

                    if (sf.repeat) {
                        const childParentKey = key;
                        const childIndex = 0;

                        for (const child of sf.subField ?? []) {
                            newForm[`${childParentKey}@@${childIndex}@@${child.id}`] = [""];
                        }
                    } else {
                        for (const child of sf.subField ?? []) {
                            newForm[`${key}@@0@@${child.id}`] = [""];
                        }
                    }
                } else {
                    newForm[key] = [""];
                }
            }
        };

        initSubFields(configs.field.subField as any[], configs.field.id);

        configs.updateForm(newForm);
    }

    /**
     * Removes a group instance from the list of groups for a repeating field.
     * 
     * @param index the index of the group to remove.
     */
    function removeGroup(index: number): void {
        let newForm = { ...configs.form };
        newForm[configs.field.id] = configs.form[configs.field.id].filter((_, i) => i !== index);
        configs.updateForm(newForm);
    }

    ////////////////////////////////
    //          Content           //
    ////////////////////////////////

    return (
        <>
            {/* If the field is not repeating, render it as a single instance */}
            {!configs.field.repeat &&
                <Card className='group-field'>
                    <Card.Header>
                        <Title level={2} prefix={configs.field.prefix} content={configs.field.label} />
                    </Card.Header>
                    <Card.Body className="cardBody">
                        {configs.field.subField.map((field, index) => (
                            <React.Fragment key={`${field.id}-${index}`}>
                                {FieldRenderer.getFieldComponent(
                                    field,
                                    configs.form,
                                    configs.updateForm,
                                    configs.valueSetLoader
                                )}
                            </React.Fragment>
                        ))}
                    </Card.Body>
                </Card>
            }
            {/* If the field is repeating, render each instance of the group */}
            {configs.field.repeat &&
                <div className="repeating-group-container">
                    {/* Render each group instance */}
                    {configs.form[configs.field.id].map((_, index) => (
                        <Card key={`${configs.field.id}-${index}`} className='group-field mb-3'>
                            <Card.Header className="d-flex justify-content-between align-items-center">
                                <Title level={2} prefix={configs.field.prefix} content={`${configs.field.label} ${index + 1}`} />
                                {/* Button to remove the group instance */}
                                {index !== 0 && (
                                    <FontAwesomeIcon
                                        size='lg'
                                        className='repeat-cross'
                                        onClick={() => removeGroup(index)}
                                        icon={faXmark}
                                        title="Remove this group instance"
                                    />
                                )}
                            </Card.Header>
                            <Card.Body className="cardBody">
                                {/* Render the fields for this group instance */}
                                {configs.field.subField.map(field => {
                                    const reidentifiedField = {
                                        ...field,
                                        id: `${configs.field.id}@@${index}@@${field.id}`
                                    };
                                    // fallback to initialValue if not in form
                                    const fieldValue = configs.form[reidentifiedField.id] ?? [""];
                                    return FieldRenderer.getFieldComponent(reidentifiedField, { ...configs.form, [reidentifiedField.id]: fieldValue },
                                        configs.updateForm, configs.valueSetLoader)
                                })}
                            </Card.Body>
                        </Card>
                    ))}
                    {/* Button to add a new group instance */}
                    <div
                        className='repeat-add mb-3'
                        onClick={addGroup}
                    >
                        <FontAwesomeIcon
                            icon={faPlus}
                            title="Add a new group instance"
                        />
                        &nbsp;Add a Group
                    </div>
                </div>
            }
        </>
    );
};

export default GroupField;