import axios from 'axios';
import { LocalStorageService } from '@/services/LocalStorageService';
import { LocalStorageKeyNames } from '@/enums/LocalStorageKeyNames';
import router from '@/router/index';
import Jsona from 'jsona';
import { TJsonApiBody, TJsonApiData } from 'jsona/lib/JsonaTypes';
import { RouteNames } from '@/enums/RouteNames';
import { EventBus } from '@/helpers/EventBusHelper';
import { EventBusEvents } from '@/enums/EventBusEvents';

const dataFormatter = new Jsona();

export const appAxios = axios.create({
    headers: {
        Accept: 'application/vnd.api+json',
    },
    baseURL: process.env.VUE_APP_BASE_URL,
    responseType: 'json',
});

appAxios.interceptors.request.use((config) => {
    if (LocalStorageService.has(LocalStorageKeyNames.token)) {
        config.headers.Authorization = `Bearer ${LocalStorageService.get(LocalStorageKeyNames.token)}`;
    }

    return config;
});

appAxios.interceptors.response.use(async (response) => {
    if (response.data != null && response.data.meta != null && response.data.meta.totalCount != null) {
        if (response.data.links.self && response.data.links.self.includes('/projects')) {
            EventBus.$emit(EventBusEvents.emitProjectPagination, response.data.meta.totalCount);
        } else if (response.data.links.self && response.data.links.self.includes('/clients')) {
            EventBus.$emit(EventBusEvents.emitClientPagination, response.data.meta.totalCount);
        }
    }
    if (isProductFormResponse(response)) {
        response.data = await dataFormatter.deserialize(response.data);
    } else {
        if (response.headers['content-type'] && response.headers['content-type'].includes('application/vnd.api+json')) {
            response.data = dataFormatter.deserialize(response.data);
        }
    }
    return response;
}, (error) => {
    if (error.response.status === 401 && !error.response.config.url.includes('refresh-token')) {
        if (router.currentRoute.name === RouteNames.login) {
            return;
        }
        router.push({name: RouteNames.login});
        return Promise.reject(new Error('Vrijeme prijave je isteklo, molimo da se ponovo prijavite.'));
    }
    return Promise.reject(error);
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
