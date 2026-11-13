export type AccessTokenProvider = () => string | undefined | Promise<string | undefined>;

export interface RequestAuthorizationOptions {
  /** Return a current access token, refreshing it first when necessary. */
  getAccessToken: AccessTokenProvider;
  /** Trusted API base URLs, including cross-origin FHIR services. */
  serviceBaseUrls: string[];
  /** Same-origin requests are included by default. */
  authorizeSameOrigin?: boolean;
  /** URLs that must never receive the token, such as the Keycloak endpoint. */
  excludeBaseUrls?: string[];
}

export interface AxiosRequestConfigLike {
  headers: {
    has(name: string): boolean;
    set(name: string, value: string): unknown;
  };
}

export interface AxiosInstanceLike<TConfig extends AxiosRequestConfigLike> {
  // Axios accepts its own config type here; avoid making Axios a library dependency.
  getUri(...args: any[]): string;
  interceptors: {
    request: {
      use(onFulfilled: (config: TConfig) => Promise<TConfig>): unknown;
    };
  };
}

let options: RequestAuthorizationOptions | undefined;
let fetchInstalled = false;
const axiosInstances = new WeakSet<object>();

function toUrl(value: string): URL | undefined {
  try {
    return new URL(value, window.location.href);
  } catch {
    return undefined;
  }
}

function isWithinBase(url: URL, baseValue: string): boolean {
  const base = toUrl(baseValue.trim());
  if (!base || url.origin !== base.origin) return false;

  const path = base.pathname.replace(/\/+$/, "");
  return url.pathname === path || url.pathname.startsWith(`${path}/`);
}

function shouldAuthorize(value: string): boolean {
  if (!options) return false;
  const url = toUrl(value);
  if (!url || !["http:", "https:"].includes(url.protocol)) return false;

  if (options.excludeBaseUrls?.some((base) => isWithinBase(url, base))) return false;
  if (options.authorizeSameOrigin !== false && url.origin === window.location.origin) return true;
  return options.serviceBaseUrls.some((base) => isWithinBase(url, base));
}

function installFetch(): void {
  if (fetchInstalled || typeof window === "undefined" || typeof window.fetch !== "function") return;

  const originalFetch = window.fetch.bind(window);
  window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const url = input instanceof Request ? input.url : input.toString();
    if (!shouldAuthorize(url)) return originalFetch(input, init);

    const request = new Request(input, init);
    if (request.headers.has("Authorization")) return originalFetch(request);

    const token = await options?.getAccessToken();
    if (!token) return originalFetch(request);

    const headers = new Headers(request.headers);
    headers.set("Authorization", `Bearer ${token}`);
    return originalFetch(new Request(request, { headers }));
  };

  fetchInstalled = true;
}

function installAxios<TConfig extends AxiosRequestConfigLike>(axios: AxiosInstanceLike<TConfig>): void {
  if (axiosInstances.has(axios)) return;

  axios.interceptors.request.use(async (config) => {
    if (!shouldAuthorize(axios.getUri(config)) || config.headers.has("Authorization")) return config;

    const token = await options?.getAccessToken();
    if (token) config.headers.set("Authorization", `Bearer ${token}`);
    return config;
  });

  axiosInstances.add(axios);
}

/**
 * Installs authorization on global fetch (including fhir-kit-client) and on
 * the Axios instance supplied by the host app. Call this before rendering.
 * Axios is passed in so this library never intercepts a different bundled copy.
 */
export function installRequestAuthorization<TConfig extends AxiosRequestConfigLike>(
  configuration: RequestAuthorizationOptions & {
    axios?: AxiosInstanceLike<TConfig>;
  },
): void {
  options = configuration;
  installFetch();
  if (configuration.axios) installAxios(configuration.axios);
}
