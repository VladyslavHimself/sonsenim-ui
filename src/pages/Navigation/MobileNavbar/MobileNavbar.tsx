import './MobileNavbar.scss';
import {Category, Home, Notification} from "react-iconly";
import {PlusIcon, UserRound} from "lucide-react";
import MobileNavbarTab from "@/pages/Navigation/MobileNavbar/MobileNavbarTab/MobileNavbarTab.tsx";
import ModalBoxes from "@/ModalBoxes/ModalBoxes.tsx";
import CreateNewGroupModal from "@/components/Modals/GroupModals/CreateNewGroupModal.tsx";
import CreateNewDeckModal from "@/components/Modals/DeckModals/CreateNewDeckModal.tsx";

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
        href: "/groups",

    },

    {
        title: "Add new group",
        Icon: PlusIcon,
        alt: "plus-icon",
        href: "#",
        isShown: (currentPath: string) => /^\/groups\/?$/.test(currentPath),
        action: () => {
            //@ts-ignore
            ModalBoxes.open({
                className: 'admin-confirmation',
                title: 'Create a new group',
                component: <CreateNewGroupModal />,
            });
        }
    },

    {
        title: "Add new deck",
        Icon: PlusIcon,
        alt: "plus-icon",
        href: "#",
        isShown: (currentPath: string) => /^\/groups\/\d+/.test(currentPath),
        action: (pathname: string) => {
            ModalBoxes.open({
                className: 'create-new-deck-modal',
                title: 'Create a new deck',
                component: <CreateNewDeckModal groupId={+extractIdFromGroupsPath(pathname)!} />,
                onClose: () => {}
            })
        }
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

const extractIdFromGroupsPath = (pathname: string) => {
    const regex = /^\/groups\/(\d+)/;
    const match = pathname.match(regex);
    return match ? match[1] : null;
};