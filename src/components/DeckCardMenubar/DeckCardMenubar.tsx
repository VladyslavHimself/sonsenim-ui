import './DeckMenubar.scss';
import {Button} from "@/components/ui/button.tsx";
import {Brain, Download, Edit, List, PlusIcon, Upload} from "lucide-react";
import ModalBoxes from "@/ModalBoxes/ModalBoxes.tsx";
import EditDeckModal from "@/components/Modals/DeckModals/EditDeckModal.tsx";
import AddNewCardModal from "@/components/Modals/CardModals/AddNewCardModal.tsx";
import {NavigateFunction} from "react-router-dom";

type Props = {
    modalBox?: any,
    groupId: string,
    groupName?: string,
    deckProperties: any,
    refetchDecks: () => void,
    navigate: NavigateFunction,
}


export default function DeckCardMenubar({ modalBox, deckProperties, refetchDecks, groupId, navigate }: Props) {
    return (
        <div className="deck-menubar-container">
            <Button variant="outline" className="menubar-list-item" onClick={openMemoizationPage}><Brain /> Start Learning</Button>
            <Button variant="outline" className="menubar-list-item" onClick={onAddNewCardHandle}><PlusIcon /> Add new card</Button>
            <Button variant="outline" className="menubar-list-item" onClick={openCardListPage}><List />Card List</Button>
            <Button variant="outline" className="menubar-list-item" onClick={onEditDeckHandle}><Edit />Edit deck</Button>
            <Button disabled variant="outline" className="menubar-list-item"><Upload />Export cards</Button>
            <Button disabled variant="outline" className="menubar-list-item"><Download />Import cards</Button>
        </div>
    );

    function onEditDeckHandle() {
        ModalBoxes.open({
            className: 'edit-deck-modal',
            title: 'Edit deck',
            component: <EditDeckModal deckProperties={deckProperties} refetchDecks={refetchDecks} />,
            onClose: () => {}
        })
        modalBox.close();
    }

    function onAddNewCardHandle() {
        ModalBoxes.open({
            className: 'add-new-card-modal',
            title: 'Add new card',
            component: <AddNewCardModal deckId={deckProperties.id} refetchDecks={refetchDecks} />,
            onClose: () => {}
        })
        modalBox.close();
    }

    function openCardListPage() {
        navigate(`/groups/${groupId}/card-list/${deckProperties.id}`);
        modalBox.close();
    }

    function openMemoizationPage() {
        navigate(`/memoization/${deckProperties.id}`);
        modalBox.close();
    }
}