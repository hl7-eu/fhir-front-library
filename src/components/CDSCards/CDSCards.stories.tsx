// Component
import CDSCards from "./CDSCards";
// Storybook
import type { Meta, StoryObj } from "@storybook/react";

export default {
    title: "Components/CDSCards",
    component: CDSCards,
} as Meta<typeof CDSCards>;

const sampleCards = {
    cards: [
        {
            indicator: "critical",
            summary: "Critical alert: Immediate action required",
            detail: "Patient has a severe allergy to penicillin.",
            source: {
                url: "https://example.com/source1",
                label: "Allergy Database",
            },
            suggestions: [
                {
                    uuid: "sug-1",
                    label: "Prescribe alternative antibiotic",
                    actions: [
                        { description: "Order cephalosporin instead of penicillin." },
                    ],
                },
            ],
            links: [
                {
                    url: "https://example.com/info1",
                    label: "More Info",
                },
            ],
            uuid: "card-1",
        },
        {
            indicator: "warning",
            summary: "Warning: Elevated blood pressure",
            detail: "Recent readings indicate hypertension.",
            source: {
                url: "https://example.com/source2",
                label: "Vitals Monitor",
            },
            suggestions: [
                {
                    label: "Schedule follow-up appointment",
                },
            ],
            links: [
                {
                    url: "https://example.com/info2",
                    label: "Guidelines",
                },
            ],
            uuid: "card-2",
        },
        {
            indicator: "info",
            summary: "Information: Annual checkup due",
            detail: "Patient is due for their annual physical examination.",
            source: {
                url: "https://example.com/source3",
                label: "Health Records",
            },
            uuid: "card-3",
        },
    ],
};

type Story = StoryObj<typeof CDSCards>;

export const Default: Story = {
    args: sampleCards,
};

export const Empty: Story = {
    args: { cards: [] },
};