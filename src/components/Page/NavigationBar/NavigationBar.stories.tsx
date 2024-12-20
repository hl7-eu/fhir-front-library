// StoryBook
import { Meta, StoryObj } from "@storybook/react";
import { useArgs } from '@storybook/client-api';
// Component
import NavigationBar from "./NavigationBar";
// React
import React from "react";

// Used to define the story title in the storybook
const meta: Meta = {
    title: "Components/Page/NavigationBar",
    component: NavigationBar,
};

// Export the storybook meta so StoryBook knows about the stories defined here
export default meta;

// Define the Templates to be used for each story
const TemplateWithApplication: StoryObj = {
    render: () => <NavigationBar
        applicationItems={[
            {
                logoLink: 'https://integ.fyrstain.com/assets/ApplicationsLogos/Pandora.png',
                link: 'https://integ.fyrstain.com/Pandora/Home',
                alt: 'Pandora logo'
            },
            {
                logoLink: 'https://sandbox.hl7europe.eu/questionnaire/assets/HL7-EU-Logo.jpg',
                link: 'https://hl7.eu/',
                alt: 'HL7EU Logo'
            },
            {
                logoLink: 'https://integ.fyrstain.com/assets/ApplicationsLogos/Jupiter.png',
                // No link = disabled
                alt: 'Disabled'
            },
        ]}
        logoLink="https://integ.fyrstain.com/assets/pandoraLogoHoriz.svg"
        alt="LOGO"
        menuItems={[
            {
                title: 'Menu with children',
                subItems: [
                    {
                        title: 'Child 1',
                        link: '#',
                    },
                    {
                        title: 'Child 2',
                        link: '#',                    },
                    {
                        title: 'Child 3',
                        link: '#',
                    },
                ]
            },
            {
                title: 'Simple Menu',
                link: '#',
            }
        ]}
        dropDownItems={[
            {
                title: 'Admin'
            }
        ]}
    />,
};

const TemplateNoApplication: StoryObj = {
    render: () => <NavigationBar
        logoLink="https://integ.fyrstain.com/assets/pandoraLogoHoriz.svg"
        alt="LOGO"
        menuItems={[
            {
                title: 'Menu with children',
                subItems: [
                    {
                        title: 'Child 1',
                        link: '#',
                    },
                    {
                        title: 'Child 2',
                        link: '#',
                    },
                    {
                        title: 'Child 3',
                        link: '#',
                    },
                ]
            },
            {
                title: 'Simple Menu',
                link: '#',
            }
        ]}
        dropDownItems={[
            {
                title: 'Admin'
            }
        ]}
    />,
};

var login: string | undefined = undefined;
var key: number = 0;

const TemplateWithLogin: StoryObj = {
    render: (args) => {
        const [,setArgs] = useArgs();
        return <NavigationBar
            logoLink="https://integ.fyrstain.com/assets/pandoraLogoHoriz.svg"
            alt="LOGO"
            menuItems={[
                {
                    title: 'Menu with children',
                    subItems: [
                        {
                            title: 'Child 1',
                            link: '#',
                        },
                        {
                            title: 'Child 2',
                            link: '#',
                        },
                        {
                            title: 'Child 3',
                            link: '#',
                        },
                    ]
                },
                {
                    title: 'Simple Menu',
                    link: '#',
                }
            ]}
            dropDownItems={[
                {
                    title: 'Admin'
                }
            ]}
            authentication={
                {
                    isAuthenticated: () => { return login !== undefined },
                    doLogin: () => { return new Promise(() => { login = "UserName"; setArgs({...args, reload: key++}) }) },
                    doLogout: () => { return new Promise(() => { login = undefined; setArgs({...args, reload: key++}) }) },
                    getUserName: () => { return login }
                }
            }
        />
    },
};


// Define the stories
export const NavigationBarWithApplications: StoryObj = {
    ...TemplateWithApplication,
};

export const NavigationBarNoApplications: StoryObj = {
    ...TemplateNoApplication,
};

export const NavigationBarWithAuthentication: StoryObj = {
    ...TemplateWithLogin,
};