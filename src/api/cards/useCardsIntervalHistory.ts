import {useQuery} from "@tanstack/react-query";
import {CardsApi} from "@/api";
import {useState} from "react";


export default function useCardsIntervalHistory(deckId: string) {
    const [actualDayInfo, setActualDayInfo] = useState();
    const { data: cardsIntervalHistoryData, isLoading, refetch} = useQuery({
        queryKey: ['cards-interval-history', deckId],
        queryFn: () => CardsApi.getCardsIntervalHistory(deckId).then(({ data }) => {
            setActualDayInfo(data[data.length - 1]);
            return data;
        })
    });

    return { cardsIntervalHistoryData, actualDayInfo, isLoading, refetch };
}