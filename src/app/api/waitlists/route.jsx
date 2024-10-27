const { cookies } = require("next/headers");
import { NextResponse } from "next/server";

const DJANGO_API_WAITLISTS_URL = "http://127.0.0.1:8000/api/waitlists/";

export async function GET(request) {
    // Await the cookies retrieval
    const authTokenCookie = await cookies();
    const authToken = authTokenCookie.get('auth-token')?.value;

    if (!authToken) {
        return NextResponse.json({}, { status: 401 });
    }

    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${authToken}`,
        },
    };

    try {
        const response = await fetch(DJANGO_API_WAITLISTS_URL, options);
        const result = await response.json();
        return NextResponse.json(result, { status: response.ok ? 200 : response.status });
    } catch (error) {
        console.error("Error fetching data:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
