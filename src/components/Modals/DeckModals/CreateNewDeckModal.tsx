import {Form} from "@/components/ui/form.tsx";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {deckConfigurationFieldsSchema} from "@/components/Modals/DeckModals/deckConfigurationFields.schema.ts";
import {Separator} from "@radix-ui/react-separator";
import useAddDeckToGroupMutation from "@/api/decks/useAddDeckToGroupMutation.ts";
import {DeckConfigurationBody} from "@/api/decks/decks.ts";
import ModalBoxes from "@/ModalBoxes/ModalBoxes.tsx";
import ModalFormFieldInput from "@/components/Modals/ui/ModalFormFieldInput/ModalFormFieldInput.tsx";
import {ModesToggleGroup} from "@/components/Modals/ui/ModesToggleGroup/ModesToggleGroup.tsx";

type Props = {
    modalBox?: any
    groupId: number,
    refetchDecks: () => void,
}

export default function CreateNewDeckModal({ groupId, refetchDecks, modalBox }: Props) {
    const { addDeckToGroup } = useAddDeckToGroupMutation(() => {
        refetchDecks();
        modalBox.close();
    });

    const form = useForm<z.infer<typeof deckConfigurationFieldsSchema>>({
        resolver: zodResolver(deckConfigurationFieldsSchema)
    });

    return (
        <>
            <ModalBoxes.Body>
                <Form {...form}>
                    <form id="create-deck-form"
                          onSubmit={form.handleSubmit((values: z.infer<typeof deckConfigurationFieldsSchema>) => addDeckToGroup({
                              groupId: groupId,
                              // TODO: Think about make randomized order by default & delete param
                              deckConfiguration: Object.assign(values as DeckConfigurationBody, { randomizedOrder: true })
                          }))}
                    >
                        <ModalFormFieldInput
                            name="deckName" form={form.control}
                            label="Deck Name" isRequired
                            placeholder="Animals and fruits"
                        />
                        <Separator className="my-6 h-1 bg-[#F0F0F0]" />
                        <ModesToggleGroup defaultValues={['flashcardNormal']} form={form} />
                    </form>
                </Form>
            </ModalBoxes.Body>
            <ModalBoxes.ModalFooter
                submitButtonProperties={{
                    label: 'Create',
                    formId: 'create-deck-form',
                }}
            />
        </>
    );
};