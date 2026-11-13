// React
import React from "react";
// Testing Library
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
// Component
import { CDSCards } from "./CDSCards";

// Mock FontAwesomeIcon pour les tests
jest.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: (props: any) => <span data-testid={props.title || "icon"} />
}));

describe("CDSCards component", () => {
  test("renders message when no cards are provided", () => {
    render(<CDSCards cards={[]} />);
    expect(screen.getByText(/No cards to display/i)).toBeInTheDocument();
  });

  test("renders a list of cards", () => {
    const cards = [
      { summary: "Card 1", detail: "Detail 1", indicator: "info" },
      { summary: "Card 2", indicator: "warning", detail: "Detail 2" },
    ];

    render(<CDSCards cards={cards} />);

    expect(screen.getByText("Card 1")).toBeInTheDocument();
    expect(screen.getByText("Card 2")).toBeInTheDocument();
    expect(screen.getByText("Detail 1")).toBeInTheDocument();
    expect(screen.getByText("Detail 2")).toBeInTheDocument();
  });

  test("renders critical indicator icon", () => {
    const cards = [{ summary: "Critical card", indicator: "critical" }];
    render(<CDSCards cards={cards} />);
    expect(screen.getByTestId("Critical alert")).toBeInTheDocument();
  });

  test("renders warning indicator icon", () => {
    const cards = [{ summary: "Warning card", indicator: "warning" }];
    render(<CDSCards cards={cards} />);
    expect(screen.getByTestId("Warning")).toBeInTheDocument();
  });

  test("renders info indicator icon by default", () => {
    const cards = [{ summary: "Info card", indicator: "info" }];
    render(<CDSCards cards={cards} />);
    expect(screen.getByTestId("Information")).toBeInTheDocument();
  });

  test("renders source link correctly", () => {
    const cards = [
      {
        summary: "Card with source",
        indicator: "info",
        source: { url: "https://example.com", label: "Example Source" },
      },
    ];
    render(<CDSCards cards={cards} />);
    const link = screen.getByRole("link", { name: /Example Source/i });
    expect(link).toHaveAttribute("href", "https://example.com");
  });

  test("renders suggestions and nested actions", () => {
    const cards = [
      {
        summary: "Card with suggestions",
        indicator: "info",
        suggestions: [
          {
            label: "Try something",
            actions: [{ description: "Do this" }, { description: "Do that" }],
          },
        ],
      },
    ];

    render(<CDSCards cards={cards} />);

    expect(screen.getByText("Suggestions:")).toBeInTheDocument();
    expect(screen.getByText("Try something")).toBeInTheDocument();
    expect(screen.getByText("Do this")).toBeInTheDocument();
    expect(screen.getByText("Do that")).toBeInTheDocument();
  });

  test("renders links correctly", () => {
    const cards = [
      {
        summary: "Card with links",
        indicator: "info",
        links: [
          { url: "https://example1.com", label: "Link 1" },
          { url: "https://example2.com", label: "Link 2" },
        ],
      },
    ];

    render(<CDSCards cards={cards} />);

    expect(screen.getByRole("link", { name: /Link 1/i })).toHaveAttribute("href", "https://example1.com");
    expect(screen.getByRole("link", { name: /Link 2/i })).toHaveAttribute("href", "https://example2.com");
  });
});
