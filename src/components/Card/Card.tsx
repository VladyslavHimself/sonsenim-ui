import './Card.scss';
import GroupImageExample from "@/assets/Icons/Groups/group-image-example.png";

import {Pencil} from "lucide-react";
import {useState} from "react";


type Props = {
    groupId?: string;
    groupName: string;
    decksCount: number;
}

export default function Card({ groupName, decksCount}: Props) {
    // TODO: Make it with ref
    const [isEditVisible, setIsEditVisible] = useState<boolean>(false);

    return (
        <div className="group-card"
             onMouseEnter={() => setIsEditVisible(true)}
             onMouseLeave={() => {setIsEditVisible(false)}}
        >
            <div className="group-card-info">
                <div className="group-card-info-title">
                    <div>{groupName}</div>
                    { isEditVisible && <Pencil width={20} height={20} onClick={() => console.log('edit')}/> }
                </div>
                <div>{decksCount} decks</div>
            </div>
            <div className="group-card-image">
                <img src={GroupImageExample} alt=""/>
            </div>
        </div>
    );
};