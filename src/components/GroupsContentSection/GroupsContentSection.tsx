//@ts-nocheck

import './GroupsContentSection.scss';
import {Button} from "@/components/ui/button.tsx";

import Card from "@/components/Card/Card.tsx";
import useUserGroupsInfo from "@/api/groups/useUserGroupsInfo.ts";
import ModalBoxes from "@/modals/ModalBoxes.tsx";
import CreateNewGroupModal from "@/components/CreateNewGroupModal/CreateNewGroupModal.tsx";



// TODO: Header component with/without additional button
export default function GroupsContentSection() {
    const { groupsInfo } = useUserGroupsInfo();
    return (
        <div className="groups-content-section">
            <div className="groups-content-section-header">
                <h1>Groups</h1>
                <Button style={{padding: "25px 30px"}} onClick={() => {
                    ModalBoxes.open({
                        className: 'admin-confirmation',
                        title: 'Create a new group',
                        component: <CreateNewGroupModal />,
                    });
                }}>+ Create a new group</Button>
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