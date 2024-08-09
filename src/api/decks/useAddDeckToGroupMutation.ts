import {useMutation} from "@tanstack/react-query";
import {DeckConfigurationBody, DecksApi} from "@/api/decks/decks.ts";
import {toast} from "@/components/ui/use-toast.ts";


export default function useAddDeckToGroupMutation(callback: Function) {
    const { mutate: addDeckToGroup } = useMutation({
        mutationKey: ['add-deck-to-group'],
        mutationFn: (variables: {groupId: number, deckConfiguration: DeckConfigurationBody}) =>
            DecksApi.addDeckToGroup(variables.groupId, variables.deckConfiguration).then(({ data }) => data),
        onSuccess: (data, variables, context) => {
            callback(data, variables, context);
        },
        onError: () =>
            toast({
                variant: 'destructive',
                title: "Deck creation failed",
                description: "Deck not created, please try again later"
            })
    });

    return { addDeckToGroup };
};