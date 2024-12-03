import {Button} from "@/components/ui/button.tsx";
import ModalBoxes from "@/ModalBoxes/ModalBoxes.tsx";
import CreateNewGroupModal from "@/components/Modals/GroupModals/CreateNewGroupModal.tsx";

type Props = {
    refetchUsersInfo: () => void;
};

export default function GroupsListDesktopContentHeader({ refetchUsersInfo }: Props) {
    return (
        <>
            <h1>Groups</h1>
            <Button style={{padding: "25px 30px"}} onClick={() => {
                // @ts-ignore
                ModalBoxes.open({
                    className: 'admin-confirmation',
                    title: 'Create a new group',
                    component: <CreateNewGroupModal refetchUsersInfo={refetchUsersInfo} />,
                });
            }}>+ Create a new group</Button>
        </>
    );
};