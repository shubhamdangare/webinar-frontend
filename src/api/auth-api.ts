import { AuthPath } from './api-constants'
import * as request from 'superagent'
type loginType = { userName: string; password: string }

type signupType = {
    userName: string;
    email: string;
    name: string;
    password: string
}

export interface LoginResponse {
    token: string
}

export interface SignResponse {
    message: string
}

export interface ErrorResponse {
    error: string
}

export const login = async ({
    userName,
    password,
}: loginType): Promise<LoginResponse | ErrorResponse> => {

    try {
        const response = await request
            .post(AuthPath.login)
            .set('Content-Type', 'application/json')
            .send({ userName, password });

        const { token } = response.body
        return {
            token
        } as LoginResponse
    } catch (e) {
        if (e && e.response && e.response.body && e.response.body.error) {
            return { error: e.response.body.error } as ErrorResponse
        }
        return { error: '🙀 some error occurred' } as ErrorResponse
    }
}

export const signup = async ({
    userName,
    email,
    name,
    password,
}: signupType): Promise<SignResponse | ErrorResponse> => {

    try {
        const response = await request
            .post(AuthPath.signup)
            .set('Content-Type', 'application/json')
            .send({ userName, email, name, password });
        const { message } = response.body;
        return {
            message
        } as SignResponse
    } catch (e) {
        if (e && e.response && e.response.body && e.response.body.error) {
            return { error: e.response.body.error } as ErrorResponse
        }
        return { error: '🙀 some error occurred' } as ErrorResponse
    }
}

