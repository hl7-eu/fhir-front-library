//React
import React from "react";
//Testing
import { render } from "@testing-library/react";
//Component
import Main from "./Main";

describe("Main", () => {
    test("renders the Main component", () => {
        render(
            <Main
                loading={true}
            />
        );
    });
});