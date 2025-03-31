//React
import React from "react";
//Testing
import { render } from "@testing-library/react";
//Component
import ApplicationsMenu from "./ApplicationsMenu";

describe("ApplicationsMenu", () => {
    test("renders the ApplicationsMenu component", () => {
        render(<ApplicationsMenu items={[{
            link: "https://fyrstain.com/wp-content/uploads/2022/10/Logo_fyrstain_horyzontal.svg",
            logoLink: "/",
            alt: "Fyrstain logo"
        }]} />
        );
    });
});