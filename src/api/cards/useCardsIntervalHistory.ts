import {useQuery} from "@tanstack/react-query";
import {CardsApi} from "@/api";
import {useState} from "react";
import {CardsIntervalHistoryResponse} from "@/api/cards/cards.ts";


export default function useCardsIntervalHistory(deckId: string | number) {
    const [actualDayInfo, setActualDayInfo] = useState<CardsIntervalHistoryResponse | null>(null);
    const { data: cardsIntervalHistoryData, isLoading, refetch} = useQuery({
        queryKey: ['cards-interval-history', deckId],
        queryFn: () => CardsApi.getCardsIntervalHistory(deckId).then(({ data }) => {
            setActualDayInfo(data[data.length - 1]);
            return data;
        })
    });

    return { cardsIntervalHistoryData, actualDayInfo, isLoading, refetch };
}