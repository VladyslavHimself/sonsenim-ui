import axios from 'axios';


export type LoginBody = {
    username: string,
    password: string
}

export const AuthApi = {

    loginUser(loginBody: LoginBody) {
        return axios.post(`/api/auth/login`, loginBody);
    }
}