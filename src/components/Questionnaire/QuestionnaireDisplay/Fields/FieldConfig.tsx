// Component
import { QuestionnaireItemAnswerOption } from 'fhir/r5';
import { ValueSetLoader } from '../../../../services';

// Interface describing a field in the questionnaire
export interface Field {
    id: string;
    prefix?: string;
    label: string;
    type: ('group' | 'display' | 'question' | 'boolean' | 'decimal' | 'integer' | 'date' | 'dateTime' | 'time' | 'string' | 'text' | 'url' | 'coding' | 'attachment' | 'reference' | 'quantity' | string);
    placeholder?: string;
    advancedRendering: { [key: string]: string };
    hidden: boolean;
    disabled: (form: { [key: string]: string[] }) => boolean;
    hideOnDisabled: boolean;
    readOnly: boolean;
    required: boolean;
    repeat: boolean;
    maxLength?: number;
    //TODO See for multiple initial value ?
    initialValue: string;
    subField: Field[];
    answerValueSet?: string;
    answerOption: QuestionnaireItemAnswerOption[];
}

/**
 * Configuration for Form fields.
 */
export interface FieldConfig {
    field: Field;
    form: { [key: string]: string[] };
    // updateForm: React.Dispatch<React.SetStateAction<{
    //     [key: string]: string[];
    // }>>;
    updateForm: (form: { [key: string]: string[] }) => void,
    valueSetLoader: ValueSetLoader;
}

export default FieldConfig;