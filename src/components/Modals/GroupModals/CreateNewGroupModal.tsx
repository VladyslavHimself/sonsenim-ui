import {z} from "zod";
import {Form} from "@/components/ui/form.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useCreateUserGroupMutation} from "@/api/groups/useCreateUserGroupMutation.ts";
import {groupFieldsSchema} from "@/components/Modals/GroupModals/groupFields.schema.ts";
import ModalBoxes from "@/ModalBoxes/ModalBoxes.tsx";
import ModalFormFieldInput from "@/components/Modals/ui/ModalFormFieldInput/ModalFormFieldInput.tsx";
import useUserGroupsInfo from "@/api/groups/useUserGroupsInfo.ts";

type Props = {
    modalBox?: {
        close: () => void;
        id: string,
    }
}

export default function CreateNewGroupModal({ modalBox }: Props) {
    const { refetch } = useUserGroupsInfo();
    const { createUserGroup } = useCreateUserGroupMutation(() => {
        modalBox!.close()
        refetch();
    });
    const form = useForm<z.infer<typeof groupFieldsSchema>>({
        resolver: zodResolver(groupFieldsSchema)
    });

    return (
        <>
            <ModalBoxes.Body>
                <Form {...form}>
                    <form id="create-group-form" onSubmit={
                        form.handleSubmit((values: z.infer<typeof groupFieldsSchema>) =>
                            createUserGroup(values.groupName))} style={{width: '100%'}}
                    >
                        <ModalFormFieldInput
                            name="groupName" form={form}
                            label="Group name" isRequired
                            placeholder="Spanish"
                        />
                    </form>
                </Form>
            </ModalBoxes.Body>

            <ModalBoxes.ModalFooter
                submitButtonProperties={{
                    label: 'Create',
                    formId: 'create-group-form'
                }}
            />
        </>
    );
};