import HomeIcon from "@/assets/Icons/Home.svg";
import GroupsIcon from "@/assets/Icons/Groups.svg";
import LeftArrow from "@/assets/Icons/LeftArrow.svg";
import RightArrow from "@/assets/Icons/RightArrow.svg";
import SettingsIcon from "@/assets/Icons/Setting.svg";
import LogoutIcon from "@/assets/Icons/Logout.svg";
import {Link, useLocation} from "react-router-dom";
import useLogout from "@/hooks/useLogout.ts";
import React, {useMemo} from "react";

const TOP_NAVLINKS = [
    {
        title: "Dashboard",
        icon: HomeIcon,
        alt: "home-icon",
        href: "/dashboard"
    },

    {
        title: "Groups",
        icon: GroupsIcon,
        alt: "groups-icon",
        href: "/groups"
    }

];
// @ts-ignore
const BOTTOM_NAVLINKS = (actions, states) => [
    {
        title: "Hide panel",
        icon: states.isSidebarCollapsed ? RightArrow : LeftArrow,
        alt: "hide-panel",
        action: actions.collapseSidebar
    },
    {
        title: "Settings",
        icon: SettingsIcon,
        alt: "settings-icon",
        action: () => {}
    },
    {
        title: "Log out",
        icon: LogoutIcon,
        alt: "logout-icon",
        action: actions.logout
    }
];


export default function NavSidebarList(
    { setIsSidebarCollapsed, isSidebarCollapsed }: {isSidebarCollapsed: boolean, setIsSidebarCollapsed: React.Dispatch<React.SetStateAction<boolean>>})
{
    const location = useLocation();
    const logout = useLogout();

    console.log(location.pathname);

    return useMemo(() => (
        <div className="nav-sidebar-list">
            <div>
                {
                    TOP_NAVLINKS.map(({title, icon, alt, href}) => (
                        <Link to={href}>
                            <div
                                className={`nav-sidebar-item ${location.pathname.includes(href) && "nav-sidebar-item--active"}`}>
                                <img src={icon} alt={alt}/>
                                <span>{title}</span>
                            </div>
                        </Link>
                    ))
                }
            </div>
            <div>
                {
                    BOTTOM_NAVLINKS({logout: logout, collapseSidebar},
                        {isSidebarCollapsed}).map(({title, icon, alt, action}) => (
                        <div className="nav-sidebar-item" onClick={action}>
                            <img src={icon} alt={alt}/>
                            <span>{title}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    ), [location, isSidebarCollapsed]);


    function collapseSidebar() {
        setIsSidebarCollapsed((prevState) => !prevState)
    }
};