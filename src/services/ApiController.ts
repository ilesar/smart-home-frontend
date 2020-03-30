import { AjaxService } from '@/services/AjaxService';
import Jsona from 'jsona';

const dataFormatter = new Jsona();

export class ApiController {

    public static async get(url: string, language?: string) {
        let getHttpResponse = null;

        try {
            getHttpResponse = await AjaxService.get(url, language);
        } catch (e) {
            return Promise.reject(e);
        }

        return Promise.resolve(getHttpResponse);
    }

    public static async post(url: string, data: any, language?: string) {
        let postHttpResponse = null;

        try {
            postHttpResponse = await AjaxService.post(url, data, language);
        } catch (e) {
            return Promise.reject(e);
        }

        return Promise.resolve(postHttpResponse);
    }

    public static async patch(url: string, data: any, language?: string) {
        let patchHttpResponse = null;

        try {
            patchHttpResponse = await AjaxService.patch(url, data, language);
        } catch (e) {
            return Promise.reject(e);
        }

        return Promise.resolve(patchHttpResponse);
    }

    public static async delete(url: string, language?: string) {
        let deleteHttpResponse = null;

        try {
            deleteHttpResponse = await AjaxService.delete(url, language);
        } catch (e) {
            return Promise.reject(e);
        }

        return Promise.resolve(deleteHttpResponse);
    }

}
