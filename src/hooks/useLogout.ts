import {useAuth} from "@/security/AuthProvider.tsx";


export default function useLogout() {
    const { setToken } = useAuth();
    return () => {
        localStorage.removeItem('token');
        setToken(null);
    }
};