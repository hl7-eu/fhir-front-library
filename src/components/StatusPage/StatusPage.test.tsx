import React from "react";
import { render, screen } from "@testing-library/react";
import { ErrorPage } from "./ErrorPage";
import { InProgressPage } from "./InProgressPage";

describe("Status pages", () => {
    test("renders safe error details and a public home link", () => {
        render(
            <ErrorPage
                description="The service is unavailable."
                detailsLabel="Details"
                error={{
                    kind: "server",
                    status: 503,
                    message: "Request to https://fhir.example.test failed with Bearer secret-token",
                }}
                homeHref="/app/Home"
                homeLabel="Back to home"
                heading={<h1>Oops</h1>}
            />
        );

        expect(screen.getByText("HTTP status: 503")).not.toBeNull();
        expect(screen.getByRole("alert").textContent).toBe("The service is unavailable.");
        expect(screen.getByText(/\[redacted\]/)).not.toBeNull();
        expect(screen.queryByText(/fhir\.example\.test/)).toBeNull();
        expect(screen.getByRole("link", { name: "Back to home" }).getAttribute("href"))
            .toBe("/app/Home");
        expect(screen.getByRole("link", { name: "Back to home" }).className).toContain("btn-primary");
    });

    test("renders the in-progress page responsively within the shared layout", () => {
        render(<InProgressPage title="Work in progress" />);

        expect(screen.getByRole("heading", { name: "Work in progress" })).not.toBeNull();
    });
});
