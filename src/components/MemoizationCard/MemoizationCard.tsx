import './MemoizationCard.scss';
import {useMemoizationPageState} from "@/pages/MemoizationPage/MemoizationPageProvider.tsx";

export default function MemoizationCard() {
    const { currentCard, currentStage } = useMemoizationPageState();

    return (
        <div className="memoization-card-container">
            <div className="memoization-card-word">{currentCard?.primaryWord}</div>
            { currentStage === 'isAnswerFulfilled' && (
                <>
                    <div className="memoization-card-flip-word">{currentCard?.definition}</div>
                    <div className="memoization-card-description">
                        {currentCard?.explanation}
                    </div>
                </>
            )}

        </div>
    );
}