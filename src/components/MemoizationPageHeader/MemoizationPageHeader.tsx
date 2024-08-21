import './MemoizationPageHeader.scss';
import {Button} from "@/components/ui/button.tsx";
import {House} from "lucide-react";
import {useLocation, useNavigate} from "react-router-dom";
import {useQueryClient} from "@tanstack/react-query";


export default function MemoizationPageHeader() {
    const navigate = useNavigate();
    const location = useLocation();
    const query = useQueryClient();


    const deck = query.getQueryData(['aggregated-decks', location.state.groupId]);

    console.log(deck);

    return (
        <div className="memoization-page-header">
            <Button style={{padding: '25px 15px'}}
                    onClick={() => navigate('/dashboard', { replace: true })}>
                <House size={25} />
            </Button>
            <h2>{  }</h2>
            <Button>Finish</Button>
        </div>
    );
};