//React
import React from "react";
//Testing
import { render } from "@testing-library/react";
//Component
import Title from "./Title";

describe("Title", () => {
    test("renders the Title component", () => {
        render(<Title level={1} prefix={'Pandora'} content={'testplatform'} />
        );
    });
});