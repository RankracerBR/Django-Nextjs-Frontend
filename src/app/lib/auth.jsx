const { cookies } = require("next/headers");

const TOKEN_AGE = 3600;
const TOKEN_NAME = "auth-token";
const TOKEN_REFRESH_NAME = "auth-refresh-token";


// Fetch a new access token if expired
async function fetchNewToken() {
    const refreshToken = await getRefreshToken();
    if (!refreshToken) return null;

    // Call Django API to refresh the token
    const response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refreshToken }),
    });

    if (response.ok) {
        const data = await response.json();
        await setToken(data.access);
        return data.access;
    }
    return null;
}


export async function getToken() {
    let authToken = (await cookies()).get(TOKEN_NAME)?.value;
    if (!authToken) {
        authToken = await fetchNewToken(); // Refresh token if necessary
    }
    return authToken;
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
