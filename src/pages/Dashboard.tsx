import '@/styles/layout-wrapper.styles.scss';
import useUser from "@/api/user/useUser.ts";

export default function Dashboard() {
    const { userData } = useUser();

    console.log(userData);
    return (
        <div className="layout-wrapper">
            Dashboard

        </div>
    );
}
