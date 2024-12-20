// StoryBook
import { Meta, StoryObj } from "@storybook/react";
// Component
import StatusAlert, { StatusAlertProps } from './StatusAlert';
// React
import React from "react";

// Used to define the story title in the storybook
interface StoryMeta extends Meta {
    component: React.FC<StatusAlertProps>;
    title: string;
}

// Define the storybook meta
const meta: StoryMeta = {
    title: 'Components/Status/StatusAlert',
    component: StatusAlert,
};

// Export the storybook meta so StoryBook knows about the stories defined here
export default meta;

// Define the Template to be used for each story
const Template: StoryObj<StatusAlertProps> = {
    render: (args) => <StatusAlert {...args}>This is a totally real alert.</StatusAlert>,
};

// Define the stories for each level
export const SuccessAlert: StoryObj<StatusAlertProps> = {
    ...Template,
    args: {
        flavor: 'success'
    },
};

export const InfoAlert: StoryObj<StatusAlertProps> = {
    ...Template,
    args: {
        flavor: 'info'
    },
};

export const ErrorAlert: StoryObj<StatusAlertProps> = {
    ...Template,
    args: {
        flavor: 'error'
    },
};

export const WarningAlert: StoryObj<StatusAlertProps> = {
    ...Template,
    args: {
        flavor: 'warning'
    },
};

export const SuspendedAlert: StoryObj<StatusAlertProps> = {
    ...Template,
    args: {
        flavor: 'suspended'
    },
};

export const UnknownAlert: StoryObj<StatusAlertProps> = {
    ...Template,
    args: {
        flavor: 'unknown'
    },
};
