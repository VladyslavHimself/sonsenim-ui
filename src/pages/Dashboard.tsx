import '@/styles/layout-wrapper.styles.scss';
import DashboardHeaderSection from "@/components/DashboardHeaderSection/DashboardHeaderSection.tsx";
import DashboardContentSection from "@/components/DashboardContentSection/DashboardContentSection.tsx";
import useUserGroups from "@/api/groups/useUserGroups.ts";
import {useMemo} from "react";


/* Reminder
   * get user groups
   * Configure combobox
   * Add profile section in the right top of screen
   * Add mocked statistics data and layout
 */

export default function Dashboard() {
    const { userGroups } = useUserGroups();

    const formattedGroups = useMemo(() => userGroups?.map(item => ({
        value: item.id,
        label: item.groupName
    })), [userGroups]);

    return (
        <div className="layout-wrapper">
            <DashboardHeaderSection groups={formattedGroups} />
            <DashboardContentSection />
        </div>
    );
}
