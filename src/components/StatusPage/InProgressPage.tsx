import React, { ReactNode } from "react";
import { StatusPage } from "./StatusPage";

export interface InProgressPageProps {
    className?: string;
    description?: ReactNode;
    heading?: ReactNode;
    illustration?: ReactNode;
    title?: ReactNode;
}

/** Presentational In Progress page content. Compose it in the host app's Page. */
export const InProgressPage = ({ className, description, heading, illustration, title }: InProgressPageProps) => (
    <StatusPage className={className} illustration={illustration} variant="in-progress">
        {heading ?? (title && <h1 className="hl7-status-page__title">{title}</h1>)}
        {description && <p className="hl7-status-page__description">{description}</p>}
    </StatusPage>
);
