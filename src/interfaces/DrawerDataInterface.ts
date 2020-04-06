import {ModalOptions} from 'ant-design-vue/types/modal';
import {PopupType} from '@/enums/PopupType';

export interface DrawerDataInterface {
    title: string;
    component: string;
    submitText: string;
    onSubmit: () => void;
}
