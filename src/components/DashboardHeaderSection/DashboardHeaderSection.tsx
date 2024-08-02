import {Combobox, SelectionItem} from "@/components/ui/combobox.tsx";
import React from "react";
import useUser from "@/api/user/useUser.ts";
import './DashboardHeaderSection.scss';
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import AvatarLogo from '@/assets/Icons/avatar.png';
import {ChevronDown} from "lucide-react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";


// TODO: REMINDER:
//  Scale group local storage flow. Possible issue is conflict of saved local data when user switch to another one
//  Add group autoselection if group not selected. (if user have, at least one group)

type Props = {
    groups?: SelectionItem[],
    selectedGroup: SelectionItem,
    setSelectedGroup: React.Dispatch<React.SetStateAction<SelectionItem>>
}

export default function DashboardHeaderSection({ groups, selectedGroup, setSelectedGroup }: Props) {
    const { userData } = useUser();


    return (
        <div className="dashboard-header-section">
            <Combobox
                selectedValue={selectedGroup}
                placeholder="Select group..."
                searchPlaceholder="Search group.."
                onChangeValue={onChangeSelectedGroup}
                selectionList={groups || []}
            />
            <div className="dashboard-header-profile">
                <Avatar>
                    <AvatarImage src={AvatarLogo} alt="avatar" />
                    <AvatarFallback>:)</AvatarFallback>
                </Avatar>
                <span>{userData?.username}</span>
                <Popover>
                    <PopoverTrigger><ChevronDown color="orange" /></PopoverTrigger>
                    <PopoverContent>Lorem ipsum dolor sit amet.</PopoverContent>
                </Popover>
            </div>
        </div>
    );

    // TODO: make localStorage hook
    function onChangeSelectedGroup(_selectedGroup: SelectionItem) {
        setSelectedGroup(_selectedGroup);
        localStorage.setItem('selectedGroup', JSON.stringify(_selectedGroup));
    }
};