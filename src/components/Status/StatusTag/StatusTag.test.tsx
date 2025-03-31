//React
import React from "react";
//Testing
import { render } from "@testing-library/react";
//Components
import StatusTag from "./StatusTag";
import FhirStatus from "../StatusFlavor";

describe("StatusTag", () => {
    test("renders the StatusTag component", () => {
        render(<StatusTag flavor={FhirStatus.success} message="OK" />);
    });
});