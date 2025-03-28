export function decodeJWT(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(atob(base64));
        return payload;
    } catch (error) {
        console.error('Failed to decode JWT:', error);
        return null;
    }
}

export function isJWTExpired(token) {
    const payload = decodeJWT(token);
    if (!payload || !payload.exp) {
        return true;
    }
    const currentTime = Math.floor(Date.now() / 1000);
    return currentTime > payload.exp;
}