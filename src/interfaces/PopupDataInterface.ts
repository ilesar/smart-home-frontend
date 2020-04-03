import {ModalOptions} from 'ant-design-vue/types/modal';
import {PopupType} from '@/enums/PopupType';

export interface PopupDataInterface {
    type: PopupType;
    options: ModalOptions;
}
