import '@/styles/layout-wrapper.styles.scss';
import PageHeaderSection from "@/components/Dashboard/DashboardHeaderSection/PageHeaderSection.tsx";
import DashboardContentSection from "@/components/Dashboard/DashboardContentSection/DashboardContentSection.tsx";
import useUserGroups from "@/api/groups/useUserGroups.ts";
import {useEffect, useMemo, useState} from "react";
import {Combobox, SelectionItem} from "@/components/ui/combobox.tsx";
import {isEmpty} from "lodash";
import useUser from "@/api/user/useUser.ts";
import useGroupSelection from "@/pages/Dashboard/useGroupSelection.ts";


// TODO: Reminder - Add profile section in the right top of screen (add popup when user profile design will be ready)
//       And change mocked data in weekly report chart.

export default function Dashboard() {
    const { userGroups } = useUserGroups();
    const { selectedGroup, groupsSelectionList, onSelectGroup } = useGroupSelection(userGroups!);

    return (
        <div className="layout-wrapper">
            <PageHeaderSection
                LeftCornerSection={() => (
                <Combobox
                    selectedValue={selectedGroup}
                    placeholder="Select group..."
                    searchPlaceholder="Search group.."
                    onChangeValue={onSelectGroup}
                    selectionList={groupsSelectionList || []}
                />
            )} />
            <DashboardContentSection selectedGroup={selectedGroup} />
        </div>
    );
}
