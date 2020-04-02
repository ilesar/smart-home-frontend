import axios, {AxiosResponse} from 'axios';
import { LocalStorageService } from '@/services/LocalStorageService';
import { LocalStorageKeyNames } from '@/enums/LocalStorageKeyNames';
import Jsona from 'jsona';

const dataFormatter = new Jsona();

axios.interceptors.request.use((config) => {
    if (LocalStorageService.has(LocalStorageKeyNames.token)) {
        config.headers.Authorization = `Bearer ${LocalStorageService.get(LocalStorageKeyNames.token)}`;
    }

    return config;
});

axios.interceptors.response.use(null, (error) => {
    const errors = [];
    const errorObjects = error.response.data.errors;

    if (!errorObjects) {
        return;
    }

    errorObjects.forEach((errorObject) => {
        const pointerArray = errorObject.source.pointer.split('/');
        const errorField = pointerArray[pointerArray.length - 1];

        errors[errorField] = errorObject.detail;
    });

    error.formattedErrors = errors;

    return Promise.reject({ ...error });
});

export const appAxios = {
    axios,
    headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
    },
    baseURL: process.env.VUE_APP_BASE_URL,
    responseType: 'json',
    dataTransformer: (response: AxiosResponse) => {
        if (response.data === null) {
            console.log('transfoadasdsddrmer');
            return;
        }
        const data = dataFormatter.deserialize(response.data);

        return data;
    },
};
