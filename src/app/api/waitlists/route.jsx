import { getToken } from  "@/app/lib/auth"
import { NextResponse } from "next/server";

const DJANGO_API_WAITLISTS_URL = "http://127.0.0.1:8000/api/waitlists/";

export async function GET(request) {
    // Await the cookies retrieval
    const authToken = getToken()
    if (!authToken){
        return NextResponse.json({}, {status: 401})
    }

    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${authToken}`,
        },
    }

    const response = await fetch(DJANGO_API_WAITLISTS_URL, options);
    const result = await response.json();
    let status = response.status
    return NextResponse.json({...result}, {status: status});
}

export async function POST(request){
    const requestData = await request.json();
    const authToken = await getToken();

    const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        ...(authToken && { "Authorization": `Bearer ${authToken}` }),
    };

    const response = await fetch(DJANGO_API_WAITLISTS_URL, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(requestData),
    });

    if (response.ok) {
        return NextResponse.json(await response.json(), { status: 200 });
    }

    if (response.status === 401 && authToken) {
        const newToken = await fetchNewToken();
        if (newToken) {
            // Retry request with new token
            headers["Authorization"] = `Bearer ${newToken}`;
            const retryResponse = await fetch(DJANGO_API_WAITLISTS_URL, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(requestData),
            });

            if (retryResponse.ok) {
                return NextResponse.json(await retryResponse.json(), { status: 200 });
            }
        }
    }

    return NextResponse.json({ message: "Invalid request." }, { status: response.status });
}

