import axios from 'axios';


export type LoginBody = {
    username: string,
    password: string
}

export type RegisterBody = {
    username: string,
    password: string,
    email: string,
    firstName: string,
    lastName: string,
}

export const AuthApi = {

    loginUser(loginBody: LoginBody) {
        return axios.post(`/api/auth/login`, loginBody);
    },

    registerUser(credentials: RegisterBody) {
        return axios.post('/api/auth/register', credentials)
    }
}