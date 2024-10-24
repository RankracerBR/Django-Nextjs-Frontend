// Import necessary modules
import { getToken } from "@/app/lib/auth";
import { NextResponse } from "next/server";

const DJANGO_API_WAITLISTS_URL = "http://127.0.0.1:8000/api/waitlists/";

// Async function to handle GET requests
export async function GET(request) {
    const authToken = getToken();

    if (!authToken) {
        return NextResponse.json({}, { status: 401 });
    }

    // Options for the fetch request
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${authToken}`,
        },
    };

    try {
        // Fetch data from the Django API
        const response = await fetch(DJANGO_API_WAITLISTS_URL, options);
        const result = await response.json();

        const status = response.ok ? 200 : response.status;

        // Return the result in JSON format
        return NextResponse.json(result, { status });
    } catch (error) {
        console.error("Error fetching data:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
