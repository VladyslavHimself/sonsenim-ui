import './CreateNewDeckModal.scss';
import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form.tsx";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {deckConfigurationFieldsSchema} from "@/components/DeckModals/deckConfigurationFields.schema.ts";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Separator} from "@radix-ui/react-separator";
import {ToggleGroup, ToggleGroupItem} from "@/components/ui/toggle-group.tsx";
import useAddDeckToGroupMutation from "@/api/decks/useAddDeckToGroupMutation.ts";
import {DeckConfigurationBody} from "@/api/decks/decks.ts";

type Props = {
    groupId: number,
    refetchDecks: () => void,
}

// @ts-ignore
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
            <div className="create-new-deck-modal modal-box-body">
                <Form {...form}>
                    <form id="create-deck-form"
                          onSubmit={form.handleSubmit((values: z.infer<typeof deckConfigurationFieldsSchema>) => addDeckToGroup({
                              groupId: groupId,
                              // TODO: Think about make randomized order by default & delete param
                              deckConfiguration: Object.assign(values as DeckConfigurationBody, { randomizedOrder: true })
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
                        <Separator className="my-6 h-1 bg-[#F0F0F0]" />
                        <div className="create-new-deck-quiz-modes">
                            <span>Modes</span>
                            <ToggleGroup defaultValue={['flashcardNormal']}  onValueChange={(values) => {
                                // TODO: Optimize later
                                form.setValue('flashcardNormal', !!values.find((value) => value === 'flashcardNormal'));
                                form.setValue('flashcardReversed', !!values.find((value) => value === 'flashcardReversed'));
                                form.setValue('flashcardTyping', !!values.find((value) => value === 'flashcardTyping'));
                            }} type="multiple" variant="outline">
                                    <ToggleGroupItem className="create-new-deck-quiz-modes-toggle-item"  value="flashcardNormal" aria-label="Toggle normal mode">
                                        Normal
                                    </ToggleGroupItem>
                                    <ToggleGroupItem className="create-new-deck-quiz-modes-toggle-item" value="flashcardReversed" aria-label="Toggle reversed mode">
                                        Reversed
                                    </ToggleGroupItem>
                                    <ToggleGroupItem className="create-new-deck-quiz-modes-toggle-item" value="flashcardTyping"  aria-label="Toggle typing mode">
                                        Typing
                                    </ToggleGroupItem>
                            </ToggleGroup>

                        </div>
                    </form>
                </Form>
            </div>
            <div className="create-new-group-modal-footer">
                <Button form="create-deck-form" type="submit" className="modal-confirm-button">Create</Button>
            </div>
        </>
    );
};