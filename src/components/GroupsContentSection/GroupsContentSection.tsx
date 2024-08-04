import './GroupsContentSection.scss';
import {Button} from "@/components/ui/button.tsx";

import Card from "@/components/Card/Card.tsx";
import useUserGroupsInfo from "@/api/groups/useUserGroupsInfo.ts";



// TODO: Header component with/without additional button
export default function GroupsContentSection() {
    const { groupsInfo } = useUserGroupsInfo();

    return (
        <div className="groups-content-section">
            <div className="groups-content-section-header">
                <h1>Groups</h1>
                <Button style={{padding: "25px 30px"}}>+ Create a new group</Button>
            </div>

            <div className="groups-content-section-cards">
                {
                    groupsInfo?.map(({groupId, groupName, decksCount}) => (
                        <Card key={groupId} groupName={groupName} decksCount={decksCount} />
                    ))
                }
            </div>
        </div>
    );
};