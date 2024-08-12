import {z} from "zod";
import {Form} from "@/components/ui/form.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {newCardConfigurationSchema} from "@/components/Modals/CardModals/newCardConfiguration.schema.ts";
import onAddNewCardMutation from "@/api/cards/onAddNewCardMutation.ts";
import {NewCardConfigurationBody} from "@/api/cards/cards.ts";
import ModalBoxes from "@/ModalBoxes/ModalBoxes.tsx";
import ModalFormFieldInput from "@/components/Modals/ui/ModalFormFieldInput/ModalFormFieldInput.tsx";

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
        form.setValue('explanation', '')
    });
    const form = useForm<z.infer<typeof newCardConfigurationSchema>>({
        resolver: zodResolver(newCardConfigurationSchema)
    });

    return <>
        <ModalBoxes.Body>
            <Form {...form}>
                <form
                    id="add-new-card-form"
                    onSubmit={form.handleSubmit((values: z.infer<typeof newCardConfigurationSchema>) =>
                        createNewCard(values as unknown as NewCardConfigurationBody))}
                >
                    <ModalFormFieldInput name="primaryWord" form={form.control} label="Word *" />
                    <ModalFormFieldInput style={{marginTop: 25}} name="definition" form={form.control} label="Definition *" />
                    <ModalFormFieldInput style={{marginTop: 25}} name="explanation" form={form.control} label="Description *" />
                </form>
            </Form>
        </ModalBoxes.Body>
        <ModalBoxes.ConfirmFooter
            submitButtonProperties={{
                label: "Add new card",
                formId: "add-new-card-form",
            }}
        />
    </>

    function createNewCard(values: NewCardConfigurationBody) {
        addNewCard({
            deckId: deckId,
            cardConfiguration: values
        });
    }
}