// FHIR
import Client from "fhir-kit-client";
// Component
import { ValueSetLoader } from "./ValueSetLoader";

describe("ValueSetLoader", () => {
    let fhirClient: Client;
    let valueSetLoader: ValueSetLoader;

    beforeEach(() => {
        fhirClient = new Client({ baseUrl: 'http://example.com' });
        valueSetLoader = new ValueSetLoader(fhirClient);
    });

    test("searchValuSet makes a search request to the FHIR server", async () => {
        const searchSpy = jest.spyOn(fhirClient, 'search').mockResolvedValue({
            resourceType: 'Bundle',
            total: 1,
            entry: [
                {
                    resource: {
                        resourceType: 'ValueSet',
                        expansion: {
                            contains: [
                                { system: 'http://example.com', code: 'example', display: 'Example' }
                            ]
                        }
                    }
                }
            ]
        });

        const result = await valueSetLoader.searchValueSet('http://example.com/valueset');

        expect(searchSpy).toHaveBeenCalledWith({
            resourceType: 'ValueSet',
            searchParams: { "_elements": "compose,expansion", "url": 'http://example.com/valueset' },
        });
        expect(result).toEqual([
            { system: 'http://example.com', code: 'example', display: 'Example' }
        ]);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });
});