import '@/styles/layout-wrapper.styles.scss';
import PageHeaderSection from "@/components/Dashboard/DashboardHeaderSection/PageHeaderSection.tsx";
import DashboardContentSection from "@/components/Dashboard/DashboardContentSection/DashboardContentSection.tsx";
import useUserGroups from "@/api/groups/useUserGroups.ts";
import {Combobox} from "@/components/ui/combobox.tsx";
import useGroupSelection from "@/pages/Dashboard/useGroupSelection.ts";

export default function Dashboard() {
    const { userGroups } = useUserGroups();
    const { selectedGroup, groupsSelectionList, onSelectGroup } = useGroupSelection(userGroups!);

    return (
        <div className="layout-wrapper">
            <PageHeaderSection>
                <Combobox
                    selectedValue={selectedGroup}
                    placeholder="Select group..."
                    searchPlaceholder="Search group.."
                    onChangeValue={onSelectGroup}
                    selectionList={groupsSelectionList || []}
                />
            </PageHeaderSection>
            <DashboardContentSection selectedGroup={selectedGroup} />
        </div>
    );
}
