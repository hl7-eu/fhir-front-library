//Component
import StatusFlavor from "./StatusFlavor";

// Conversion of Fhir statuses into understandable statuses for the StatusTag and StatusIcon components.
enum FhirStatus {
    // Success statuses
    pass = StatusFlavor.success,
    successful = StatusFlavor.success,
    OK = StatusFlavor.success,
    created = StatusFlavor.success,
    accepted = StatusFlavor.success,
    nonAuthoritativeInformation = StatusFlavor.success,
    noContent = StatusFlavor.success,
    resetContent = StatusFlavor.success,
    partialContent = StatusFlavor.success,
    okay = StatusFlavor.success,
    active = StatusFlavor.success,
    completed = StatusFlavor.success,
    final = StatusFlavor.success,
    available = StatusFlavor.success,

    // Suspended status
    pending = StatusFlavor.suspended,
    'in-progress' = StatusFlavor.suspended,
    waiting = StatusFlavor.suspended,
    preliminary = StatusFlavor.suspended,
    underMaintenance = StatusFlavor.suspended,

    // Error statuses
    fail = StatusFlavor.error,
    error = StatusFlavor.error,
    fatal = StatusFlavor.error,
    failed = StatusFlavor.error,
    unknown = StatusFlavor.error,
    internalServorError = StatusFlavor.error,
    badGateway = StatusFlavor.error,
    serviceUnavailable = StatusFlavor.error,
    badRequest = StatusFlavor.error,
    unauthorized = StatusFlavor.error,
    paymentRequired = StatusFlavor.error,
    forbidden = StatusFlavor.error,
    notFound = StatusFlavor.error,
    methodNotAllowed = StatusFlavor.error,
    notAcceptable = StatusFlavor.error,
    proxyAuthenticationRequired = StatusFlavor.error,
    requestTimeout = StatusFlavor.error,
    conflict = StatusFlavor.error,
    gone = StatusFlavor.error,
    lengthRequired = StatusFlavor.error,
    preconditionFailed = StatusFlavor.error,
    contentTooLarge = StatusFlavor.error,
    uriTooLong = StatusFlavor.error,
    unsupportedMediaType = StatusFlavor.error,
    rangeNotSatisfiable = StatusFlavor.error,
    expectationFailed = StatusFlavor.error,
    misdirectedRequest = StatusFlavor.error,
    unprocessableContent = StatusFlavor.error,
    upgradeRequired = StatusFlavor.error,
    httpVersionNotSupported = StatusFlavor.error,
    retired = StatusFlavor.error,
    stopped = StatusFlavor.error,
    'entered-in-error' = StatusFlavor.error,
    obsolete = StatusFlavor.error,

    // suspended statuses
    warning = StatusFlavor.suspended,
    notImplemented = StatusFlavor.suspended,
    gatewayTimeout = StatusFlavor.suspended,
    networkTimeout = StatusFlavor.suspended,
    draft = StatusFlavor.suspended,
    partial = StatusFlavor.suspended,

    // Information statuses
    unknownResponse = StatusFlavor.info,
    continue = StatusFlavor.info,
    switchingProtocols = StatusFlavor.info,
    multipleChoices = StatusFlavor.info,
    movedPermanently = StatusFlavor.info,
    found = StatusFlavor.info,
    seeOther = StatusFlavor.info,
    notModified = StatusFlavor.info,
    useProxy = StatusFlavor.info,
    temporaryRedirect = StatusFlavor.info,
    permanentRedirect = StatusFlavor.info,
    information = StatusFlavor.info,
    registered = StatusFlavor.info,
    skip = StatusFlavor.info,
    underDevelopment = StatusFlavor.info
}

export default FhirStatus;