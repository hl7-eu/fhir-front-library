# Agent instructions for hl7-front-library

This repository is a shared frontend library. Keep public APIs and existing user journeys stable.

## Before changing code

- Read the affected component or service, its network calls, and nearby tests.
- Keep API, authentication, and browser effects behind testable boundaries when changing them.
- Use this repository's routes and selectors; do not copy tests from another application.

## Verification

- Run deterministic tests with `npm run test:ci`.
- Build with `npm run build`.
- For new behavior, test observable outcomes, a meaningful failure, and loading or empty states when present.
- Use controlled data and network responses. CI tests must not require a live FHIR or Keycloak server.
- Do not use `--passWithNoTests` or add tests that only check whether a component mounts.

## Test placement

- Keep unit and component tests near the code under `src/`.
- Update tests and documentation in the same change as the behavior.
