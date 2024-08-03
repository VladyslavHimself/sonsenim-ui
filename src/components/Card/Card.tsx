import './Card.scss';
import GroupImageExample from "@/assets/Icons/Groups/group-image-example.png";

export default function Card() {
    return (
        <div className="group-card">
            <div className="group-card-info">
                <div>Japanese</div>
                <div>12 decks</div>
            </div>
            <div className="group-card-image">
                <img src={GroupImageExample} alt=""/>
            </div>
        </div>
    );
};