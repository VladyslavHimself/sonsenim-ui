import '@/styles/layout-wrapper.styles.scss';
import PageHeaderSection from "@/components/Dashboard/DashboardHeaderSection/PageHeaderSection.tsx";
import DashboardContentSection from "@/components/Dashboard/DashboardContentSection/DashboardContentSection.tsx";
import useUserGroups from "@/api/groups/useUserGroups.ts";
import {useMemo, useState} from "react";
import {Combobox, SelectionItem} from "@/components/ui/combobox.tsx";


// TODO: Reminder - Add profile section in the right top of screen (add popup when user profile design will be ready)
//       And change mocked data in weekly report chart.

export default function Dashboard() {
    const [selectedGroup, setSelectedGroup] =
        useState<SelectionItem>(JSON.parse(localStorage.getItem("selectedGroup")!) || []);
    const { userGroups } = useUserGroups();

    const formattedGroups = useMemo(() => userGroups?.map(item => ({
        value: item.id,
        label: item.groupName
    })), [userGroups]);

    return (
        <div className="layout-wrapper">
            <PageHeaderSection
                LeftCornerSection={() => (
                <Combobox
                    selectedValue={selectedGroup}
                    placeholder="Select group..."
                    searchPlaceholder="Search group.."
                    onChangeValue={onChangeSelectedGroup}
                    selectionList={formattedGroups || []}
                />
            )} />
            <DashboardContentSection selectedGroup={selectedGroup} />
        </div>
    );

    // TODO: make localStorage hook
    function onChangeSelectedGroup(_selectedGroup: SelectionItem) {
        setSelectedGroup(_selectedGroup);
        localStorage.setItem('selectedGroup', JSON.stringify(_selectedGroup));
    }
}
