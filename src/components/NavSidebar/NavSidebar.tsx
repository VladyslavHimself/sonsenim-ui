import './NavSidebar.scss';
import Logotype from '../../assets/logo.png';
import HomeIcon from '../../assets/Icons/Home.svg';
import GroupsIcon from '../../assets/Icons/Groups.svg';
import SettingsIcon from '../../assets/Icons/Setting.svg';
import LeftArrow from '../../assets/Icons/LeftArrow.svg';
import LogoutIcon from '../../assets/Icons/Logout.svg';
import {Outlet} from "react-router-dom";
import useSidebarStatus from "@/components/NavSidebar/useSidebarStatus.tsx";
import useLogout from "@/hooks/useLogout.ts";

export default function NavSidebar() {
    const isSidebarMustBeShown = useSidebarStatus();
    const logout = useLogout();

    return (
        <>
            {isSidebarMustBeShown && (
                <div className="nav-sidebar">
                    <div className="nav-sidebar-logo">
                        <img src={Logotype} alt="logotype"/>
                        <hr/>
                    </div>

                    <div className="nav-sidebar-list">
                        <div>
                            <div className="nav-sidebar-item nav-sidebar-item--active">
                                <img src={HomeIcon} alt="home-icon"/>
                                Dashboard
                            </div>

                            <div className="nav-sidebar-item">
                                <img src={GroupsIcon} alt="home-icon"/>
                                Groups
                            </div>
                        </div>

                        <div>
                            <div className="nav-sidebar-item">
                                <img src={LeftArrow} alt="home-icon"/>
                                Hide panel
                            </div>

                            <div className="nav-sidebar-item">
                                <img src={SettingsIcon} alt="home-icon"/>
                                Settings
                            </div>

                            <div onClick={logout} className="nav-sidebar-item">
                                <img src={LogoutIcon} alt="home-icon"/>
                                Log out
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <Outlet/>
        </>
    );
};