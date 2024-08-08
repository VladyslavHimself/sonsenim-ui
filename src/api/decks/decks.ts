import axios from "axios";

export type Deck = {
    id: number;
    deckName: string;
    createdAt: string;
    randomizedOrder: boolean;
    flashcardNormal: boolean;
    flashcardReversed: boolean;
    flashcardTyping: boolean;
}

export type DeckWithAggregatedDataResponse = Deck & {
    cardsInDeckTotal: number;
}

export const DecksApi = {
    getDecksWithAggregatedData(groupId: string) {
        return axios.get<DeckWithAggregatedDataResponse[]>(`/api/decks/stats/${groupId}`);
    }
}