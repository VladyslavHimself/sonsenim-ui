import ModalBoxes from "@/ModalBoxes/ModalBoxes.tsx";
import './RemoveCardConfirmModal.scss';
import useRemoveCardMutation from "@/api/cards/useRemoveCardMutation.ts";

type Props = {
    deckId: string;
    cardId: string;
    modalBox?: any;
}

export default function RemoveCardConfirmModal({ deckId, cardId, modalBox }: Props) {
    const { removeCard } = useRemoveCardMutation(() => {
        modalBox.close();
    })

    return (
        <ModalBoxes.Body>
            <p>
                Are you sure, that you want to delete this card?<br />
                All your progress will be lose
            </p>
            <ModalBoxes.ConfirmFooter
                confirmButtonProperties={{
                    label: "Delete",
                    action: () => removeCard({ deckId, cardId }),
                    className: 'remove-card-confirm-modal-button',
            }}/>
        </ModalBoxes.Body>
    );
};