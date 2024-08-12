import './NavSidebar.scss';
import Logotype from '@/assets/logo.png';
import {Outlet} from "react-router-dom";
import useSidebarStatus from "@/pages/NavSidebar/useSidebarStatus.tsx";
import NavSidebarList from "@/pages/NavSidebar/NavSidebarList/NavSidebarList.tsx";
import {memo, useState} from "react";

// TODO: Add localStorage state
function NavSidebar() {
    const isSidebarMustBeShown = useSidebarStatus();
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);

    return (
        <>
            {isSidebarMustBeShown && (
                <div className={`nav-sidebar ${isSidebarCollapsed && "nav-sidebar--collapsed"}`}>
                    <div className="nav-sidebar-logo">
                        <img src={Logotype} alt="logotype"/>
                        <hr/>
                    </div>
                    <NavSidebarList isSidebarCollapsed={isSidebarCollapsed} setIsSidebarCollapsed={setIsSidebarCollapsed} />
                </div>
            )}
            <Outlet />
        </>
    );
};

export default memo(NavSidebar);