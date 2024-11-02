import {useAuth} from "@/security/AuthProvider.tsx";
import {useQueryClient} from "@tanstack/react-query";


export default function useLogout() {
    const queryClient = useQueryClient()
    const { setToken } = useAuth();
    return () => {
        localStorage.removeItem('token');
        localStorage.removeItem('selectedGroup');
        queryClient.removeQueries();
        setToken(null);
    }
}