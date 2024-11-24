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

export type UpdateCardTimeCurveConfigurationBody = {
    isAnswerRight: boolean
}

export type CardsIntervalHistoryResponse = {
    date: string;
    highIndicationCount: number;
    lowIndicationCount: number;
    midIndicationCount: number;
    veryLowIndicationCount: number;
}

const CardsApi = {
    addCardToDeck(deckId: number, newCardConfiguration: NewCardConfigurationBody) {
        return axios.post(`/api/cards/${deckId}`, newCardConfiguration);
    },

    getCardsToRepeatFromDeck(deckId: string) {
        return axios.get<Card[]>(`/api/cards/${deckId}/to-repeat`);
    },


    // TODO: Change id params to string in other areas
    getCardsInDeck(deckId: string) {
        return axios.get<Card[]>(`/api/cards/${deckId}`);
    },

    getCardsIntervalHistory(groupId: string | number) {
        return axios.get<CardsIntervalHistoryResponse[]>(`/api/cards/${groupId}/history`);
    },

    updateCard(cardId: string, deckId: string, cardConfiguration: NewCardConfigurationBody) {
        return axios.put(`/api/cards/${deckId}/${cardId}`, cardConfiguration);
    },

    removeCardFromDeck(deckId: string, cardId: string) {
        return axios.delete(`/api/cards/${deckId}/${cardId}`);
    },

    updateCardTimeCurve(cardId: string, configuration: UpdateCardTimeCurveConfigurationBody) {
        return axios.patch(`/api/cards/${cardId}/update-curve`, configuration);
    }
};

export default CardsApi;