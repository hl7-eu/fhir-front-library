export type ErrorKind =
    | "cors"
    | "network"
    | "unauthorized"
    | "forbidden"
    | "not-found"
    | "server"
    | "generic";

export interface ErrorDetails {
    kind: ErrorKind;
    status?: number;
    message?: string;
    technicalDetails?: string;
}

type ErrorResponse = {
    data?: unknown;
    status?: unknown;
};

type ErrorLike = {
    code?: unknown;
    data?: unknown;
    message?: unknown;
    name?: unknown;
    request?: unknown;
    response?: ErrorResponse;
    status?: unknown;
    technicalDetails?: unknown;
};

type FhirIssue = {
    details?: { text?: unknown };
    diagnostics?: unknown;
};

const REDACTED = "[redacted]";
const MAX_MESSAGE_LENGTH = 500;

function toSafeText(value: unknown): string | undefined {
    if (typeof value !== "string" || !value.trim()) {
        return undefined;
    }

    return value
        .trim()
        .replace(/\bBearer\s+[\w\-._~+/]+=*/gi, `Bearer ${REDACTED}`)
        .replace(/https?:\/\/[^\s"']+/gi, REDACTED)
        .replace(/\b(token|authorization)\s*[:=]\s*[^\s,;]+/gi, `$1: ${REDACTED}`)
        .slice(0, MAX_MESSAGE_LENGTH);
}

function getStatus(value: unknown): number | undefined {
    return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

function getOperationOutcomeMessage(data: unknown): string | undefined {
    if (!data || typeof data !== "object") {
        return undefined;
    }

    const outcome = data as { resourceType?: unknown; issue?: unknown };
    if (outcome.resourceType !== "OperationOutcome" || !Array.isArray(outcome.issue)) {
        return undefined;
    }

    const issue = outcome.issue[0] as FhirIssue | undefined;
    return toSafeText(issue?.details?.text) ?? toSafeText(issue?.diagnostics);
}

function isCorsError(error: ErrorLike): boolean {
    const diagnostic = [error.name, error.message]
        .filter((value): value is string => typeof value === "string")
        .join(" ");

    return /\bcors\b|cross[\s-]?origin|access-control-allow-origin/i.test(diagnostic);
}

function getKind(
    status: number | undefined,
    code: unknown,
    hasRequest: boolean,
    isCors: boolean
): ErrorKind {
    if (status === 401) return "unauthorized";
    if (status === 403) return "forbidden";
    if (status === 404) return "not-found";
    if (status !== undefined && status >= 500) return "server";
    if (isCors) return "cors";
    if (code === "ERR_NETWORK" || code === "ECONNABORTED" || hasRequest) return "network";
    return "generic";
}

/**
 * Normalizes Axios, fhir-kit-client, network and JavaScript errors without
 * retaining headers, tokens, request URLs or complete response bodies.
 */
export function getErrorDetails(error?: unknown): ErrorDetails {
    if (!error || typeof error !== "object") {
        const message = toSafeText(error);
        return { kind: "generic", ...(message ? { message } : {}) };
    }

    const candidate = error as ErrorLike;
    const status = getStatus(candidate.response?.status) ?? getStatus(candidate.status);
    const operationOutcomeMessage = getOperationOutcomeMessage(
        candidate.response?.data ?? candidate.data
    );
    const message = operationOutcomeMessage
        ?? toSafeText(candidate.message)
        ?? toSafeText(candidate.technicalDetails);

    return {
        kind: getKind(status, candidate.code, Boolean(candidate.request), isCorsError(candidate)),
        ...(status !== undefined ? { status } : {}),
        ...(message ? { message } : {}),
        ...(operationOutcomeMessage ? { technicalDetails: operationOutcomeMessage } : {}),
    };
}
