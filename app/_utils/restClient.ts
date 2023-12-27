export const DOCSMIT_API_ENDPOINT: string =
  process.env.DOCSMIT_API_ENDPOINT || "";

export const getDocsmitEndpoint = (path: string): string => {
  return `${DOCSMIT_API_ENDPOINT}/${path}`;
};

type RequestMethod = "GET" | "POST" | "DELETE";

const validateResponse = (response: string) => {
  try {
    return JSON.parse(response);
  } catch (e) {
    return response;
  }
};

export const fetchWithResponse = async (
  url: string,
  method: RequestMethod,
  payload?: any,
  token?: string
): Promise<any> => {
  try {
    let additionalHeaders = {};

    if (token) {
      additionalHeaders = {
        Authorization: "Basic " + Buffer.from(`${token}:`).toString("base64"),
      };
    }

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...additionalHeaders,
      },
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
