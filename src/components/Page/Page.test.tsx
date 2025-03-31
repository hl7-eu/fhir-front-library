//React
import React from "react";
//Testing
import { render } from "@testing-library/react";
//Component
import Page from "./Page";

describe("Page", () => {
    test("renders the Page component", () => {
        render(
            <Page
                navigationBarConfigs={{
                    logoLink: '/assets/pandoraLogoHoriz.svg',
                    alt: 'Pandora Logo',
                    authentication: {
                        doLogin: jest.fn(),
                        doLogout: jest.fn(),
                        isAuthenticated: () => true,
                        getUserName: () => 'mockUser',
                    },
                    menuItems: [],
                    dropDownItems: [],
                }}
                titleKey='mockTitle'
                loading={false}
                children={<div>Mock Child</div>}
                needsLogin={false}
                footerConfigs={{
                    languages: {
                        default: 'en',
                        onChange: jest.fn(),
                        options: [
                            {
                                label: "English",
                                value: "en"
                            },
                            {
                                label: "Français",
                                value: "fr"
                            }
                        ]
                    },
                    logo: [
                        {
                            logoLink: "https://fyrstain.com/wp-content/uploads/2022/10/Logo_fyrstain_horyzontal.svg",
                            alt: "Horizontal logo type",
                            link: "/Home"
                        }
                    ],
                    items: [
                        {
                            label: 'About',
                            link: "/"
                        },
                        {
                            label: 'Contact',
                            link: "/"
                        },
                        {
                            label: 'Problem Tracking',
                            link: "/"
                        }
                    ]
                }}
            />
        );
    });
});