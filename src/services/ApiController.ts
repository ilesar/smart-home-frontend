import { AjaxService } from '@/services/AjaxService';
import Jsona from 'jsona';

const dataFormatter = new Jsona();

export class ApiController {

    public static async get(url: string) {
        let getHttpResponse = null;

        try {
            getHttpResponse = await AjaxService.get(url);
        } catch (e) {
            return Promise.reject(e);
        }

        return Promise.resolve(getHttpResponse);
    }

    public static async post(url: string, data: any) {
        let postHttpResponse = null;

        try {
            postHttpResponse = await AjaxService.post(url, data);
        } catch (e) {
            return Promise.reject(e);
        }

        return Promise.resolve(postHttpResponse);
    }

    public static async patch(url: string, data: any) {
        let patchHttpResponse = null;

        try {
            patchHttpResponse = await AjaxService.patch(url, data);
        } catch (e) {
            return Promise.reject(e);
        }

        return Promise.resolve(patchHttpResponse);
    }

    public static async delete(url: string) {
        let deleteHttpResponse = null;

        try {
            deleteHttpResponse = await AjaxService.delete(url);
        } catch (e) {
            return Promise.reject(e);
        }

        return Promise.resolve(deleteHttpResponse);
    }

}
