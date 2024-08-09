import axios from "axios";

export type Deck = {
    id: number;
    deckName: string;
    createdAt: string;
    isRandomizedOrder: boolean;
    isFlashcardNormal: boolean;
    isFlashcardReversed: boolean;
    isTyping: boolean;
}

export type DeckConfigurationBody = Omit<Deck, 'id' | 'createdAt'>

export type DeckWithAggregatedDataResponse = Deck & {
    cardsInDeckTotal: number;
}

export const DecksApi = {
    getDecksWithAggregatedData(groupId: string) {
        return axios.get<DeckWithAggregatedDataResponse[]>(`/api/decks/stats/${groupId}`);
    },

    addDeckToGroup(groupId: number, deckConfiguration: DeckConfigurationBody) {
        return axios.post(`/api/decks/${groupId}`, deckConfiguration)
    }
}