import {ReactNode} from "react";
import './DashboardHeaderSection.scss';
import AvatarProfile from "@/components/AvatarProfile/AvatarProfile.tsx";


// TODO: REMINDER:
//  Scale group local storage flow. Possible issue is conflict of saved local data when user switch to another one
//  Add group autoselection if group not selected. (if user have, at least one group)

type Props = {
    LeftCornerSection: () => ReactNode
}

export default function DashboardHeaderSection({ LeftCornerSection }: Props) {
    return (
        <div className="dashboard-header-section">
            <div className="dashboard-header-left-corner">
                <LeftCornerSection />
            </div>
            <AvatarProfile />
        </div>
    );
};