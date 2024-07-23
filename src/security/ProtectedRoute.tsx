import {PropsWithChildren, useEffect} from "react";
import {useAuth} from "./AuthProvider.tsx";
import {useNavigate} from "react-router-dom";

export default function ProtectedRoute({children}: PropsWithChildren) {
        const user = useAuth();
        const navigate = useNavigate();

        console.log(user);

        useEffect(() => {
            if (user === null) {
                console.log(user);
                navigate('/signIn', { replace: true});
            }
        }, [user, navigate]);

        return children;
}