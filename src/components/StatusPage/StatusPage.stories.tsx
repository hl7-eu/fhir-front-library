import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { ErrorPage } from "./ErrorPage";
import { InProgressPage, InProgressPageProps } from "./InProgressPage";

const Illustration = ({ symbol }: { symbol: string }) => (
    <div
        aria-label="Status illustration"
        role="img"
        style={{
            alignItems: "center",
            background: "#f7f6f7",
            borderRadius: "50%",
            color: "#007f5c",
            display: "flex",
            fontSize: "8rem",
            height: "14rem",
            justifyContent: "center",
            width: "14rem",
        }}
    >
        {symbol}
    </div>
);

const meta: Meta<typeof ErrorPage> = {
    title: "Components/StatusPage/ErrorPage",
    component: ErrorPage,
};

export default meta;

export const ErrorWithOperationOutcome: StoryObj<typeof ErrorPage> = {
    args: {
        title: "Oops! An error occurred.",
        detailsLabel: "Technical details",
        homeHref: "/Home",
        homeLabel: "Back to home",
        illustration: <Illustration symbol="!" />,
        error: {
            kind: "forbidden",
            status: 403,
            message: "You do not have permission to access this resource.",
        },
    },
};

export const ErrorWithCors: StoryObj<typeof ErrorPage> = {
    args: {
        title: "Oops! A cross-origin request was blocked.",
        detailsLabel: "Technical details",
        homeHref: "/Home",
        homeLabel: "Back to home",
        illustration: <Illustration symbol="!" />,
        error: {
            kind: "cors",
            message: "CORS request did not succeed",
        },
    },
};

export const InProgress: StoryObj<InProgressPageProps> = {
    render: () => (
        <InProgressPage
            description="This feature will be available soon."
            illustration={<Illustration symbol="…" />}
            title="Work in progress"
        />
    ),
};
