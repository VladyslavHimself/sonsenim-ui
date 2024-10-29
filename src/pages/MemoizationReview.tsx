import '@/styles/layout-wrapper.styles.scss';
import {Button} from "@/components/ui/button.tsx";
import {House} from "lucide-react";
import {useNavigate} from "react-router-dom";

export default function MemoizationReview() {
    const navigate = useNavigate();
    return (
        <div className="memoization-page layout-wrapper">
            <div className="memoization-page-header">
                <Button style={{padding: '25px 15px'}}
                        onClick={() => navigate('/dashboard', {replace: true})}>
                    <House size={25}/>
                </Button>
                <h2>The test had been completed!</h2>
                <div></div>
            </div>

        </div>
    );
}
