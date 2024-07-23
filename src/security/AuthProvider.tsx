import {createContext, ReactNode, useContext, useState} from "react";


const AuthContext = createContext(null);

type Props = {
    children: ReactNode,
}

export function AuthProvider({ children}: Props) {
    const [auth, setAuth] = useState(localStorage.getItem('token') || null);
    // @ts-ignore
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error("useAuth must be used within AuthProvider");
    }

    return context;
}