import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import AvatarLogo from "@/assets/Icons/avatar.png";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {ChevronDown} from "lucide-react";
import useUser from "@/api/user/useUser.ts";
import './AvatarProfile.scss';

export default function AvatarProfile() {
    const { userData } = useUser();

    return (
        <div className="avatar-profile">
            <Avatar>
                <AvatarImage src={AvatarLogo} alt="avatar"/>
                <AvatarFallback>:)</AvatarFallback>
            </Avatar>
            <span>{userData?.username}</span>
            <Popover>
                <PopoverTrigger><ChevronDown color="orange"/></PopoverTrigger>
                <PopoverContent>Lorem ipsum dolor sit amet.</PopoverContent>
            </Popover>
        </div>
    );
};