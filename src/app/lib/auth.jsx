const { cookies } = require("next/headers");

const TOKEN_AGE = 3600;
const TOKEN_NAME = "auth-token";
const TOKEN_REFRESH_NAME = "auth-refresh-token";

export async function getToken() {
    const authTokenCookie = await cookies();
    const authToken = authTokenCookie.get(TOKEN_NAME);
    return authToken?.value;
}

export async function getRefreshToken() {
    const authTokenCookie = await cookies();
    const myAuthToken = await authTokenCookie.get(TOKEN_REFRESH_NAME);
    return myAuthToken?.value;
}

export async function setToken(authToken) {
    const authTokenCookie = await cookies();
    await authTokenCookie.set({
        name: TOKEN_NAME,
        value: authToken,
        httpOnly: true, // limit client-side JS access
        sameSite: 'strict',
        secure: process.env.NODE_ENV !== 'development',
        maxAge: TOKEN_AGE,
    });
}

export async function setRefreshToken(authRefreshToken) {
    const authTokenCookie = await cookies();
    await authTokenCookie.set({
        name: TOKEN_REFRESH_NAME,
        value: authRefreshToken,
        httpOnly: true, // limit client-side JS access
        sameSite: 'strict',
        secure: process.env.NODE_ENV !== 'development',
        maxAge: TOKEN_AGE,
    });
}

export async function deleteTokens() {
    const authTokenCookie = await cookies();
    await authTokenCookie.delete(TOKEN_REFRESH_NAME);
    await authTokenCookie.delete(TOKEN_NAME);
}
