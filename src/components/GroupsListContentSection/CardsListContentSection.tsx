import './GroupsContentSection.scss';
import {ReactNode} from "react";


type Props = {
    children: ReactNode;
    Header: any;
}

// TODO: Header component with/without additional button
export default function CardsListContentSection({ children, Header}: Props) {


    return (
        <div className="cardsList-content-section">
            <div className="cardsList-content-section-header">
                <Header />
            </div>

            <div className="cardList-content-section-cards">
                { children }
            </div>
        </div>
    );


};