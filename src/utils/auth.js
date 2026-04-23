export function getStoredToken() {
    return localStorage.getItem("token");
}

export function clearSession() {
    localStorage.removeItem("token");
    sessionStorage.clear();
}

export function readUserFromToken() {
    const token = getStoredToken();

    if (!token) {
        return null;
    }

    try {
        const [, payload] = token.split(".");

        if (!payload) {
            return null;
        }

        const normalizedPayload = payload.replace(/-/g, "+").replace(/_/g, "/");
        const decodedPayload = atob(normalizedPayload);
        return JSON.parse(decodedPayload);
    } catch {
        return null;
    }
}
