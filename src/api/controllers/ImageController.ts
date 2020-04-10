import {ApiRoutes} from '@/enums/ApiRoutes';
import {AxiosError, AxiosResponse} from 'axios';
import BaseController from '@/api/controllers/BaseController';
import Image from '@api/models/Image';
import GroceryItemImage from '@/api/models/GroceryItemImage';

export default class RoomController extends BaseController {
  public static async upload(imageData): Promise<AxiosResponse | AxiosError> {
    const image = await fetch(imageData)
      .then(res => res.blob())
      .then(blob => new File([blob], "testupload", { type: 'image/png'}))

    const formData = new FormData();
    formData.append('image', image);
    console.log(formData);
    console.log(image);

    return this.makePostRequest(GroceryItemImage, ApiRoutes.Image, formData);
  }s
}
