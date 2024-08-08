import './Card.scss';
import GroupImageExample from "@/assets/Icons/Groups/group-image-example.png";

import {Pencil} from "lucide-react";
import {MouseEventHandler, useState} from "react";
import ModalBoxes from "@/modals/ModalBoxes.tsx";
import {EditGroupModal} from "@/components/GroupModals/EditGroupModal/EditGroupModal.tsx";
import {UserGroupsInfoResponse} from "@/api/groups/groups.ts";



type Props = {
    currentGroup: UserGroupsInfoResponse;
    refetchUsersInfo: () => void,
    onClickHandler: MouseEventHandler<HTMLDivElement>
}


// TODO: Move refetch
export default function Card({ currentGroup, refetchUsersInfo, onClickHandler }: Props) {
    const { groupName, decksCount } = currentGroup;
    // TODO: Make it with ref
    const [isEditVisible, setIsEditVisible] = useState<boolean>(false);

    return (
        <div className="group-card"
             onMouseEnter={() => setIsEditVisible(true)}
             onMouseLeave={() => {setIsEditVisible(false)}}
             onClick={onClickHandler}
        >
            <div className="group-card-info">
                <div className="group-card-info-title">
                    <div>{groupName}</div>
                    { isEditVisible && <Pencil width={20} height={20} onClick={(e) => {
                        e.stopPropagation();
                        // @ts-ignore
                        return ModalBoxes.open({
                            className: 'admin-confirmation',
                            title: `Edit a group: ${groupName}`,
                            component: <EditGroupModal currentGroup={currentGroup} refetchGroups={refetchUsersInfo} />,
                        });
                    }} /> }
                </div>
                <div>{decksCount} decks</div>
            </div>
            <div className="group-card-image">
                <img src={GroupImageExample} alt=""/>
            </div>
        </div>
    );
};