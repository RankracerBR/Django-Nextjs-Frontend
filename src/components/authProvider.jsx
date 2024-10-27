"use client"

const { createContext, useContext } = require("react");
const AuthContext = createContext(null)

export function AuthProvider({children}){
    const isAuthenticated = true

    return <AuthContext.Provider value={{isAuthenticated}}>
        {children}
    </AuthContext.Provider>
}

export function useAuth(){
    return useContext(AuthContext)
}