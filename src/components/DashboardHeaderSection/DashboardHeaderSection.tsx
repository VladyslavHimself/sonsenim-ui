import {Combobox} from "@/components/ui/combobox.tsx";
import useUser from "@/api/user/useUser.ts";

export default function DashboardHeaderSection() {
    const { userData } = useUser();

    console.log(userData);
    return (
        <div className="dashboard-header-section">
            <Combobox />
        </div>
    );
};