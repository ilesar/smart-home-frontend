import axios, {AxiosResponse} from 'axios';
import { LocalStorageService } from '@/services/LocalStorageService';
import { LocalStorageKeyNames } from '@/enums/LocalStorageKeyNames';
import router from '@/router/index';
import Jsona from 'jsona';
import { TJsonApiBody, TJsonApiData } from 'jsona/lib/JsonaTypes';
import { RouteNames } from '@/enums/RouteNames';
import { EventBus } from '@/helpers/EventBusHelper';
import { EventBusEvents } from '@/enums/EventBusEvents';

const dataFormatter = new Jsona();

axios.interceptors.request.use((config) => {
    if (LocalStorageService.has(LocalStorageKeyNames.token)) {
        config.headers.Authorization = `Bearer ${LocalStorageService.get(LocalStorageKeyNames.token)}`;
    }

    return config;
});

function isProductFormResponse(response: TJsonApiBody) {
    if (response.data == null) {
        return false;
    }
    const responseData = response.data as TJsonApiData;
    // handles response from product/response because of issue in json-api-response-converter library
    // todo - fix if library fixes this
    return responseData.links && responseData.links.self && responseData.links.self.includes('product/forms');
}

export const appAxios = {
    axios,
    headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
    },
    baseURL: process.env.VUE_APP_BASE_URL,
    responseType: 'json',
    dataTransformer: (response: AxiosResponse) => {
        console.log('IN', response.data);
        const data = dataFormatter.deserialize(response.data);
        console.log('OUT', data);
        return data;
    },
};
