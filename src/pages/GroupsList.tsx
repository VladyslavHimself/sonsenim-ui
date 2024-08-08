import '@/styles/layout-wrapper.styles.scss';
import '@/styles/GroupsList.scss';
import PageHeaderSection from "@/components/DashboardHeaderSection/PageHeaderSection.tsx";
import {Input} from "@/components/ui/input.tsx";
import CardsListContentSection from "@/components/GroupsListContentSection/CardsListContentSection.tsx";
import useUserGroupsInfo from "@/api/groups/useUserGroupsInfo.ts";
import {useNavigate} from "react-router-dom";
import Card from "@/components/Card/Card.tsx";
import {Button} from "@/components/ui/button.tsx";
import ModalBoxes from "@/modals/ModalBoxes.tsx";
import CreateNewGroupModal from "@/components/GroupModals/CreateNewGroupModal/CreateNewGroupModal.tsx";



export default function GroupsList() {
    const navigate = useNavigate();
    const { groupsInfo, refetch } = useUserGroupsInfo();

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
                <CardsListContentSection Header={() => (
                    <>
                        <h1>Groups</h1>
                        <Button style={{padding: "25px 30px"}} onClick={() => {
                            // @ts-ignore
                            ModalBoxes.open({
                                className: 'admin-confirmation',
                                title: 'Create a new group',
                                component: <CreateNewGroupModal refetchUsersInfo={refetch} />,
                            });
                        }}>+ Create a new group</Button>
                    </>
                )}>
                    {
                        groupsInfo?.map((groupInfo) => (
                            <Card
                                key={groupInfo.groupId}
                                currentGroup={groupInfo}
                                refetchUsersInfo={refetch}
                                onClickHandler={() => openGroupByGroupId(groupInfo.groupId)} />
                        ))
                    }
                </CardsListContentSection>
            </div>
    );

    function openGroupByGroupId(groupId: number) {
        navigate(`/groups/${groupId}`);
    }
}
