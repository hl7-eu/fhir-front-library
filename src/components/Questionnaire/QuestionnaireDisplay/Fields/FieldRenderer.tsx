//Composants
import StringField from "./StringField";
import React from "react";
import DateField from "./DateField";
import IntegerField from "./IntegerField";
import GroupField from "./GroupField";
import DisplayField from "./DisplayField";
import UrlField from "./UrlField";
import BooleanField from "./BooleanField";
import DecimalField from "./DecimalField";
import TextField from "./TextField";
import { ValueSetLoader } from "../../../../services";
import SelectField from "./SelectField";
import { Field, QuantityField } from ".";
import DateTimeField from "./DateTimeField";
import TimeField from "./TimeField";

////////////////////////////
//        Class           //
////////////////////////////

export class FieldRenderer {

    /**
     * Returns the component to display for the given field.
     * 
     * @param field the field
     * @returns the appropriate component.
     */
    static getFieldComponent(field: Field, 
            form: { [key: string]: string[] }, 
            //updateForm: React.Dispatch<React.SetStateAction<{[key: string]: string[];}>>,
            updateForm: (form: { [key: string]: string[] }) => void,
            valueSetLoader: ValueSetLoader
        ): React.JSX.Element {
        if (field.hidden) {
            return <></>
        }
        // TODO allowed for valueSet or Options : coding, decimal, integer, date, dateTime, time, string or quantity
        switch (field.type) {
            case 'group':
                return <GroupField field={field} form={form} updateForm={updateForm} valueSetLoader={valueSetLoader}/>;
            case 'display':
                return <DisplayField field={field} form={form} updateForm={updateForm} valueSetLoader={valueSetLoader}/>;
            case 'url':
                return <UrlField field={field} form={form} updateForm={updateForm} valueSetLoader={valueSetLoader} />;
            case 'text':
                return <TextField field={field} form={form} updateForm={updateForm} valueSetLoader={valueSetLoader} />;
            case 'string':
                return <StringField field={field} form={form} updateForm={updateForm} valueSetLoader={valueSetLoader} />;
            case 'date':
                return <DateField field={field} form={form} updateForm={updateForm} valueSetLoader={valueSetLoader}/>;
            case 'dateTime':
                return <DateTimeField field={field} form={form} updateForm={updateForm} valueSetLoader={valueSetLoader}/>;
            case 'time':
                return <TimeField field={field} form={form} updateForm={updateForm} valueSetLoader={valueSetLoader}/>;
            case 'integer':
                return <IntegerField field={field} form={form} updateForm={updateForm} valueSetLoader={valueSetLoader} />;
            case 'boolean':
                return <BooleanField field={field} form={form} updateForm={updateForm} valueSetLoader={valueSetLoader}/>;
            case 'decimal':
                return <DecimalField field={field} form={form} updateForm={updateForm} valueSetLoader={valueSetLoader}/>;
            case 'coding':
            //TODO This is a dirty fix for R4 support.
            case 'open-choice': // TODO Open-choice and coding with answerConstraint
            case 'choice':
                if (field.answerValueSet !== undefined || field.answerOption != undefined) {
                    return <SelectField field={field} form={form} updateForm={updateForm} valueSetLoader={valueSetLoader}/>
                } else {
                    console.log("Coding field type shall define an answerValueSet element or an answerOption element (field [%s])", field.type, field.id);
                    return <></>;
                }
            case 'quantity':
                return <QuantityField field={field} form={form} updateForm={updateForm} valueSetLoader={valueSetLoader}/>;
            case 'time':
            case 'attachment':
            case 'reference':
            case 'question':
            default:
                console.log("Unsupported field type [%s] for field [%s]", field.type, field.id);
                return <></>;
        }
    }
}

export default FieldRenderer;