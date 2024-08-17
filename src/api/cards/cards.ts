import axios from "axios";

export type NewCardConfigurationBody = {
    word: string,
    definition: string,
    description?: string
}


export type Card = {
    cardId: number,
    primaryWord: string,
    definition: string,
    explanation: string,
    nextRepetitionTime: string,
    intervalStrength: number,
    createdAt: string,
}

const CardsApi = {
    addCardToDeck(deckId: number, newCardConfiguration: NewCardConfigurationBody) {
        return axios.post(`/api/cards/${deckId}`, newCardConfiguration)
    },


    // TODO: Change id params to string in other areas
    getCardsInDeck(deckId: string) {
        return axios.get<Card[]>(`/api/cards/${deckId}`);
    },

    updateCard(cardId: string, deckId: string, cardConfiguration: NewCardConfigurationBody) {
        return axios.put(`/api/cards/${deckId}/${cardId}`, cardConfiguration);
    }
};

export default CardsApi;