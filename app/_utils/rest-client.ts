export const DOCSMIT_API_ENDPOINT: string = process.env.DOCSMIT_API_ENDPOINT || ""

export const getDocsmitEndpoint = (path: string): string => {
    return `${DOCSMIT_API_ENDPOINT}/${path}`
}

export const postWithResponse = async (url: string, payload?: any): Promise<any> => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: payload ? JSON.stringify(payload) : undefined
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }
    
        return await response.json();
    } catch (e: any) {
        throw new Error(e.message);
    }
}

export const fetchWithResponse = async (url: string): Promise<any> => {
    try {
        const response = await fetch(url)

        if (!response.ok) {
            throw new Error(response.statusText)
        }

        return await response.json()
    } catch (e: any) {
        throw new Error(e.message)
    }
}