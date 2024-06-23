import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Product } from './product-db';
import { User } from './user-db';
import { OrderProducts } from './order-products';

interface OrderAttributes {
  id: number;
  userId: number;
}

interface OrderCreationAttributes extends Optional<OrderAttributes, 'id'> {}

class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
  public id!: number;
  public userId!: number;
  public products!: Product[]

  static initModel(sequelize: Sequelize) {
    Order.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'orders',
      }
    );
  }
}

export { Order };
