import React, {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {useQueryClient} from "@tanstack/react-query";


const AuthContext = createContext(null);

type Props = {
    children: ReactNode,
}


export function AuthProvider({ children }: Props) {
    const queryClient = useQueryClient()
    const [token, setToken] = useState<string | null>(localStorage.getItem('token') || null);
    useEffect(() => {
        queryClient.invalidateQueries({ queryKey: ['user-info'] })
    }, [queryClient, token]);
    // @ts-ignore
    return <AuthContext.Provider value={{token, setToken}}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    // @ts-ignore
    const context = useContext<{token: string | null, setToken: React.Dispatch<string | null>}>(AuthContext);

    if (context === undefined) {
        throw new Error("useAuth must be used within AuthProvider");
    }

    return context;
}