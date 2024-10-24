import MemoizationPageHeader from "@/components/MemoizationPageHeader/MemoizationPageHeader.tsx";
import MemoizationProgress from "@/components/MemoizationProgress/MemoizationProgress.tsx";
import {
    IS_CARD_FLIPPED,
    IS_PENDING_ANSWER, IS_REGULAR_TEST,
    useMemoizationPageActions,
    useMemoizationPageState
} from "@/pages/MemoizationPage/MemoizationPageProvider.tsx";
import MemoizationCard from "@/components/MemoizationCard/MemoizationCard.tsx";
import {Button} from "@/components/ui/button.tsx";
import { LucideRotateCw, ThumbsDown, ThumbsUp} from "lucide-react";
import {isFunction} from "lodash";
import {CardChoiceFlowResolveType} from "@/pages/MemoizationPage/useDueCardsStack.ts";
// TODO: REMINDER - Implement query cache manager to get cached data from react-query

const ERROR_CORRECTION_BUTTONS_CONFIGURATION: CardChoiceFlowResolveType = { isServerShouldUpdate: false }
const REGULAR_TEST_BUTTONS_CONFIGURATION: CardChoiceFlowResolveType = { isServerShouldUpdate: true }

export default function MemoizationPage() {
    const { cardsTotal, resolvedCards, currentTestStage, currentCardFlowStage} = useMemoizationPageState();
    const { markCurrentCardAsCorrect, markCurrentCardAsFailed, setCurrentCardFlowStage } = useMemoizationPageActions();

    const buttonsConfiguration = currentTestStage === IS_REGULAR_TEST ? REGULAR_TEST_BUTTONS_CONFIGURATION
        : ERROR_CORRECTION_BUTTONS_CONFIGURATION;

    return (
        <div className="memoization-page layout-wrapper">
            <MemoizationPageHeader />
            <MemoizationProgress cardsTotal={cardsTotal} currentIndex={resolvedCards.length + 1} />
            <MemoizationCard />

            { currentCardFlowStage === IS_PENDING_ANSWER &&
                (<div className="memoization-page-buttons">
                    <Button className="memoization-button"
                            onClick={() => setFlippedStatus()}><LucideRotateCw /> Flip card</Button>
                </div>)
            }

            { currentCardFlowStage === IS_CARD_FLIPPED && (
                    <div className="memoization-page-buttons">
                        <Button className="memoization-button fail-button"
                                onClick={() => withSetNextStage(setPendingAnswerStatus,
                                     () => markCurrentCardAsFailed(buttonsConfiguration))}><ThumbsDown/></Button>
                        <Button className="memoization-button success-button"
                                onClick={() => withSetNextStage(setPendingAnswerStatus,
                                    () => markCurrentCardAsCorrect(buttonsConfiguration))}><ThumbsUp/></Button>
                    </div>)
            }
                </div>
            );

    function setFlippedStatus() { setCurrentCardFlowStage(IS_CARD_FLIPPED); }
    function setPendingAnswerStatus() { setCurrentCardFlowStage(IS_PENDING_ANSWER); }
}

function withSetNextStage(setStage: () => void, fn?: () => void) {
    isFunction(setStage) && setStage();
    isFunction(fn) && fn();
}