import useDueCards from "@/api/cards/useDueCards.ts";
import {useParams} from "react-router-dom";
import {useMemo, useState} from "react";
import {isEmpty} from "lodash";
import {Card} from "@/api/cards/cards.ts";
import {shuffleArray} from "@/pages/MemoizationPage/memoizationPage.service.ts";
import useUpdateCardTimeCurveMutation from "@/api/cards/useUpdateCardTimeCurveMutation.ts";


export default function useDueCardsStack() {
    const { deckId } = useParams();
    const [dueCards, setDueCards] = useState<Card[]>([]);
    const [cardsTotal, setCardsTotal] = useState<number>(0);
    const [resolvedCards, setResolvedCards] = useState<Card[]>([]);
    useDueCards(deckId!, (data: Card[]) => {
        setCardsTotal(data.length);
        setDueCards(shuffleArray(data))
    });
    const currentCard = useMemo(() => dueCards[0], [dueCards]);
    const { updateCardTimeCurve } = useUpdateCardTimeCurveMutation((data) => {
        console.log(data);
    });

    function markCurrentCardAsCorrect() {
        if (isEmpty(dueCards)) return;
        setResolvedCards(prevState => [...prevState, currentCard]);
        updateCardTimeCurve({
                cardId: currentCard.cardId as unknown as string,
                configuration: { answerIsRight: true }
            });
        setDueCards(prevCards => prevCards.slice(1));
    }

    function markCurrentCardAsFailed() {
        if (isEmpty(dueCards)) return;
        setResolvedCards(prevState => [...prevState, currentCard]);
        updateCardTimeCurve({
            cardId: currentCard.cardId as unknown as string,
            configuration: { isAnswerRight: false }
        });
        setDueCards(prevCards => prevCards.slice(1));
    }

    return { currentCard, cardsTotal, markCurrentCardAsCorrect, markCurrentCardAsFailed, resolvedCards }
}


