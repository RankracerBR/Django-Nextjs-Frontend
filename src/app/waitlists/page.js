// Client-side code for fetching waitlists
"use client";

import useSWR from "swr";

// Fetcher function for useSWR
const fetcher = (url) => fetch(url).then((res) => res.json());

const WAITLIST_API_URL = "/api/waitlists/";

export default function Page() {
    // Use SWR hook for fetching data
    const { data, error, isLoading } = useSWR(WAITLIST_API_URL, fetcher);

    if (error) return <div>Failed to load</div>;
    if (isLoading) return <div>Loading...</div>;

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div>{JSON.stringify(data)}</div>
        </main>
    );
}