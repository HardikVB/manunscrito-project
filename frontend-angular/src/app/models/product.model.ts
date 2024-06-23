import { Image } from "./image.model"
import { Translation } from "./translating.model"

export class Product {
    id!: number;
    price!: number;
    image_thumbnail: string = "";
    translations: Translation[] = [];
    translation: Translation = new Translation();
    images: Image[] = [];
    loading?: boolean = true;
}
  