import axios from "axios";


export type UserProfileResponse = {
    id: number,
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    createdAt: string,
    totalDecks: number,
    totalCards: number,
}


const UserApi = {
    getLoggedInUserProfile() {
        return axios.get<UserProfileResponse>('/api/user-info/me');
    }
}

export default UserApi;