import './GroupsContentSection.scss';
import {Button} from "@/components/ui/button.tsx";



// TODO: Header component with/without additional button
export default function GroupsContentSection() {
    return (
        <div className="groups-content-section">
            <div className="groups-content-section-header">
                <h1>Groups</h1>
                <Button style={{padding: "25px 30px"}}>+ Create a new group</Button>
            </div>

        </div>
    );
};