import { Sequelize, DataTypes, Model } from 'sequelize';
import { Product } from './product-db';
import { Order } from './orders-db';

interface OrderProductsAttributes {
  id: number;
  orderId: number;
  productId: number;
}



class OrderProducts extends Model<OrderProductsAttributes> implements OrderProductsAttributes {
  public id!: number;
  public orderId!: number;
  public productId!: number;

  static initModel(sequelize: Sequelize) {
    OrderProducts.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        orderId: {
          type: DataTypes.INTEGER,
          references: {
            model: Order,
            key: 'id',
          },
          primaryKey: true,
        },
        productId: {
          type: DataTypes.INTEGER,
          references: {
            model: Product,
            key: 'id',
          },
          primaryKey: true,
        }
      },
      {
        sequelize,
        tableName: 'order_products',
      }
    );
  }
}

export { OrderProducts };
