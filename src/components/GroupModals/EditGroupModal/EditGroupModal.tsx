import {useForm} from "react-hook-form";
import {z} from "zod";
import {groupFieldsSchema} from "@/components/GroupModals/groupFields.schema.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";

type Props = {
    modalBox: {
        id: string,
        onClose: () => void,
    },
    refetchGroups: () => void,
}

export function EditGroupModal({ modalBox, refetchGroups }: Props) {

    const form = useForm<z.infer<typeof groupFieldsSchema>>({
        resolver: zodResolver(groupFieldsSchema)
    });


    return (
        <>
            <div className="create-new-group-modal modal-box-body">
                <Form {...form}>
                    <form id="create-group-form" onSubmit={form.handleSubmit((values: z.infer<typeof groupFieldsSchema>) => console.log(values.groupName))} style={{width: '100%'}}>
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