import {useQuery} from "@tanstack/react-query";
import {CardsApi} from "@/api";


export default function useCardsIntervalHistory(deckId: string) {
    const { data: cardsIntervalHistoryData, isLoading, refetch} = useQuery({
        queryKey: ['cards-interval-history', deckId],
        queryFn: () => CardsApi.getCardsIntervalHistory(deckId).then(({ data }) => data)
    });

    return { cardsIntervalHistoryData, isLoading, refetch };
}