import '@/styles/layout-wrapper.styles.scss';
import DashboardHeaderSection from "@/components/DashboardHeaderSection/DashboardHeaderSection.tsx";

export default function Groups() {
    return (
        <div className="layout-wrapper">
            <DashboardHeaderSection
                LeftCornerSection={() => (
                    <h1>sample</h1>
                )} />
        </div>
    );
}
