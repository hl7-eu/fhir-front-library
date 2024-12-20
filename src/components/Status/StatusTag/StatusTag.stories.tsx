// StoryBook
import { Meta, StoryObj } from "@storybook/react";
// Component
import StatusTag, { StatusTagProps } from './StatusTag';
// React
import React from "react";

// Used to define the story title in the storybook
interface StoryMeta extends Meta {
    component: React.FC<StatusTagProps>;
    title: string;
}

// Define the storybook meta
const meta: StoryMeta = {
    title: 'Components/Status/StatusTag',
    component: StatusTag,
};

// Export the storybook meta so StoryBook knows about the stories defined here
export default meta;

// Define the Template to be used for each story
const Template: StoryObj<StatusTagProps> = {
    render: (args) => <StatusTag {...args} />,
};

// Define the stories for each level
export const SuccessTag: StoryObj<StatusTagProps> = {
    ...Template,
    args: {
        message: "Success",
        flavor: 'success'
    },
};

export const InfoTag: StoryObj<StatusTagProps> = {
    ...Template,
    args: {
        message: "Info",
        flavor: 'info'
    },
};

export const ErrorTag: StoryObj<StatusTagProps> = {
    ...Template,
    args: {
        message: "error",
        flavor: 'error'
    },
};

export const WarningTag: StoryObj<StatusTagProps> = {
    ...Template,
    args: {
        message: "warning",
        flavor: 'warning'
    },
};

export const SuspendedTag: StoryObj<StatusTagProps> = {
    ...Template,
    args: {
        message: "Suspended",
        flavor: 'suspended'
    },
};

export const UnknownTag: StoryObj<StatusTagProps> = {
    ...Template,
    args: {
        message: "unknown",
        flavor: 'unknown'
    },
};
