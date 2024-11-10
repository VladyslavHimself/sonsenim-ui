import {UserGroupResponse} from "@/api/groups/groups.ts";
import {useEffect, useMemo, useState} from "react";
import {SelectionItem} from "@/components/ui/combobox.tsx";
import {isEmpty, isUndefined} from "lodash";

export default function useGroupSelection(userGroups: UserGroupResponse[]) {
    const [selectedGroup, setSelectedGroup] = useState<SelectionItem>(
       JSON.parse(localStorage.getItem("selectedGroup")!) || []
    );

    const groupsSelectionList = useMemo(() => userGroups?.map(item => ({
        value: item.id,
        label: item.groupName
    })), [userGroups]);


    useEffect(() => {
        if (isEmpty(selectedGroup) && groupsSelectionList) {
            onSelectGroup(groupsSelectionList[0])
        }

    }, [groupsSelectionList, selectedGroup]);

    return { selectedGroup, groupsSelectionList, onSelectGroup };


    function onSelectGroup(_selectedGroup: SelectionItem) {
        if (_selectedGroup) {
            setSelectedGroup(_selectedGroup);
            return localStorage.setItem('selectedGroup', JSON.stringify(_selectedGroup));
        }
    }
}