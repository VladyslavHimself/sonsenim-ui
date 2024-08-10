import './DeckMenubar.scss';
import {Button} from "@/components/ui/button.tsx";
import {Brain, Download, Edit, List, PlusIcon, Upload} from "lucide-react";
import ModalBoxes from "@/modals/ModalBoxes.tsx";
import EditDeckModal from "@/components/DeckModals/EditDeckModal/EditDeckModal.tsx";
import AddNewCardModal from "@/components/CardModals/AddNewCardModal/AddNewCardModal.tsx";

// @ts-ignore
export default function DeckCardMenubar({ modalBox, deckProperties, refetchDecks }) {
    return (
        <div className="deck-menubar-container">
            <Button variant="outline" className="menubar-list-item"><Brain /> Start Learning</Button>
            <Button variant="outline" className="menubar-list-item" onClick={onAddNewCardHandle}><PlusIcon /> Add new card</Button>
            <Button variant="outline" className="menubar-list-item"><List />Card List</Button>
            <Button variant="outline" className="menubar-list-item" onClick={onEditDeckHandle}><Edit />Edit deck</Button>
            <Button disabled variant="outline" className="menubar-list-item"><Upload />Export cards</Button>
            <Button disabled variant="outline" className="menubar-list-item"><Download />Import cards</Button>
        </div>
    );

    function onEditDeckHandle() {
        ModalBoxes.open({
            className: 'edit-deck-modal',
            title: 'Edit deck',
            component: <EditDeckModal deckProperties={deckProperties} refetchDecks={refetchDecks} />
        })
        modalBox.close();
    }

    function onAddNewCardHandle() {
        ModalBoxes.open({
            className: 'add-new-card-modal',
            title: 'Add new card',
            component: <AddNewCardModal deckId={deckProperties.id} refetchDecks={refetchDecks} />
        })
        modalBox.close();
    }
};