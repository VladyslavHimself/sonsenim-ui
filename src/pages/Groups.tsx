import '@/styles/layout-wrapper.styles.scss';
import '@/styles/Groups.scss';
import PageHeaderSection from "@/components/DashboardHeaderSection/PageHeaderSection.tsx";
import {Input} from "@/components/ui/input.tsx";
import GroupsContentSection from "@/components/GroupsContentSection/GroupsContentSection.tsx";

export default function Groups() {
    return (
            <div className="layout-wrapper">
                <PageHeaderSection
                    LeftCornerSection={() => (
                        <>
                            {
                                // TODO: Reminder
                                //        * This should be quicksearch like in MUI.
                                //        * Configurable to other related pages like "Decks" e.t.c
                                //        * With debounce
                                //        * Replace to 'Input.WithIcon' later
                            }
                            <div className="groups-header-section">
                                <Input placeholder="Search" className="groups-header-input"/>
                            </div>
                        </>
                    )}/>
                <GroupsContentSection />
            </div>
    );
}
