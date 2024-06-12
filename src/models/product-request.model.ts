import { ProductImage } from "../db/product-image-db";
import { ProductTranslation } from "../db/product-translate-db";

export class ProductRequest{
    id!: number;
    price!: number;
    image_thumbnail!: string;
    translation?: ProductTranslation;
    translations?: ProductTranslation[];
    images!: ProductImage[];
}