import {PropsWithChildren, useEffect} from "react";
import {useAuth} from "./AuthProvider.tsx";
import {useNavigate} from "react-router-dom";

export default function ProtectedRoute({children}: PropsWithChildren) {
        const { token } = useAuth();
        const navigate = useNavigate();

        useEffect(() => {
            if (token === null) {
                navigate('/signIn', { replace: true});
            }
        }, [token, navigate]);

        return children;
}