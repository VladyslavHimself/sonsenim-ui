import HomeIcon from "@/assets/Icons/Home.svg";
import GroupsIcon from "@/assets/Icons/Groups.svg";
import LeftArrow from "@/assets/Icons/LeftArrow.svg";
import SettingsIcon from "@/assets/Icons/Setting.svg";
import LogoutIcon from "@/assets/Icons/Logout.svg";
import {Link, useLocation} from "react-router-dom";
import useLogout from "@/hooks/useLogout.ts";
import {useMemo} from "react";

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
const BOTTOM_NAVLINKS = (logout: () => void) => [
    {
        title: "Hide panel",
        icon: LeftArrow,
        alt: "hide-panel",
        action: () => {}
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
        action: logout
    }
];


export default function NavSidebarList() {
    const location = useLocation();
    const logout = useLogout();
    return useMemo(() => (
        <div className="nav-sidebar-list">
            <div>
                {
                    TOP_NAVLINKS.map(({title, icon, alt, href}) => (
                        <Link to={href}>
                            <div
                                className={`nav-sidebar-item ${location.pathname === href && "nav-sidebar-item--active"}`}>
                                <img src={icon} alt={alt}/>
                                {title}
                            </div>
                        </Link>
                    ))
                }
            </div>

            <div>
                {
                    BOTTOM_NAVLINKS(logout).map(({title, icon, alt, action}) => (
                        <div className="nav-sidebar-item" onClick={action}>
                            <img src={icon} alt={alt}/>
                            {title}
                        </div>
                    ))
                }
            </div>
        </div>
    ), [location]);
};