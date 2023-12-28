export type RequestMethod = "GET" | "POST" | "DELETE";

export type PayloadWithToken<T> = {
  payload: T;
  token: string;
};

export type CustomRequestHeaders = {
  "Content-Type": string;
  Authorization?: string;
  // To define others once needed, leave as-is for now
};

export const DOCSMIT_API_ENDPOINT: string =
  process.env.DOCSMIT_API_ENDPOINT || "";

export const getDocsmitEndpoint = (path: string): string => {
  return `${DOCSMIT_API_ENDPOINT}/${path}`;
};

export const validateResponse = (response: string) => {
  try {
    return JSON.parse(response);
  } catch (e) {
    return response;
  }
};

export const injectCustomHeader = (token?: string) => {
  let authHeader = {};

  const defaultHeader: CustomRequestHeaders = {
    "Content-Type": "application/json",
  };

  if (token) {
    authHeader = {
      Authorization: "Basic " + Buffer.from(`${token}:`).toString("base64"),
    };
  }

  return {
    ...defaultHeader,
    ...authHeader,
  };
};

export const transformPayload = (payload: any): PayloadWithToken<any> => {
  let token = "";

  if (payload.token) {
    token = payload.token;
    delete payload.token;
  }

  const newPayload = {
    payload,
    token,
  };

  return newPayload;
};

export const fetchWithResponse = async (
  url: string,
  method: RequestMethod,
  payload?: any,
  token?: string
): Promise<any> => {
  try {
    const response = await fetch(url, {
      method,
      headers: injectCustomHeader(token),
      body: payload ? JSON.stringify(payload) : undefined,
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const rawResponse = await response.text();

    return validateResponse(rawResponse);
  } catch (e) {
    throw new Error(e.message);
  }
};

export const multiPartFormPostWithResponse = async (
  url: string,
  requestBody: FormData,
  token?: string
): Promise<any> => {
  let additionalHeader = {};

  if (token) {
    additionalHeader = {
      Authorization: "Basic " + Buffer.from(`${token}:`).toString("base64"),
    };
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
      ...additionalHeader,
    },
    body: requestBody,
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const rawResponse = await response.text();

  return validateResponse(rawResponse);
};

export async function multipar11tFormPost(request: Request) {
  const formData = await request.formData();

  const response = await fetch("YOUR_API_ENDPOINT", {
    method: "POST",
    body: formData,
  });
}
