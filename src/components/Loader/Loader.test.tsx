//React
import React from "react";
//Testing
import { render } from "@testing-library/react";
//Component
import Loader from "./Loader";

describe("Loader", () => {
    test("renders the Loader component", () => {
        render(<Loader />
        );
    });
});