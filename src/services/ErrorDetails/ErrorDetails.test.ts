import { getErrorDetails } from "./ErrorDetails";

describe("getErrorDetails", () => {
    test("extracts the first FHIR OperationOutcome message", () => {
        expect(
            getErrorDetails({
                response: {
                    status: 403,
                    data: {
                        resourceType: "OperationOutcome",
                        issue: [{ details: { text: "Access denied" } }],
                    },
                },
            })
        ).toEqual({
            kind: "forbidden",
            status: 403,
            message: "Access denied",
            technicalDetails: "Access denied",
        });
    });

    test("never retains a URL or bearer token", () => {
        const details = getErrorDetails({
            code: "ERR_NETWORK",
            message: "Request to https://fhir.example.test failed with Bearer secret-token",
        });

        expect(details.kind).toBe("network");
        expect(details.message).toContain("[redacted]");
        expect(details.message).not.toContain("fhir.example.test");
        expect(details.message).not.toContain("secret-token");
    });

    test("classifies explicit browser CORS errors separately from network errors", () => {
        expect(getErrorDetails({
            name: "TypeError",
            message: "CORS request did not succeed",
        })).toMatchObject({
            kind: "cors",
            message: "CORS request did not succeed",
        });
    });
});
