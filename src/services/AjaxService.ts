import { appAxios } from '@/axios/appAxios';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export class AjaxService {

    public static get<T>(url: string, language?: string): Promise<AxiosResponse<T>> {
        return new Promise((resolve, reject) => {
            const config: AxiosRequestConfig = {
                headers: {},
            };
            if (language) {
                config.headers['Accept-Language'] = language;
            }
            appAxios.get(url)
                .then((response: AxiosResponse<T>) => {
                    resolve(response);
                })
                .catch((error: AxiosError) => {
                    reject(error);
                });
        });
    }

    public static post<R, P extends object>(url: string, params: P, language?: string):
        Promise<AxiosResponse<R>> {
        return new Promise((resolve, reject) => {
            const config: AxiosRequestConfig = {
                headers: {},
            };
            // config.headers['Content-Type'] = 'multipart/form-data';
            if (language) {
                config.headers['Accept-Language'] = language;
            }
            appAxios.post(url, params, config)
                .then((response: AxiosResponse<R>) => {
                    resolve(response);
                })
                .catch((error: AxiosError) => {
                    reject(error);
                });
        });
    }

    public static patch<R, P extends object>(url: string, params: P, language?: string): Promise<AxiosResponse<R>> {
        return new Promise((resolve, reject) => {
            const config: AxiosRequestConfig = {
                headers: {},
            };
            if (language) {
                config.headers['Accept-Language'] = language;
            }
            appAxios.patch(url, params)
                .then((response: AxiosResponse<R>) => {
                    resolve(response);
                })
                .catch((error: AxiosError) => {
                    reject(error);
                });
        });
    }

    public static delete<R, P extends object>(url: string, language?: string): Promise<AxiosResponse<R>> {
        return new Promise((resolve, reject) => {
            const config: AxiosRequestConfig = {
                headers: {},
            };
            if (language) {
                config.headers['Accept-Language'] = language;
            }
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
