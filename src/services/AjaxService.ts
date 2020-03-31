import { appAxios } from '@/axios/appAxios';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export class AjaxService {

    public static get<T>(url: string): Promise<AxiosResponse<T>> {
        return new Promise((resolve, reject) => {
            const config: AxiosRequestConfig = {
                headers: {},
            };
            appAxios.get(url)
                .then((response: AxiosResponse<T>) => {
                    resolve(response);
                })
                .catch((error: AxiosError) => {
                    reject(error);
                });
        });
    }

    public static post<R, P extends object>(url: string, params: P):
        Promise<AxiosResponse<R>> {
        return new Promise((resolve, reject) => {
            const config: AxiosRequestConfig = {
                headers: {},
            };
            appAxios.post(url, params, config)
                .then((response: AxiosResponse<R>) => {
                    resolve(response);
                })
                .catch((error: AxiosError) => {
                    reject(error);
                });
        });
    }

    public static patch<R, P extends object>(url: string, params: P): Promise<AxiosResponse<R>> {
        return new Promise((resolve, reject) => {
            const config: AxiosRequestConfig = {
                headers: {},
            };
            appAxios.patch(url, params)
                .then((response: AxiosResponse<R>) => {
                    resolve(response);
                })
                .catch((error: AxiosError) => {
                    reject(error);
                });
        });
    }

    public static delete<R, P extends object>(url: string): Promise<AxiosResponse<R>> {
        return new Promise((resolve, reject) => {
            const config: AxiosRequestConfig = {
                headers: {},
            };
            appAxios.delete(url)
                .then((response: AxiosResponse<R>) => {
                    resolve(response);
                })
                .catch((error: AxiosError) => {
                    reject(error);
                });
        });
    }
}
