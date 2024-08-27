import React, {ReactNode, useState} from "react";
import {useParams} from "react-router-dom";
import useDeck from "@/api/decks/useDeck.ts";
import useDueCardsStack from "@/pages/MemoizationPage/useDueCardsStack.ts";


// TODO: Add types later
const MemoizationPageStateContext = React.createContext<any>(null);
const MemoizationPageActionsContext = React.createContext<any>(null);


export type MemoizationPageStage = 'isPendingAnswer' | 'isAnswerFulfilled';

type Props = {
    children: ReactNode;
}

export default function MemoizationPageProvider({ children }: Props) {
    const [currentStage, setCurrentStage] = useState<MemoizationPageStage>('isPendingAnswer');
    const { deckId } = useParams();
    const { deck } = useDeck(deckId!);
    const { currentCard,
        resolvedCards,
        cardsTotal,
        markCurrentCardAsCorrect,
        markCurrentCardAsFailed,
    } = useDueCardsStack();

    return (
        <MemoizationPageStateContext.Provider value={{ deck, currentCard, currentStage, resolvedCards, cardsTotal}}>
            <MemoizationPageActionsContext.Provider value={{markCurrentCardAsCorrect, markCurrentCardAsFailed, setCurrentStage}}>
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