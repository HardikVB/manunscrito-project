import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Product } from './product-db';

interface ProductTranslationAttributes {
  id: number;
  language: string;
  title: string;
  description?: string;
  description_thumbnail?: string;
  productId: number;
}

interface ProductTranslationCreationAttributes extends Optional<ProductTranslationAttributes, 'id'> {}

class ProductTranslation extends Model<ProductTranslationAttributes, ProductTranslationCreationAttributes> implements ProductTranslationAttributes {
  public id!: number;
  public language!: string;
  public title!: string;
  public description?: string;
  public description_thumbnail?: string;
  public productId!: number;

  static associate() {
    ProductTranslation.belongsTo(Product, {
      foreignKey: 'productId',
      onDelete: 'CASCADE',
    });
  }

  static initModel(sequelize: Sequelize) {
    ProductTranslation.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        language: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        description_thumbnail: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        productId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'product_translations',
      }
    );
  }
}

export { ProductTranslation };
