export class ToastModel {
    message!: string;
    title?: string;
    type?: ToastType = ToastType.INFORMATION;
    duration?: number = 3000;
}

export enum ToastType {
    SUCCESS,
    ERROR,
    INFORMATION
}