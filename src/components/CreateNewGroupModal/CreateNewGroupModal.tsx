import './CreateNewGroupModal.scss';
import {Button} from "@/components/ui/button.tsx";
import {z} from "zod";
import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/ui/input.tsx";
import {useCreateUserGroupMutation} from "@/api/groups/useCreateUserGroupMutation.ts";



// TODO: REMINDER
//      Add description and image drop-place after realization in server-side

const createGroupSchema = z.object({
    groupName: z.string().min(4),
    // description: z.string()
});


export default function CreateNewGroupModal() {
    const { createUserGroup } = useCreateUserGroupMutation(() => {

    });
    const form = useForm<z.infer<typeof createGroupSchema>>({
        resolver: zodResolver(createGroupSchema)
    })

    return (
        <>
            <div className="create-new-group-modal modal-box-body">
                <Form {...form}>
                    <form id="create-group-form" onSubmit={form.handleSubmit((values: z.infer<typeof createGroupSchema>) => createUserGroup(values.groupName))} style={{width: '100%'}}>
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
                <Button form="create-group-form" type="submit" className="modal-confirm-button">Create</Button>
            </div>
        </>
    );
};