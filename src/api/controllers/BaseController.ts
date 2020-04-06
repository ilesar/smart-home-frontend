import {AxiosError, AxiosResponse} from 'axios';
import {Model} from '@vuex-orm/core';

export default class BaseController {
  public static async makeGetRequest(model: any, route: string): Promise<AxiosResponse | AxiosError> {
    let response;

    try {
      response = await model.api().get(route);
    } catch (e) {
      return Promise.reject(e);
    }

    return Promise.resolve(response);
  }

  public static async makePostRequest(model: any, route: string, body: any): Promise<AxiosResponse | AxiosError> {
    let response;

    try {
      response = await model.api().post(route, body);
    } catch (e) {
      return Promise.reject(e);
    }

    await model.insertOrUpdate({
      data: response.response.data,
    });

    return Promise.resolve(response);
  }

  public static async makePatchRequest(model: any, route: string, body: any): Promise<AxiosResponse | AxiosError> {
    let response;

    try {
      response = await model.api().patch(route, body);
    } catch (e) {
      return Promise.reject(e);
    }

    await model.insertOrUpdate({
      data: response.response.data,
    });

    return Promise.resolve(response);
  }


  public static async makeDeleteRequest(model: any, route: string): Promise<AxiosResponse | AxiosError> {
    let response;

    try {
      response = await model.api().delete(route);
    } catch (e) {
      return Promise.reject(e);
    }

    return Promise.resolve(response);
  }

}
