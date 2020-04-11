import {ApiRoutes} from '@/enums/ApiRoutes';
import {AxiosError, AxiosResponse} from 'axios';
import BaseController from '@/api/controllers/BaseController';
import GroceryItemImage from '@/api/models/GroceryItemImage';

export default class ImageController extends BaseController {
  public static async upload(image: File): Promise<AxiosResponse | AxiosError> {
    const formData = new FormData();
    formData.append('image', image);
    console.log(formData);
    console.log(image);

    return this.makePostRequest(GroceryItemImage, ApiRoutes.Image, formData);
  }s
}
