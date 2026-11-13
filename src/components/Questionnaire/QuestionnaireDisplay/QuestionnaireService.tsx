import { QuestionnaireResponse } from 'fhir/r5';
import * as fhirpath from 'fhirpath';
import r5Model from 'fhirpath/fhir-context/r5';

export function evaluateFhirPath(
    resource: QuestionnaireResponse,
    expression: string,
    variablesMap: Map<string, any>
): any {
    try {
        const context = {
            resource,
            ...Object.fromEntries(variablesMap.entries())
        };

        const result = fhirpath.evaluate(
            resource,
            expression,
            context,
            r5Model
        );

        return normalizeFhirPathResult(result as any[]);
    } catch (error) {
        console.error('FHIRPath evaluation error:', expression, error);
        return undefined;
    }
}

function normalizeFhirPathResult(result: any[]): any {
    if (!Array.isArray(result) || result.length === 0) {
        return undefined;
    }

    if (result.length === 1) {
        return result[0];
    }

    return result;
}