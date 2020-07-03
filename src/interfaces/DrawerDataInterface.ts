import {ModalOptions} from 'ant-design-vue/types/modal';
import {PopupType} from '@/enums/PopupType';
import {Vue, VueConstructor} from "vue/types/vue";

export interface DrawerDataInterface<T> {
    title: string;
    model: T;
    component: VueConstructor<Vue>;
    submitText: string;
    onSubmit: () => void;
}
