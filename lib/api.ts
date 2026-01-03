const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiRequest(
    endpoint: string,
    method: string,
    body?: any,
    token?: string
) {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
            ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "API Error");
    }

    return res.json();
}
