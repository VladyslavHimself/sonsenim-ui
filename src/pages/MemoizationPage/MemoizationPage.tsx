import MemoizationPageHeader from "@/components/MemoizationPageHeader/MemoizationPageHeader.tsx";
import MemoizationProgress from "@/components/MemoizationProgress/MemoizationProgress.tsx";
import {
    MemoizationPageStage,
    useMemoizationPageActions,
    useMemoizationPageState
} from "@/pages/MemoizationPage/MemoizationPageProvider.tsx";
import MemoizationCard from "@/components/MemoizationCard/MemoizationCard.tsx";
import {Button} from "@/components/ui/button.tsx";
import { LucideRotateCw, ThumbsDown, ThumbsUp } from "lucide-react";
import {isFunction} from "lodash";
// TODO: REMINDER - Implement query cache manager to get cached data from react-query

export default function MemoizationPage() {
    const { cardsTotal, resolvedCards, currentStage } = useMemoizationPageState();
    const { markCurrentCardAsCorrect, markCurrentCardAsFailed, setCurrentStage } = useMemoizationPageActions();


    function withSetNextStage(fn?: () => void) {
        isFunction(fn) && fn();
        setCurrentStage((prevState: MemoizationPageStage) =>
            prevState === 'isAnswerFulfilled' ? 'isPendingAnswer' : 'isAnswerFulfilled');
    }


    return (
        <div className="memoization-page layout-wrapper">
            <MemoizationPageHeader />
            <MemoizationProgress cardsTotal={cardsTotal} currentIndex={resolvedCards.length + 1} />
            <MemoizationCard />

            { currentStage === 'isPendingAnswer' &&
                (<div className="memoization-page-buttons">
                    <Button className="memoization-button"
                            onClick={() => withSetNextStage()}><LucideRotateCw /> Flip card</Button>
                </div>)
            }

            { currentStage === "isAnswerFulfilled" && (
                    <div className="memoization-page-buttons">
                        <Button className="memoization-button fail-button"
                                onClick={() => withSetNextStage(markCurrentCardAsFailed)}><ThumbsDown/></Button>
                        <Button className="memoization-button success-button"
                                onClick={() => withSetNextStage(markCurrentCardAsCorrect)}><ThumbsUp/></Button>
                    </div>)
            }
                </div>
            );
}