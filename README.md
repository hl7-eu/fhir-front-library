# hl7-front-library

  Note: Please ensure you have installed <code><a href="https://nodejs.org/en/download/">node js</a></code>

## Run the project on your device:

  1) Open project folder in <a href="https://code.visualstudio.com/download">Visual Studio Code</a>
  2) In the terminal, run `npm install` to install dependencies
  3) Run `npm run build` to build the project when you add a component

## Publish when you create or modify a component

  1) In the package.json file, increment the library version
  2) Run `npm run build` to build the project when you add a component
  3) Merge the change into `feature` to publish a snapshot through GitHub Actions. See the release process below for stable versions.

## StoryBook

 1) Run `npm run storybook` to display the StoryBook preview in the localhost

## Version management

TBD

## GitHub Actions releases

The workflows in `.github/workflows` run directly in this repository without calling the separate `github-workflows` repository. Pull requests run lint (when configured), deterministic tests, and a build. Every push to `feature` publishes a unique snapshot to Nexus, using the version from `package.json` plus the Actions run number and attempt (for example, `1.0.1-SNAPSHOT.123.1`). The checked-in version stays `X.Y.Z-SNAPSHOT`.

To release, run **Prepare release** from the `feature` branch with `release_version` (for example, `1.0.1`) and `next_version` (for example, `1.0.2-SNAPSHOT`). It opens a `release/X.Y.Z` pull request to `master`. Merging that pull request publishes the stable npm package to Nexus with the `latest` distribution tag, creates a Git tag and GitHub Release, and opens a pull request to put the next snapshot version on `feature`.

Add repository Actions secrets `NPMRC`, `NEXUS_USERNAME`, and `NEXUS_PASSWORD`. `NPMRC` must set `@fyrstain:registry` to the Nexus npm repository URL; the workflows generate a registry-scoped Basic authentication entry from the username and password immediately before publishing. `NEXUS_REGISTRY` is not used by these npm workflows. Pull request CI runs without publication secrets, including pull requests from forks. In repository Actions settings, allow GitHub Actions to create pull requests and grant the workflow its requested `contents: write` and `pull-requests: write` permissions. The release workflow must exist on `master` before the first release pull request is merged.

## CSS variable used in components and editable in the application's css style

Most of the style used by the library is taken from Bootstrap. Other variables are described in this section with their default values. You can change them in your application if needed.

# Fonts 
  --georama-semi: "Georama SemiCondensed";
  --font-lato: Lato;

# Font-size
  --title-1-desktop-size: 3rem;
  --title-1-tablet-size: 2.5rem;
  --title-2-desktop-size: 2.2rem;
  --title-2-tablet-size: 1.6rem;
  --title-3-desktop-size: 1.75rem;
  --title-3-tablet-size: 1.375rem;
  --title-4-desktop-size: 1.5rem;
  --title-4-tablet-size: 1.19rem;
  --title-5-desktop-size: 1.25rem;
  --title-5-tablet-size: 1rem;


## Request authorization

An application can install the shared request authorization before rendering:

```ts
import axios from "axios";
import { installRequestAuthorization } from "@fyrstain/hl7-front-library";
import UserService from "./services/UserService";

installRequestAuthorization({
  getAccessToken: async () => {
    const keycloak = UserService.getKC();
    if (!keycloak.token) return undefined;
    await keycloak.updateToken(30);
    return keycloak.token;
  },
  serviceBaseUrls: [process.env.REACT_APP_FHIR_URL ?? "fhir"],
  axios,
});
```

The helper covers global `fetch`, `fhir-kit-client` calls from either library, and the supplied Axios instance. It authorizes same-origin requests and configured service URLs, preserves an existing Authorization header, and leaves other origins untouched. Pass each additional trusted API base URL in `serviceBaseUrls`. If Keycloak shares the app origin, use `excludeBaseUrls` for its realm path. The application remains responsible for refreshing its Keycloak token.
