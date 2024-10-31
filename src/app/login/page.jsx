"use client"
import { useAuth } from "@/components/authProvider"

const LOGIN_URL = "/api/login/"


export default function Page(){
    const auth = useAuth()

    async function handleSubmit (event) {
        event.preventDefault()
        console.log(event, event.target)
        const formData = new FormData(event.target)
        const objectFromForm = Object.fromEntries(formData)
        const jsonData = JSON.stringify(objectFromForm)
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: jsonData
        }
        const response = await fetch(LOGIN_URL, requestOptions)
        const data = await response.json()
        console.log(data)
        if (response.ok){
            console.log("logged-in")
            auth.login();
        }
    }

    return (<div className="h-[95vh]">
            <div className="max-w-md mx-auto py-5">
                <h1>Login Here</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="username" placeholder="Your Username" required />
                    <input type="password" name="password" placeholder="Your Password" required />
                    <button type="submit">Login</button>
                </form>
            </div>
            </div>
    )
}