//React
import React from "react";
//Testing
import { render } from "@testing-library/react";
//Components
import StatusAlert from "./StatusAlert";
import FhirStatus from "../FhirStatus";

describe("StatusAlert", () => {
    test("renders the StatusAlert component", () => {
        render(<StatusAlert flavor={FhirStatus.OK} />);
    });
});