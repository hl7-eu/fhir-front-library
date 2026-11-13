import React, { ReactNode } from "react";
import "./StatusPage.css";

export interface StatusPageProps {
    children: ReactNode;
    className?: string;
    illustration?: ReactNode;
    variant?: "error" | "in-progress";
}

/**
 * Responsive status-page layout to place inside an application's Page/Main.
 * It deliberately does not render a footer or use a router.
 */
export const StatusPage = ({ children, className, illustration, variant }: StatusPageProps) => (
    <main
        className={[
            "hl7-status-page",
            variant && `hl7-status-page--${variant}`,
            className,
        ].filter(Boolean).join(" ")}
    >
        {illustration && <div className="hl7-status-page__illustration">{illustration}</div>}
        <section className="hl7-status-page__content">{children}</section>
    </main>
);
