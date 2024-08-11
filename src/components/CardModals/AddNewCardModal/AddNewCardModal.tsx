import {z} from "zod";
import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {newCardConfigurationSchema} from "@/components/CardModals/AddNewCardModal/newCardConfiguration.schema.ts";
import {Button} from "@/components/ui/button.tsx";
import onAddNewCardMutation from "@/api/cards/onAddNewCardMutation.ts";
import {NewCardConfigurationBody} from "@/api/cards/cards.ts";

type Props = {
    deckId: number,
    modalBox?: any,
    refetchDecks: () => void
}

export default function AddNewCardModal({ deckId, refetchDecks }: Props) {
    const { addNewCard } = onAddNewCardMutation(() => {
        refetchDecks();
        form.setValue('primaryWord', '')
        form.setValue('definition', '')
        form.setValue('description', '')
    });
    const form = useForm<z.infer<typeof newCardConfigurationSchema>>({
        resolver: zodResolver(newCardConfigurationSchema)
    });

    return <>
        <div className="create-new-deck-modal modal-box-body">
            <Form {...form}>
                <form
                    id="add-new-card-form"
                    onSubmit={form.handleSubmit((values: z.infer<typeof newCardConfigurationSchema>) =>
                        createNewCard(values as unknown as NewCardConfigurationBody))}>
                    <FormField name="primaryWord" control={form.control} render={({field}) => (
                        <FormItem style={{ marginTop: 15}}>
                            <FormLabel className="auth-container-input-label">Word *</FormLabel>
                            <FormControl>
                                <Input className="auth-container-input" {...field} />
                            </FormControl>
                        </FormItem>
                    )}/>

                    <FormField name="definition" control={form.control} render={({field}) => (
                        <FormItem style={{marginTop: 15}}>
                            <FormLabel className="auth-container-input-label">Definition *</FormLabel>
                            <FormControl>
                                <Input className="auth-container-input" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                    />

                    <FormField name="description" control={form.control} render={({field}) => (
                        <FormItem style={{marginTop: 15}}>
                            <FormLabel className="auth-container-input-label">Description</FormLabel>
                            <FormControl>
                                <Input className="auth-container-input" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                    />
                </form>
            </Form>
        </div>

        <div className="create-new-group-modal-footer">
            <Button
                form="add-new-card-form"
                type="submit"
                className="modal-confirm-button"
            >Add new card</Button>
        </div>
    </>


    function createNewCard(values: NewCardConfigurationBody) {
        addNewCard({
            deckId: deckId,
            cardConfiguration: values
        });
    }
}