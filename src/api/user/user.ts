import axios from "axios";


export type UserProfileResponse = {
    id: number,
    username: string,
    email: string,
}


const UserApi = {
    getLoggedInUserProfile() {
        return axios.get<UserProfileResponse>('/api/user-info/me');
    }
}

export default UserApi;