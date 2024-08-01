import {Combobox} from "@/components/ui/combobox.tsx";
import useUserGroups from "@/api/groups/useUserGroups.ts";
import {useMemo} from "react";
import useUser from "@/api/user/useUser.ts";
import './DashboardHeaderSection.scss';
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import AvatarLogo from '@/assets/Icons/avatar.png';
import {ChevronDown} from "lucide-react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";

export default function DashboardHeaderSection() {
    const { userData } = useUser();
    const { userGroups } = useUserGroups();

    const formattedGroups = useMemo(() => userGroups?.map(item => ({
        value: item.id,
        label: item.groupName
    })), [userGroups]);

    return (
        <div className="dashboard-header-section">
            <Combobox selectionList={formattedGroups || []}/>
            <div className="dashboard-header-profile">
                <Avatar>
                    <AvatarImage src={AvatarLogo} alt="avatar" />
                    <AvatarFallback>:)</AvatarFallback>
                </Avatar>
                <span>{userData?.username}</span>
                <Popover>
                    <PopoverTrigger><ChevronDown /></PopoverTrigger>
                    <PopoverContent>Lorem ipsum dolor sit amet.</PopoverContent>
                </Popover>
            </div>
        </div>
    );
};