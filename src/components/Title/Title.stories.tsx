// StoryBook
import { Meta, StoryObj } from "@storybook/react";
// Component
import Title, { TitleProps } from "./Title";
// React
import React from "react";

// Used to define the story title in the storybook
interface StoryMeta extends Meta {
    component: React.FC<TitleProps>;
    title: string;
}

// Define the storybook meta
const meta: StoryMeta = {
    title: 'Components/Title',
    component: Title,
};

// Export the storybook meta so StoryBook knows about the stories defined here
export default meta;

// Define the type of levelClassName
type levelClassName = {
    [key: number]: string;
};

// Define the CSS class to be used for each level
const levelClassName: levelClassName = {
    1: "title1",
    2: "title2",
    3: "title3",
    4: "title4",
    5: "title5"
};

// Define the Template to be used for each story
const Template: StoryObj<TitleProps> = {
    render: (args) => <Title {...args} />,
};

// Define the stories for each level
export const Level1: StoryObj<TitleProps> = {
    ...Template,
    args: {
        level: 1,
        prefix: "Prefix",
        content: "Title",
        contentClassname: "content",
        prefixClassname: "prefix",
    },
};

export const Level2: StoryObj<TitleProps> = {
    ...Template,
    args: {
        level: 2,
        prefix: "Prefix",
        content: "Title",
        contentClassname: "content",
        prefixClassname: "prefix",
    },
};

export const Level3: StoryObj<TitleProps> = {
    ...Template,
    args: {
        level: 3,
        prefix: "Prefix",
        content: "Title",
        contentClassname: "content",
        prefixClassname: "prefix",
    },
};

export const Level4: StoryObj<TitleProps> = {
    ...Template,
    args: {
        level: 4,
        prefix: "Prefix",
        content: "Title",
        contentClassname: "content",
        prefixClassname: "prefix",
    },
};

export const Level5: StoryObj<TitleProps> = {
    ...Template,
    args: {
        level: 5,
        prefix: "Prefix",
        content: "Title",
        contentClassname: "content",
        prefixClassname: "prefix",
    },
};
