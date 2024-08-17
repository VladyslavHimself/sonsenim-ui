import {Form} from "@/components/ui/form.tsx";
import {z} from "zod";
import {deckConfigurationFieldsSchema} from "@/components/Modals/DeckModals/deckConfigurationFields.schema.ts";
import {Separator} from "@radix-ui/react-separator";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {DeckModes, DeckWithAggregatedDataResponse} from "@/api/decks/decks.ts";
import {useMemo} from "react";
import useUpdateDeckMutation, {EditDeckMutationVariables} from "@/api/decks/useUpdateDeckMutation.ts";
import useDeleteDeckMutation from "@/api/decks/useDeleteDeckMutation.ts";
import ModalBoxes from "@/ModalBoxes/ModalBoxes.tsx";
import {Trash2Icon} from "lucide-react";
import ModalFormFieldInput from "@/components/Modals/ui/ModalFormFieldInput/ModalFormFieldInput.tsx";
import {ModesToggleGroup} from "@/components/Modals/ui/ModesToggleGroup/ModesToggleGroup.tsx";
type Props = {
    deckProperties: DeckWithAggregatedDataResponse,
    refetchDecks: () => void,
    modalBox?: any
}
export default function EditDeckModal({ deckProperties, refetchDecks, modalBox }: Props) {
    const { deleteDeck } = useDeleteDeckMutation(onMakeModalAction);
    const { updateDeck } = useUpdateDeckMutation(onMakeModalAction);

    const form = useForm<z.infer<typeof deckConfigurationFieldsSchema>>({
        resolver: zodResolver(deckConfigurationFieldsSchema),
        defaultValues: {
            deckName: deckProperties.deckName,
            flashcardNormal: deckProperties.flashcardNormal,
            flashcardReversed: deckProperties.flashcardReversed,
            flashcardTyping: deckProperties.flashcardTyping
        }
    });

    const defaultToggleValues = useMemo(() => {
        const defValues = [];

        for (const key in deckProperties) {
            if (deckProperties[key as keyof DeckModes]) {
                defValues.push(key);
            }
        }

        return defValues;
    }, [deckProperties]);

    return (
        <>
            <ModalBoxes.Body>
                <Form {...form}>
                    <form id="edit-deck-form"
                          onSubmit={form.handleSubmit((values: z.infer<typeof deckConfigurationFieldsSchema>) => updateDeck({
                              deckId: deckProperties.id,
                              deckConfiguration: Object.assign(values, { randomizedOrder: true })
                          } as EditDeckMutationVariables))}
                    >
                        <ModalFormFieldInput
                            name="deckName" form={form.control}
                            label="Deck Name" isRequired
                            placeholder="Animals and fruits"
                        />
                        <Separator className="my-6 h-1 bg-[#F0F0F0]"/>
                        <ModesToggleGroup defaultValues={defaultToggleValues} form={form} />
                    </form>
                </Form>
            </ModalBoxes.Body>

            <ModalBoxes.ModalFooter
                closeButtonProperties={{
                    label: <Trash2Icon />,
                    action: () => deleteDeck(deckProperties.id)
                }}
                submitButtonProperties={{
                    label: 'Edit',
                    formId: 'edit-deck-form',
                }}
            />
        </>
    );

    function onMakeModalAction() {
        refetchDecks();
        modalBox.close();
    }
};