import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { ProductTranslation } from './product-translate-db';
import { ProductImage } from './product-image-db';

interface ProductAttributes {
  id: number;
  price: number;
  image_thumbnail: string;
}

interface ProductCreationAttributes extends Optional<ProductAttributes, 'id'> {}

class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
  public id!: number;
  public price!: number;
  public image_thumbnail!: string;
  public translations!: ProductTranslation[];
  public images!: ProductImage[];

  static initModel(sequelize: Sequelize) {
    Product.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        price: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        image_thumbnail: {
          type: DataTypes.TEXT('long'),
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'products',
      }
    );
  }
}

export { Product };
