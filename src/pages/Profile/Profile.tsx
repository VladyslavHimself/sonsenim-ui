import PageHeaderSection from "@/components/Dashboard/DashboardHeaderSection/PageHeaderSection.tsx";
import './Profile.scss';
import {CircleUserRound} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";

export default function Profile() {
    return (
        <div className="layout-wrapper profile-page">
            <PageHeaderSection>
                <div className="profile-page-user-header">
                    <div className="user-info-avatar"><CircleUserRound type="filled"/></div>
                    <div className="user-info-content">
                        <div className="user-info-content-fullname">Vladyslav Lutchyn</div>
                        <div className="user-info-content-email">vladyslavhimself@gmail.com</div>
                    </div>
                </div>
            </PageHeaderSection>

            <div className="profile-page-group-section">
                <div className="profile-page-group-section-header">Subscription details</div>
                <div className="profile-page-group-section-content">
                    <div>
                        <div className="profile-page-group-section-item">Current tier - <span>free</span></div>
                        <div className="profile-page-group-section-item">During - <span>lifetime</span></div>
                    </div>
                    <Button>Buy premium</Button>
                </div>
            </div>
        </div>
    );
}