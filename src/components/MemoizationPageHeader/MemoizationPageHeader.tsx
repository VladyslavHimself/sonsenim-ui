import './MemoizationPageHeader.scss';
import {Button} from "@/components/ui/button.tsx";
import {House} from "lucide-react";
import {useNavigate} from "react-router-dom";
import {useMemoizationPageState} from "@/pages/MemoizationPage/MemoizationPageProvider.tsx";

export default function MemoizationPageHeader() {
    const navigate = useNavigate();
    const { deck } = useMemoizationPageState();
    

    return (
        <div className="memoization-page-header">
            <Button style={{padding: '25px 15px'}}
                    onClick={() => navigate('/dashboard', { replace: true })}>
                <House size={25} />
            </Button>
            <h2>{ deck?.deckName }</h2>
            <Button>Finish</Button>
        </div>
    );
}