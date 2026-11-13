import React, { ReactNode } from "react";
import { ErrorDetails, getErrorDetails } from "../../services/ErrorDetails";
import { StatusPage } from "./StatusPage";

export interface ErrorPageProps {
    className?: string;
    description?: ReactNode;
    detailsLabel?: ReactNode;
    error?: ErrorDetails;
    genericMessage?: ReactNode;
    heading?: ReactNode;
    homeHref?: string;
    homeLinkClassName?: string;
    homeLabel?: ReactNode;
    httpStatusLabel?: (status: number) => ReactNode;
    illustration?: ReactNode;
    title?: ReactNode;
}

/**
 * Displays only safe, normalized error information. Use getErrorDetails before
 * navigating, or pass an ErrorDetails object directly; it is normalized again
 * before rendering as a defence in depth measure.
 */
export const ErrorPage = ({
    className,
    description,
    detailsLabel = "Technical details",
    error,
    genericMessage = "An unexpected error occurred.",
    heading,
    homeHref,
    homeLinkClassName,
    homeLabel,
    httpStatusLabel = (status) => `HTTP status: ${status}`,
    illustration,
    title,
}: ErrorPageProps) => {
    const details = error ? getErrorDetails(error) : undefined;
    const message = details?.message ?? genericMessage;
    const hasDetails = details?.status !== undefined || Boolean(details?.message);

    return (
        <StatusPage className={className} illustration={illustration} variant="error">
            {heading ?? (title && <h1 className="hl7-status-page__title">{title}</h1>)}
            {description && <p className="hl7-status-page__reason" role="alert">{description}</p>}
            {hasDetails && (
                <details className="hl7-status-page__details">
                    <summary>{detailsLabel}</summary>
                    {details?.status !== undefined && <p>{httpStatusLabel(details.status)}</p>}
                    <p>{message}</p>
                </details>
            )}
            {homeHref && homeLabel && (
                <a
                    className={[
                        "btn",
                        "btn-primary",
                        "hl7-status-page__home-link",
                        homeLinkClassName,
                    ].filter(Boolean).join(" ")}
                    href={homeHref}
                >
                    {homeLabel}
                </a>
            )}
        </StatusPage>
    );
};
