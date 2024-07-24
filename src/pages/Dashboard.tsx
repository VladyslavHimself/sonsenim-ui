import {Button} from "@/components/ui/button.tsx";
import useLogout from "@/hooks/useLogout.ts";

export default function Dashboard() {
    const logout = useLogout();
    return (
        <div>
            Dashboard
            <Button onClick={logout}>Logout</Button>
        </div>
    );
}
