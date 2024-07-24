import {Button} from "@/components/ui/button.tsx";
import {useAuth} from "@/security/AuthProvider.tsx";

export default function Dashboard() {
    const { setToken } = useAuth();
    return (
        <div>
            Dashboard
            <Button onClick={onLogoutHandle}>Logout</Button>
        </div>
    );


    function onLogoutHandle() {
        localStorage.removeItem('token');
        setToken(null);
    }
}
