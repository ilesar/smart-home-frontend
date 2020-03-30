import { AxiosResponse } from 'axios';
import { ApiController } from '@/services/ApiController';
import { ApiRoutes } from '@/enums/ApiRoutes';

export default class UserAPI {
    public static async login(data: { username: string, password: string }) {
        let loginResponse;
        const request = {
            data: {
                attributes: {
                    username: data.username,
                    password: data.password,
                },
            },
        };
        try {
            loginResponse = await ApiController.post(ApiRoutes.login, request) as AxiosResponse;
        } catch (e) {
            return Promise.reject(e);
        }
        return Promise.resolve(loginResponse);
    }
}
