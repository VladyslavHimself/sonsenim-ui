import {Link, useLocation} from "react-router-dom";
import {FC} from "react";


type tabInfo = {
    title: string,
    Icon: FC,
    alt: string,
    href: string
}

type Props = {
    tabInfo: tabInfo
}

export default function MobileNavbarTab({ tabInfo }: Props) {
    const { Icon, href } = tabInfo;
    const location = useLocation();

    return (
        <Link to={href}>
            <div
                className={`mobile-navbar-item ${location.pathname.includes(href) && "mobile-navbar-item-active-tab"}`}>
                <Icon/>
            </div>
        </Link>

    );
}