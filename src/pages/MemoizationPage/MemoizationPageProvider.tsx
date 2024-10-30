import React, {PropsWithChildren, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import useDeck from "@/api/decks/useDeck.ts";
import useDueCardsStack from "@/pages/MemoizationPage/useDueCardsStack.ts";
import {
    IS_ERROR_CORRECTION,
    IS_PENDING_ANSWER,
    IS_REGULAR_TEST
} from "@/pages/MemoizationPage/memoizationPage.constants.ts";
import {MemoizationPageStage, MemoizationProgressStage} from "@/pages/MemoizationPage/memoizationPage.types.ts";


// TODO: Add types later
const MemoizationPageStateContext = React.createContext<any>(null);
const MemoizationPageActionsContext = React.createContext<any>(null);

export default function MemoizationPageProvider({ children }: PropsWithChildren) {
    const [currentCardFlowStage, setCurrentCardFlowStage] = useState<MemoizationPageStage>(IS_PENDING_ANSWER);
    const [currentTestStage, setCurrentTestStage] = useState<MemoizationProgressStage>(IS_REGULAR_TEST);
    const { deckId } = useParams();
    const { deck } = useDeck(deckId!);
    const { currentCard,
        dueCards,
        setDueCards,
        resolvedCards,
        setResolvedCards,
        cardsTotal,
        setCardsTotal,
        cardsToRepeat,
        setCardsToRepeat,
        markCurrentCardAsCorrect,
        markCurrentCardAsFailed,
    } = useDueCardsStack();

    useEffect(() => {
        if (dueCards.length === 0 && cardsToRepeat.length) {
            setCurrentTestStage(IS_ERROR_CORRECTION);
            setDueCards([...cardsToRepeat]);
            setCardsTotal(cardsToRepeat.length);
            setResolvedCards([]);
            setCardsToRepeat([]);
        }
    }, [cardsToRepeat, dueCards, setCardsToRepeat, setCardsTotal, setDueCards, setResolvedCards]);

    return (
        <MemoizationPageStateContext.Provider value={{
            deck,
            dueCards,
            currentCard,
            currentCardFlowStage,
            currentTestStage,
            resolvedCards,
            cardsTotal
        }}>
            <MemoizationPageActionsContext.Provider value={{
                markCurrentCardAsCorrect,
                markCurrentCardAsFailed,
                setCurrentCardFlowStage
            }}>
                {children}
            </MemoizationPageActionsContext.Provider>
        </MemoizationPageStateContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useMemoizationPageState() {
    const context = React.useContext(MemoizationPageStateContext);
    if (context === 'undefined') throw new Error('useMemoizationPageState must be used within MemoizationPageProvider');
    return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useMemoizationPageActions() {
    const context = React.useContext(MemoizationPageActionsContext);
    if (context === 'undefined') throw new Error('useMemoizationPageActions must be used within MemoizationPage');
    return context;
}