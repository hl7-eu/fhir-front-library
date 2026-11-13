import Client from "fhir-kit-client";
import { installRequestAuthorization } from "./RequestAuthorization";

test("authorizes FHIR library fetches and the app's Axios instance only for trusted URLs", async () => {
  const originalFetch = window.fetch;
  const networkFetch = jest.fn().mockResolvedValue(
    new Response(JSON.stringify({ resourceType: "Patient", id: "123" }), { status: 200 }),
  );
  window.fetch = networkFetch;

  try {
    const getToken = jest.fn().mockResolvedValue("library-token");
    let axiosInterceptor: ((config: { url: string; headers: Headers }) => Promise<{
      url: string;
      headers: Headers;
    }>) | undefined;
    const axios = {
      getUri: (config: { url: string; headers: Headers }) => config.url,
      interceptors: {
        request: {
          use: (handler: typeof axiosInterceptor) => { axiosInterceptor = handler; },
        },
      },
    };

    installRequestAuthorization({
      getAccessToken: getToken,
      serviceBaseUrls: ["https://api.example.test/fhir"],
      axios,
    });

    await new Client({ baseUrl: "https://api.example.test/fhir" }).read({
      resourceType: "Patient",
      id: "123",
    });

    expect((networkFetch.mock.calls[0][0] as Request).headers.get("Authorization"))
      .toBe("Bearer library-token");
    expect(getToken).toHaveBeenCalledTimes(1);

    const axiosRequest = await axiosInterceptor!({
      url: "https://api.example.test/fhir/Patient/456",
      headers: new Headers(),
    });
    expect(axiosRequest.headers.get("Authorization")).toBe("Bearer library-token");

    const externalAxiosRequest = await axiosInterceptor!({
      url: "https://external.example.test/data",
      headers: new Headers(),
    });
    expect(externalAxiosRequest.headers.has("Authorization")).toBe(false);

    await window.fetch("https://api.example.test/fhir/Patient/789", {
      headers: { Authorization: "Bearer supplied-token" },
    });
    expect((networkFetch.mock.calls[1][0] as Request).headers.get("Authorization"))
      .toBe("Bearer supplied-token");

    await window.fetch("https://external.example.test/data");
    expect(networkFetch.mock.calls[2][0]).toBe("https://external.example.test/data");
    expect(getToken).toHaveBeenCalledTimes(2);

    installRequestAuthorization({
      getAccessToken: getToken,
      serviceBaseUrls: ["https://api.example.test/fhir"],
      excludeBaseUrls: ["/auth/realms/test"],
      axios,
    });
    expect(axiosInterceptor).toBeDefined();
    await window.fetch("/auth/realms/test/protocol/openid-connect/token");
    expect(networkFetch.mock.calls[3][0]).toBe("/auth/realms/test/protocol/openid-connect/token");
    expect(getToken).toHaveBeenCalledTimes(2);
  } finally {
    window.fetch = originalFetch;
  }
});
