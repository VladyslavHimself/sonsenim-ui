import {useParams} from "react-router-dom";
import '@/styles/layout-wrapper.styles.scss';
import {Input} from "@/components/ui/input.tsx";
import PageHeaderSection from "@/components/DashboardHeaderSection/PageHeaderSection.tsx";
import {ListFilter} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";

export default function SelectedGroupPage() {
    const params = useParams();

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
                            <Button variant="outline" className="groups-header-button"><ListFilter /></Button>
                        </div>
                    </>
                )}/>
        </div>
    );
};