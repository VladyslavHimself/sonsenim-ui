import useDueCards from "@/api/cards/useDueCards.ts";
import {useParams} from "react-router-dom";
import {useMemo, useState} from "react";
import {isEmpty} from "lodash";
import {Card} from "@/api/cards/cards.ts";
import {shuffleArray} from "@/pages/Memoization/memoizationPage.service.ts";
import useUpdateCardTimeCurveMutation from "@/api/cards/useUpdateCardTimeCurveMutation.ts";
import {CardChoiceFlowResolveType} from "@/pages/Memoization/memoizationPage.types.ts";

export default function useDueCardsStack() {
    const [cardsSnapshot, setCardsSnapshot] = useState<Card[]>([]);
    const { deckId } = useParams();
    const [dueCards, setDueCards] = useState<Card[]>([]);
    const [cardsTotal, setCardsTotal] = useState<number>(0);
    const [resolvedCards, setResolvedCards] = useState<Card[]>([]);
    const [cardsToRepeat, setCardsToRepeat] = useState<Card[]>([]);
    useDueCards(deckId!, (data: Card[]) => {
        setCardsTotal(data.length);
        setDueCards(shuffleArray(data))
        setCardsSnapshot(data);
    });
    const currentCard = useMemo(() => dueCards[0], [dueCards]);
    const { updateCardTimeCurve } = useUpdateCardTimeCurveMutation(() => {});

    function markCurrentCardAsCorrect({ isServerShouldUpdate }: CardChoiceFlowResolveType) {
        if (isEmpty(dueCards)) return;
        setResolvedCards(prevState => [...prevState, currentCard]);
        isServerShouldUpdate && updateCardTimeCurve({
                cardId: currentCard.cardId as unknown as string,
                configuration: { answerIsRight: true }
            });
        setDueCards(prevCards => prevCards.slice(1));
    }

    function markCurrentCardAsFailed({ isServerShouldUpdate }: CardChoiceFlowResolveType) {
        if (isEmpty(dueCards)) return;
        setResolvedCards(prevState => [...prevState, currentCard]);
        setCardsToRepeat(prevState => [...prevState, currentCard]);
        isServerShouldUpdate && updateCardTimeCurve({
            cardId: currentCard.cardId as unknown as string,
            configuration: { answerIsRight: false }
        });
        setDueCards(prevCards => prevCards.slice(1));
    }


    return {
        currentCard,
        cardsSnapshot,
        cardsTotal,
        dueCards,
        resolvedCards,
        cardsToRepeat,
        setDueCards,
        setCardsTotal,
        setResolvedCards,
        setCardsToRepeat,
        markCurrentCardAsCorrect,
        markCurrentCardAsFailed
    }
}


