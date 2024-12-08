import {Button} from "@/components/ui/button.tsx";
import ModalBoxes from "@/ModalBoxes/ModalBoxes.tsx";
import CreateNewGroupModal from "@/components/Modals/GroupModals/CreateNewGroupModal.tsx";

export default function GroupsListDesktopContentHeader() {
    return (
        <>
            <h1>Groups</h1>
            <Button style={{padding: "25px 30px"}} onClick={() => {
                // @ts-ignore
                ModalBoxes.open({
                    className: 'admin-confirmation',
                    title: 'Create a new group',
                    component: <CreateNewGroupModal />,
                });
            }}>+ Create a new group</Button>
        </>
    );
};