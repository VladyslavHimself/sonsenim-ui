import '@/styles/layout-wrapper.styles.scss';
import DashboardHeaderSection from "@/components/DashboardHeaderSection/DashboardHeaderSection.tsx";


/* Reminder
   * get user groups
   * Configure combobox
   * Add profile section in the right top of screen
   * Add mocked statistics data and layout
 */

export default function Dashboard() {
    return (
        <div className="layout-wrapper">

            <DashboardHeaderSection />
        </div>
    );
}
