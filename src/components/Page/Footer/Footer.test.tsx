//React
import React from "react";
//Testing
import { render } from "@testing-library/react";
//Components
import Footer from "./Footer";

describe("Footer", () => {
    test("renders the Footer component", () => {
        render(<Footer
            languages={{
                default: "EN",
                onChange: () => { },
                options: [
                    {
                        label: "EN",
                        value: "EN"
                    },
                    {
                        label: "FR",
                        value: "FR"
                    }
                ]
            }}
            logo={[
                {
                    link: "/",
                    logoLink: "",
                    alt: "Logo"
                }
            ]}
            items={[
                {
                    label: "Home",
                    link: "/"
                }
            ]}
        />);
    });
});