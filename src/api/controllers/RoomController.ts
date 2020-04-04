import {ApiRoutes} from '@/enums/ApiRoutes';
import {AxiosError, AxiosResponse} from 'axios';
import GroceryItem from '@/api/models/GroceryItem';
import BaseController from '@/api/controllers/BaseController';
import Room from '@/api/models/Room';

export default class RoomController extends BaseController{
  public static async fetchAll(): Promise<AxiosResponse | AxiosError> {
    return this.makeGetRequest(Room, ApiRoutes.getRooms);
  }
}
