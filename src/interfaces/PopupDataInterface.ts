export interface PopupDataInterface {
    title: string;
    okCallback?: (popupModel: any) => void;
    cancelCallback?: (popupModel: any) => void;
}
