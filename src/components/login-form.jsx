import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "./authProvider"

const LOGIN_URL = "/api/login/"

export function LoginForm() {
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
      } else {
        console.log(response)
      }
  }

  return (
    (<Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <form onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" name="username" type="username" placeholder="Your Username" required />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className=" hidden">
                Forgot your password?
              </Link>
            </div>
            <Input id="password" name="password" type="password" required />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
          </form>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="#" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>)
  );
}
