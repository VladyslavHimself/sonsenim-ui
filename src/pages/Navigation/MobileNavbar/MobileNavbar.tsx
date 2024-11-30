import './MobileNavbar.scss';
import {Category, Home, Notification} from "react-iconly";
import {UserRound} from "lucide-react";
import MobileNavbarTab from "@/pages/Navigation/MobileNavbar/MobileNavbarTab/MobileNavbarTab.tsx";

const mobileNavbarTabs = [
    {
        title: "Dashboard",
        Icon: Home,
        alt: "home-icon",
        href: "/dashboard"
    },

    {
        title: "Groups",
        Icon: Category,
        alt: "groups-icon",
        href: "/groups"
    },

    {
        title: "Notifications",
        Icon: Notification,
        alt: "home-icon",
        href: "#"
    },

    {
        title: "Profile",
        Icon: UserRound,
        alt: "user-icon",
        href: "/profile"
    }
]

export default function MobileNavbar() {
    return (

        <div className="mobile-navbar">
            {
                mobileNavbarTabs.map((tab) => <MobileNavbarTab key={tab.title} tabInfo={tab} />)
            }
        </div>
    );
};