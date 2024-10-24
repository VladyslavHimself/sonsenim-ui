import './MemoizationPageHeader.scss';
import {Button} from "@/components/ui/button.tsx";
import {House} from "lucide-react";
import {useNavigate} from "react-router-dom";
import {
    IS_REGULAR_TEST,
    useMemoizationPageState
} from "@/pages/MemoizationPage/MemoizationPageProvider.tsx";

export default function MemoizationPageHeader() {
    const navigate = useNavigate();
    const { deck, currentTestStage } = useMemoizationPageState();

    const headerTitle = currentTestStage === IS_REGULAR_TEST ? deck?.deckName : "Error Correction";

    return (
        <div className="memoization-page-header">
            <Button style={{padding: '25px 15px'}}
                    onClick={() => navigate('/dashboard', { replace: true })}>
                <House size={25} />
            </Button>
            <h2>{ headerTitle }</h2>
            <Button>Finish</Button>
        </div>
    );
}