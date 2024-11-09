import '@/styles/layout-wrapper.styles.scss';
import '@/styles/GroupsList.scss';
import PageHeaderSection from "@/components/Dashboard/DashboardHeaderSection/PageHeaderSection.tsx";
import {Input} from "@/components/ui/input.tsx";
import CardsListContentSection from "@/components/Groups/GroupsListContentSection/CardsListContentSection.tsx";
import useUserGroupsInfo from "@/api/groups/useUserGroupsInfo.ts";
import {useNavigate} from "react-router-dom";
import Card from "@/components/Card/Card.tsx";
import {Button} from "@/components/ui/button.tsx";
import ModalBoxes from "@/ModalBoxes/ModalBoxes.tsx";
import CreateNewGroupModal from "@/components/Modals/GroupModals/CreateNewGroupModal.tsx";
import { EditGroupModal } from '@/components/Modals/GroupModals/EditGroupModal.tsx';
import {UserGroupsInfoResponse} from "@/api/groups/groups.ts";
import React, {useEffect, useMemo, useRef, useState} from "react";


export default function GroupsList() {
    const navigate = useNavigate();
    const { groupsInfo, refetch } = useUserGroupsInfo();
    const [searchInput, setSearchInput] = useState('');

    const filteredGroups = useMemo(() => {
        if (searchInput) {

            return [];
        }

        return groupsInfo;
    }, [groupsInfo, searchInput]);

    return (
            <div className="layout-wrapper">
                <PageHeaderSection>
                    <div className="groups-header-section">
                        <Input value={searchInput} onChange={(e) => {
                            setSearchInput(e.target?.value);
                        }} placeholder="Search" className="groups-header-input"/>
                    </div>
                </PageHeaderSection>
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
                        // TODO: Add template (design), if user haven't any groups here
                        filteredGroups?.map((currentGroup) => {
                            const { groupId, groupName, decksCount} = currentGroup;
                            return (
                                <Card
                                    key={groupId}
                                    cardTitle={groupName}
                                    secondaryTile={<div>{`${decksCount} decks`}</div>}
                                    onClickHandler={() => openGroupByGroupId(groupId, groupName)}
                                    onEditHandler={(e) =>
                                        onEditGroupHandle(e, currentGroup)}
                                    imageSrc={'test'}
                                />
                            );
                        })
                    }
                </CardsListContentSection>
            </div>
    );

    function onEditGroupHandle(
        e: React.MouseEvent<SVGSVGElement, MouseEvent>,
        currentGroup: UserGroupsInfoResponse
    ) {
        e.stopPropagation();
        // @ts-ignore
        return ModalBoxes.open({
            className: 'admin-confirmation',
            title: `Edit a group: ${currentGroup.groupName}`,
            component: <EditGroupModal
                currentGroup={currentGroup}
                refetchGroups={refetch}
            />
        })
    }

    function openGroupByGroupId(groupId: number, groupName: string) {
        // TODO: Make url by key generator
        navigate(`/groups/${groupId}`, {
            state: { groupName }
        });
    }
}

function SearchBar(value, setValue) {
    return (
        <div className="groups-header-section">
            <Input value={searchInput} onChange={(e) => {
                e.preventDefault();
                setSearchInput(e.target?.value);
            }} placeholder="Search" className="groups-header-input"/>
        </div>
    )
}
