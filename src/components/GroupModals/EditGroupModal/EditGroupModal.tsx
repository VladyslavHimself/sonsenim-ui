import {useForm} from "react-hook-form";
import {z} from "zod";
import {groupFieldsSchema} from "@/components/GroupModals/groupFields.schema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {UserGroupsInfoResponse} from "@/api/groups/groups.ts";
import {Trash2Icon} from "lucide-react";
import {useDeleteUserGroupMutation} from "@/api/groups/useDeleteUserGroupMutation.ts";
import {useUpdateUserGroupMutation} from "@/api/groups/useUpdateUserGroupMutation.ts";

type Props = {
    currentGroup: UserGroupsInfoResponse,
    modalBox?: {
        id: string,
        close: () => void,
    },
    refetchGroups: () => void,
}

export function EditGroupModal({ modalBox, refetchGroups, currentGroup }: Props) {

    const { deleteUserGroup } = useDeleteUserGroupMutation(() => {
        refetchGroups();
        modalBox?.close();
    });

    const { updateUserGroup } = useUpdateUserGroupMutation(() => {
        refetchGroups();
        modalBox?.close();
    });


    const form = useForm<z.infer<typeof groupFieldsSchema>>({
        resolver: zodResolver(groupFieldsSchema),
        defaultValues: {
            groupName: currentGroup.groupName,
        }
    });


    return (
        <>
            <div className="create-new-group-modal modal-box-body">
                <Form {...form}>
                    <form id="create-group-form" onSubmit={form.handleSubmit((values: z.infer<typeof groupFieldsSchema>) => {
                        updateUserGroup({
                            groupId: currentGroup.groupId,
                            groupBody: values
                        });
                    })} style={{width: '100%'}}>
                        <FormField name="groupName" control={form.control} render={({field}) => (
                            <FormItem style={{width: 550}}>
                                <FormLabel className="create-new-group-modal-label">Group name <span style={{color: '#F18C29', fontSize: 24}}>*</span></FormLabel>
                                <FormControl>
                                    <Input className="create-new-group-modal-input" placeholder="Name your group here" {...field} />
                                </FormControl>
                            </FormItem>
                        )}/>
                    </form>
                </Form>
            </div>
            <div className="create-new-group-modal-footer">
                <Button
                    onClick={() => deleteUserGroup(currentGroup.groupId)}
                    form="create-group-form"
                    type="submit"
                    className="modal-cancel-button"
                ><Trash2Icon /></Button>
                <Button
                    disabled={form.getValues().groupName === currentGroup.groupName}
                    form="create-group-form"
                    type="submit"
                    className="modal-confirm-button"
                >Edit</Button>
            </div>
        </>
    );
};