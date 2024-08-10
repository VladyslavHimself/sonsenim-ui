import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form.tsx";
import {z} from "zod";
import {deckConfigurationFieldsSchema} from "@/components/DeckModals/deckConfigurationFields.schema.ts";
import {Input} from "@/components/ui/input.tsx";
import {Separator} from "@radix-ui/react-separator";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {DeckModes, DeckWithAggregatedDataResponse} from "@/api/decks/decks.ts";
import {useMemo} from "react";
import {Trash2Icon} from "lucide-react";
import useUpdateDeckMutation from "@/api/decks/useUpdateDeckMutation.ts";
import useDeleteDeckMutation from "@/api/decks/useDeleteDeckMutation.ts";
type Props = {
    deckProperties: DeckWithAggregatedDataResponse,
    refetchDecks: () => void,
    modalBox?: any
}

// TODO: Approximate with "CreateNewDeckModal" & "AddNewCardModal"
export default function EditDeckModal({ deckProperties, refetchDecks, modalBox }: Props) {
    const { deleteDeck } = useDeleteDeckMutation(() => {
        refetchDecks();
        modalBox.close();
    });

    const { updateDeck } = useUpdateDeckMutation(() => {
        refetchDecks();
        modalBox.close();
    });

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
            };
        }

        return defValues;
    }, [deckProperties]);

    return (
        <>
            <div className="create-new-deck-modal modal-box-body">
                <Form {...form}>
                    <form id="edit-deck-form"
                          onSubmit={form.handleSubmit((values: z.infer<typeof deckConfigurationFieldsSchema>) => updateDeck({
                              deckId: deckProperties.id,
                              deckConfiguration: Object.assign(values, { randomizedOrder: true })
                          }))}
                          style={{width: '100%'}}>
                        <FormField name="deckName" control={form.control} render={({field}) => (
                            <FormItem style={{width: 550}}>
                                <FormLabel className="create-new-group-modal-label">Deck name <span
                                    style={{color: '#F18C29', fontSize: 24}}>*</span></FormLabel>
                                <FormControl>
                                    <Input className="create-new-group-modal-input"
                                           placeholder="Animals and fruits" {...field} />
                                </FormControl>
                            </FormItem>
                        )}/>
                        <Separator className="my-6 h-1 bg-[#F0F0F0]"/>
                        <div className="create-new-deck-quiz-modes">
                            <span>Modes</span>
                            <ToggleGroup defaultValue={defaultToggleValues} onValueChange={(values) => {
                                // TODO: Optimize later
                                form.setValue('flashcardNormal', !!values.find((value) => value === 'flashcardNormal'));
                                form.setValue('flashcardReversed', !!values.find((value) => value === 'flashcardReversed'));
                                form.setValue('flashcardTyping', !!values.find((value) => value === 'flashcardTyping'));
                            }} type="multiple" variant="outline">
                                <ToggleGroupItem className="create-new-deck-quiz-modes-toggle-item"
                                                 value="flashcardNormal" aria-label="Toggle normal mode">
                                    Normal
                                </ToggleGroupItem>
                                <ToggleGroupItem className="create-new-deck-quiz-modes-toggle-item"
                                                 value="flashcardReversed" aria-label="Toggle reversed mode">
                                    Reversed
                                </ToggleGroupItem>
                                <ToggleGroupItem className="create-new-deck-quiz-modes-toggle-item"
                                                 value="flashcardTyping" aria-label="Toggle typing mode">
                                    Typing
                                </ToggleGroupItem>
                            </ToggleGroup>
                        </div>
                    </form>
                </Form>
            </div>
            <div className="create-new-group-modal-footer">
                <Button
                    onClick={() => deleteDeck(deckProperties.id)}
                    className="modal-cancel-button"
                ><Trash2Icon/></Button>
                <Button
                    // disabled={form.getValues().deckName === deckProperties.deckName}
                    form="edit-deck-form"
                    type="submit"
                    className="modal-confirm-button"
                >Edit</Button>
            </div>
        </>
    );
};