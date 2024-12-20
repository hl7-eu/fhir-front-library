//React
import React from "react";
//Testing
import { render } from "@testing-library/react";
//Component
import NavigationBar from "./NavigationBar";

describe("NavigationBar", () => {
    test("renders the NavigationBar component", () => {
        render(<NavigationBar
            logoLink="logoLink"
            alt="alt"
            menuItems={[
                {
                    title: "title",
                    link: "/Home",
                    subItems: [
                        {
                            title: "title",
                            link: "/Home"
                        }
                    ],
                }
            ]}
            dropDownItems={[
                {
                    title: "title",
                    link: "/Page"
                }
            ]}
            authentication={{
                doLogin: () => Promise.resolve(),
                doLogout: () => Promise.resolve(),
                isAuthenticated: () => true,
                getUserName: () => "username"
            }}
        />
        );
    });
});