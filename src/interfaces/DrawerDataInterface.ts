import {ModalOptions} from 'ant-design-vue/types/modal';
import {PopupType} from '@/enums/PopupType';

export interface DrawerDataInterface<T> {
    title: string;
    model: T;
    component: string;
    submitText: string;
    onSubmit: () => void;
}
