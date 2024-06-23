import { Product } from "./product.model"
import { User } from "./user.model"

export class OrderResponse {
    public id!: number
    public status!: StatusEnum
    public user!: User
    public users!: User[]
    public products!: Product[]
}

export enum StatusEnum {
    TO_SEND = "TO SEND",
    WAITING_PAYMENT = "WAITING_PAYMENT",
    SENDED = "SENDED",
    COMPLETE = "COMPLETE"
}