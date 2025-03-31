//React
import React from "react";
//Testing
import { render } from "@testing-library/react";
//Components
import StatusIcon from "./StatusIcon";
import FhirStatus from "../../FhirStatus";

describe("StatusIcon", () => {
    test("renders the StatusIcon component", () => {
        render(<StatusIcon flavor={FhirStatus.OK} />);
    });
});