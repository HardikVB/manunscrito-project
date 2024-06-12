import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Product } from './product-db';

interface ProductImageAttributes {
  id: number;
  image_base64: string;
  productId: number;
}

interface ProductImageCreationAttributes extends Optional<ProductImageAttributes, 'id'> {}

class ProductImage extends Model<ProductImageAttributes, ProductImageCreationAttributes> implements ProductImageAttributes {
  public id!: number;
  public image_base64!: string;
  public productId!: number;

  static associate() {
    ProductImage.belongsTo(Product, {
      foreignKey: 'productId',
      onDelete: 'CASCADE',
    });
  }

  static initModel(sequelize: Sequelize) {
    ProductImage.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        image_base64: {
          type: DataTypes.TEXT('long'),
          allowNull: false,
        },
        productId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'product_images',
      }
    );
  }
}

export { ProductImage };
