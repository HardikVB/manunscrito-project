export class ButtonType {
    icon!: string;
    label?: string;
    type?: Types;
}

export enum Types {
    GRID = "grid",
    LIST = "list"
}