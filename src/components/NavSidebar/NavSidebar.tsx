import './NavSidebar.scss';
import Logotype from '../../assets/logo.png';
import {Outlet} from "react-router-dom";
import useSidebarStatus from "@/components/NavSidebar/useSidebarStatus.tsx";
import NavSidebarList from "@/components/NavSidebar/NavSidebarList/NavSidebarList.tsx";

export default function NavSidebar() {
    const isSidebarMustBeShown = useSidebarStatus();

    return (
        <>
            {isSidebarMustBeShown && (
                <div className="nav-sidebar">
                    <div className="nav-sidebar-logo">
                        <img src={Logotype} alt="logotype"/>
                        <hr/>
                    </div>
                    <NavSidebarList />
                </div>
            )}
            <Outlet />
        </>
    );
};