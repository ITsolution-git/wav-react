export function parseJwt (token) {
    const base64Url = token.split('.')[1],
        base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}

export function isTokenValid(token) {
    try {
        const parsedToken = parseJwt(token);
        const nowInMilliseconds = new Date().getTime();
        return parsedToken.expiresAt > nowInMilliseconds;
    }
    catch (e) {
        return false;
    }
}
