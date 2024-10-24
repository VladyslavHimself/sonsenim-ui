import React, {ReactNode, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import useDeck from "@/api/decks/useDeck.ts";
import useDueCardsStack from "@/pages/MemoizationPage/useDueCardsStack.ts";


// TODO: Add types later
const MemoizationPageStateContext = React.createContext<any>(null);
const MemoizationPageActionsContext = React.createContext<any>(null);


export type MemoizationProgressStage = 'IS_ERROR_CORRECTION' | 'IS_REGULAR_TEST';

export const IS_ERROR_CORRECTION: MemoizationProgressStage = "IS_ERROR_CORRECTION";
export const IS_REGULAR_TEST: MemoizationProgressStage = "IS_REGULAR_TEST";

export type MemoizationPageStage = 'isPendingAnswer' | 'isCardFlipped';
export const IS_PENDING_ANSWER: MemoizationPageStage = 'isPendingAnswer';
export const IS_CARD_FLIPPED: MemoizationPageStage = 'isCardFlipped';


type Props = {
    children: ReactNode;
}

export default function MemoizationPageProvider({ children }: Props) {
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