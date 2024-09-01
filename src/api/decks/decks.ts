import axios from "axios";

export type DeckModes = {
    flashcardNormal: boolean;
    flashcardReversed: boolean;
    flashcardTyping: boolean;
    randomizedOrder: boolean;
}

export type Deck = {
    id: number;
    deckName: string;
    createdAt: string;
} & DeckModes;

export type DeckConfigurationBody = Omit<Deck, 'id' | 'createdAt'>

export type DeckWithAggregatedDataResponse = Deck & {
    cardsInDeckTotal: number;
    dueCardsInDeck: number;
}

export const DecksApi = {
    getDeckById(deckId: string) {
      return axios.get(`/api/decks/id/${deckId}`);
    },

    getDecksWithAggregatedData(groupId: string) {
        return axios.get<DeckWithAggregatedDataResponse[]>(`/api/decks/stats/${groupId}`);
    },

    addDeckToGroup(groupId: number, deckConfiguration: DeckConfigurationBody) {
        return axios.post(`/api/decks/${groupId}`, deckConfiguration)
    },

    updateDeck(groupId: number, deckConfiguration: DeckConfigurationBody) {
        return axios.put(`/api/decks/${groupId}`, deckConfiguration);
    },

    deleteDeck(deckId: number) {
        return axios.delete(`/api/decks/${deckId}`);
    }
}