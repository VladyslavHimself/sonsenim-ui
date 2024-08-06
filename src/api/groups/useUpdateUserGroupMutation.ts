import {useMutation} from "@tanstack/react-query";
import {useToast} from "@/components/ui/use-toast.ts";
import {GroupsApi} from "@/api";
import {EditGroupConfigurationBody} from "@/api/groups/groups.ts";

type MutationParams = {
    groupId: number,
    groupBody: EditGroupConfigurationBody
}

export function useUpdateUserGroupMutation(callback: Function) {
    const { toast } = useToast();
    const { mutate: updateUserGroup } = useMutation({
        mutationKey: ['update-user-group'],
        mutationFn: ({groupId, groupBody}: MutationParams) => GroupsApi.updateUserGroup(groupId, groupBody).then(({data}) => data),
        onSuccess: (data, variables, context) => {
            callback(data, variables, context);
        },
        onError: () =>
            toast({
                variant: 'destructive',
                title: "Group edit failed",
                description: "Error while editing user group"
            })
    });

    return { updateUserGroup };
}