import axios from "axios";

export type NewCardConfigurationBody = {
    word: string,
    definition: string,
    description?: string
}

const CardsApi = {
    addCardToDeck(deckId: number, newCardConfiguration: NewCardConfigurationBody) {
        return axios.post(`/api/cards/${deckId}`, newCardConfiguration)
    }
};

export default CardsApi;