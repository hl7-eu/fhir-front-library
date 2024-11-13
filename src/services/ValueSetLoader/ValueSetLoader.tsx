//FHIR
import Client from "fhir-kit-client";
import { Bundle, CodeableConcept, ValueSet } from "fhir/r5";

////////////////////////////
//        Props           //
////////////////////////////

export interface SimpleCode {
    system: string,
    code: string,
    display?: string,
    property?: SimpleCodeProperty,
};

export interface SimpleCodeProperty {
    code: string,
    valueString: string
};

////////////////////////////
//        Class           //
////////////////////////////

export class ValueSetLoader {

    fhirClient: Client;

    constructor(fhirClient: Client) {
        this.fhirClient = fhirClient;
    }

    /**
     * Function to search a ValueSet by its URL
     * @param valueSetUrl URL of the ValueSet to search
     */
    async searchValueSet(valueSetUrl: String): Promise<SimpleCode[]> {
        var searchParams: {} = { "_elements": "compose,expansion", "url": valueSetUrl };
        return this.fhirClient.search({
            resourceType: 'ValueSet',
            searchParams: searchParams,
        }).then(response => {
            if (response.resourceType !== 'Bundle') {
                throw Error(response.statusText);
            }
            const bundle: Bundle = response as Bundle;
            if ((bundle.total && bundle.total !== 1)) {
                throw Error("Precisely one ValueSet shall be returned !");
            }
            const valueSet: ValueSet | null = bundle.entry ? bundle.entry[0].resource as ValueSet : null;
            if (!valueSet) {
                throw Error("Returned ValueSet is null !");
            }
            if (valueSet.expansion?.contains) {
                return valueSet.expansion.contains.map(contained => {
                    return { "system": contained.system, "code": contained.code, "display": contained.display, "property": contained.property ? { "code": contained.property[0].code, "valueString": contained.property[0].valueString } : undefined } as SimpleCode;
                });
            } else if (valueSet.compose?.include) {
                return valueSet.compose.include.flatMap(include => include.concept?.map(concept => ({
                    "system": include.system ?? '',
                    "code": concept.code ?? '',
                    "display": concept.display ?? '',
                })) ?? []);
            } else {
                return [];
            }
        });
    }

    /**
     * Function to convert a SimpleCode to a CodeableConcept
     * @param code SimpleCode to convert
     */
    toCodeableConcept(code: SimpleCode): CodeableConcept {
        return {
            "coding": [
                {
                    "system": code.system,
                    "code": code.code,
                    "display": code.display,
                }
            ]
        };
    }
}

export default ValueSetLoader;