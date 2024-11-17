"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext({
  isAuthenticated: false,
  login: () => {},
  logout: () => {}
});

const LOGIN_REDIRECT_URL = "/";
const LOGOUT_REDIRECT_URL = "/login";
const LOGIN_REQUIRED_URL = "/login";
const LOCAL_STORAGE_KEY = "is-logged-in";
const LOCAL_USERNAME_KEY = "username"

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("")
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Check if user is logged in on initial render
  useEffect(() => {
    const storedAuthState = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedAuthState) {
      const storedAuthStatusInt = parseInt(storedAuthState);
      setIsAuthenticated(storedAuthStatusInt === 1);
    }
    const storedUn = localStorage.getItem(LOCAL_USERNAME_KEY);
    if (storedUn) {
      setUsername(storedUn);
    }
  }, [pathname, searchParams]);

  const login = (username) => {
    setIsAuthenticated(true);
    localStorage.setItem(LOCAL_STORAGE_KEY, "1");
    if (username) {
      localStorage.setItem(LOCAL_USERNAME_KEY, `${username}`)
    } else {
      localStorage.removeItem(LOCAL_USERNAME_KEY)
    }
    const nextUrl = searchParams.get("next") || "/" 
    const invalidNextUrl = ["/login", "/logout"];
    const nextUrlValid = nextUrl && nextUrl.startsWith("/") && !invalidNextUrl.includes(nextUrl);
  
    // Log current values for debugging
    console.log("Current pathname:", pathname);
    console.log("Current searchParams:", searchParams.toString());
    console.log("Next URL:", nextUrl);
    console.log("Is next URL valid?", nextUrlValid);

    if (nextUrlValid){
      router.replace(nextUrl)
      return
    } else {
      router.replace(LOGIN_REDIRECT_URL)
      return
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem(LOCAL_STORAGE_KEY, "0");

    console.log("Redirecting to logout URL:", LOGOUT_REDIRECT_URL);
    router.replace(LOGOUT_REDIRECT_URL);
  };

  const loginRequiredRedirect = () => {
    // User is not logged in; redirect to login
    setIsAuthenticated(false);
    localStorage.setItem(LOCAL_STORAGE_KEY, "0");

    let loginWithNextUrl = `${LOGIN_REDIRECT_URL}?next=${pathname}`;
    if (LOGIN_REQUIRED_URL === pathname) {
      loginWithNextUrl = `${LOGIN_REQUIRED_URL}`;
    }

    console.log("Redirecting to login required URL:", loginWithNextUrl);
    router.replace(loginWithNextUrl);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loginRequiredRedirect, username }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
