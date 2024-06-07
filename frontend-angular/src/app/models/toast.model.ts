export class ToastModel {
    message!: string;
    title?: string;
    type?: ToastType = ToastType.INFORMATION;
    duration?: number;
    asyncFunction?: () => Promise<any>;
}

export enum ToastType {
    SUCCESS = "success",
    ERROR = "error",
    INFORMATION = "information",
    LOADING = "loading"
}