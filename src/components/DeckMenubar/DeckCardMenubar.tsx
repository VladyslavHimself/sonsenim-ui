import './DeckMenubar.scss';
import {Button} from "@/components/ui/button.tsx";
import {Brain, Download, Edit, List, PlusIcon, Upload} from "lucide-react";

export default function DeckCardMenubar() {
    return (
        <div className="deck-menubar-container">
            <Button variant="outline" className="menubar-list-item"><Brain /> Start Learning</Button>
            <Button variant="outline" className="menubar-list-item"><PlusIcon /> Add new card</Button>
            <Button variant="outline" className="menubar-list-item"><List />Card List</Button>
            <Button variant="outline" className="menubar-list-item"><Edit />Edit deck</Button>
            <Button disabled variant="outline" className="menubar-list-item"><Upload />Export cards</Button>
            <Button disabled variant="outline" className="menubar-list-item"><Download />Import cards</Button>
        </div>
    );
};