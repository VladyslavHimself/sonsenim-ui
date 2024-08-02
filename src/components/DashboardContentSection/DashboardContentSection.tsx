import './DashboardContentSection.scss';
import {useQueryClient} from "@tanstack/react-query";
import {UserGroupsResponse} from "@/api/groups/groups.ts";
import NoGroupsAlert from "@/components/DashboardContentSection/NoGroupsAlert.tsx";
import useUserGroupStatistics from "@/api/groups/useUserGroupStatistics.ts";
import {SelectionItem} from "@/components/ui/combobox.tsx";

type Props = {
    selectedGroup: SelectionItem
}

export default function DashboardContentSection({ selectedGroup }: Props) {
    const query = useQueryClient();
    const { groupStats } = useUserGroupStatistics(selectedGroup.value);
    const isUserHaveAnyGroups =
        query.getQueryData<UserGroupsResponse[]>(['user-groups'])?.length;

    if (!isUserHaveAnyGroups) {
        return (
            <div className="dashboard-content-section">
                <NoGroupsAlert/>
            </div>
        )
    }

    return (
        <div className="dashboard-content-section">
            <h1>Dashboard</h1>
            <div className="dashboard-content-strip">
                <div className="dashboard-content-card">
                    <span className="dashboard-content-card-count">{groupStats?.decksTotal}</span>
                    <span className="dashboard-content-card-topic">Decks created</span>
                </div>

                <div className="dashboard-content-card">
                    <span className="dashboard-content-card-count">{groupStats?.cardsTotal}</span>
                    <span className="dashboard-content-card-topic">Studied cards</span>
                </div>
            </div>
        </div>
    );
};