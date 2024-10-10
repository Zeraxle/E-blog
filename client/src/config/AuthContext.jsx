import { useState, useContext, createContext } from "react";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({user: null, token: null})


return (
    <AuthContext.Provider value={{ authState, setAuthState}}>
        {children}
    </AuthContext.Provider>
)
}

export const useAuth = () => {
    return useContext(AuthContext)
}