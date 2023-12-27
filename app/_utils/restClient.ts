export const DOCSMIT_API_ENDPOINT: string =
  process.env.DOCSMIT_API_ENDPOINT || "";

export const getDocsmitEndpoint = (path: string): string => {
  return `${DOCSMIT_API_ENDPOINT}/${path}`;
};

type RequestMethod = "GET" | "POST" | "DELETE"

export const fetchWithResponse = async (url: string, method: RequestMethod, payload?: any, token?: string): Promise<any> => {
  try {
    let additionalHeaders = {};

    if (token) {
      const encodedToken = Buffer.from(`${token}:`, 'utf-8').toString('base64');
      additionalHeaders = {
        // "Authorization": "Basic " + Buffer.from(`${token}:`, 'utf-8').toString('base64') + "="
        "Authorization": `Basic ${encodedToken}=`
      };

      console.log("additionalHeaders - ", additionalHeaders);
    }

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...additionalHeaders
      },
      body: payload ? JSON.stringify(payload) : undefined,
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  } catch (e: any) {
    console.log("e.message - ", e.message);
    throw new Error(e.message);
  }
};
