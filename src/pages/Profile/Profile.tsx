import PageHeaderSection from "@/components/Dashboard/DashboardHeaderSection/PageHeaderSection.tsx";
import './Profile.scss';
import {CircleUserRound} from "lucide-react";


export default function Profile() {
    return (
        <div className="layout-wrapper profile-page">
            <PageHeaderSection>
                <div className="profile-page-user-info-wrapper">
                    <div className="user-info-avatar"><CircleUserRound type="filled" /></div>
                    <div className="user-info-content">
                        <div className="user-info-content-fullname">Vladyslav Lutchyn</div>
                        <div className="user-info-content-email">vladyslavhimself@gmail.com</div>
                    </div>
                </div>
            </PageHeaderSection>
        </div>
    );
}