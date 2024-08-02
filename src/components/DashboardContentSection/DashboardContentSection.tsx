import './DashboardContentSection.scss';
import {useQueryClient} from "@tanstack/react-query";
import {UserGroupsResponse} from "@/api/groups/groups.ts";
import NoGroupsAlert from "@/components/DashboardContentSection/NoGroupsAlert.tsx";

export default function DashboardContentSection() {
    const query = useQueryClient();
    const isUserHaveAnyGroups =
        query.getQueryData<UserGroupsResponse[]>(['user-groups'])?.length;

    return (
        <div className="dashboard-content-section">
            { !isUserHaveAnyGroups && <NoGroupsAlert /> }
        </div>
    );
};