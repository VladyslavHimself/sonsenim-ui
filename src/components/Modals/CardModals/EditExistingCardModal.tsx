import {z} from "zod";
import {Form} from "@/components/ui/form.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {newCardConfigurationSchema} from "@/components/Modals/CardModals/newCardConfiguration.schema.ts";
import {NewCardConfigurationBody} from "@/api/cards/cards.ts";
import ModalBoxes from "@/ModalBoxes/ModalBoxes.tsx";
import ModalFormFieldInput from "@/components/Modals/ui/ModalFormFieldInput/ModalFormFieldInput.tsx";
import {CardTableEntity} from "@/pages/CardListPage.tsx";
import onEditCardMutation from "@/api/cards/onEditCardMutation.ts";

type Props = {
    card: CardTableEntity,
    deckId: string,
    modalBox?: any,
    refetchCardsFn: () => void
}

export default function EditExistingCardModal({ card, deckId, refetchCardsFn, modalBox }: Props) {
    const { primaryWord, explanation, definition, cardId } = card;
    const { updateCardMutation } = onEditCardMutation(() => {
        refetchCardsFn();
        modalBox.close();
    });
    const form = useForm<z.infer<typeof newCardConfigurationSchema>>({
        resolver: zodResolver(newCardConfigurationSchema),
        defaultValues: { primaryWord, definition, explanation }
    });

    return <>
        <ModalBoxes.Body>
            <Form {...form}>
                <form
                    id="edit-card-form"
                    onSubmit={form.handleSubmit((values: z.infer<typeof newCardConfigurationSchema>) =>
                        editCard(values as unknown as NewCardConfigurationBody))}
                >
                    <ModalFormFieldInput name="primaryWord" form={form.control} label="Word *" />
                    <ModalFormFieldInput style={{marginTop: 25}} name="definition" form={form.control} label="Definition *" />
                    <ModalFormFieldInput style={{marginTop: 25}} name="explanation" form={form.control} label="Description" />
                </form>
            </Form>
        </ModalBoxes.Body>
        <ModalBoxes.ConfirmFooter
            submitButtonProperties={{
                label: "Edit",
                formId: "edit-card-form",
            }}
        />
    </>

    function editCard(values: NewCardConfigurationBody) {
        updateCardMutation({
            deckId: deckId!,
            cardId: cardId as unknown as string,
            cardConfiguration: values
        });
    }
}