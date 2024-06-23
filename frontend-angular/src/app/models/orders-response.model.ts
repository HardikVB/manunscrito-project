import { Product } from "./product.model"
import { User } from "./user.model"

export class OrderResponse {
    public id!: number
    public users!: User[]
    public products!: Product[]
}