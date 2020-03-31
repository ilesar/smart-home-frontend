import {BelongsTo, Model} from '@vuex-orm/core';
import { AxiosError, AxiosResponse } from 'axios';
import {keys} from 'lodash';
import {ApiRoutes} from '@/enums/ApiRoutes';

export interface IToken {
    id: string;
    access_token: string;
    token_type: string;
    expires_at: string;
}

export default class Token extends Model {
    public static entity: string = 'tokens';

    public static apiConfig = {
        actions: {
            fetch: {
                method: 'get',
                url: ApiRoutes.refreshToken,
            },
        },
    };

    public static fieldsKeys() {
        return keys(this.fields());
    }

    public static async refreshToken(): Promise<AxiosResponse | AxiosError> {
        return await Token.api().refreshToken();
    }

    public static setToken(token: any) {
        this.create({
            data: token,
        });
    }

    public static fields() {
        return {
            id: this.attr(null),
            access_token: this.attr(''),
            token_type: this.attr(''),
            expires_at: this.attr(''),
        };
    }



}
