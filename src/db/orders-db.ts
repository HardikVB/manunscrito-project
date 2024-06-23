import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Product } from './product-db';
import { User } from './user-db';
import { OrderProducts } from './order-products';

interface OrderAttributes {
  id: number;
  userId: number;
  status: StatusEnum;
}

interface OrderCreationAttributes extends Optional<OrderAttributes, 'id'> {}

export enum StatusEnum {
  TO_SEND = "TO SEND",
  WAITING_PAYMENT = "WAITING_PAYMENT",
  SENDED = "SENDED",
  COMPLETE = "COMPLETE"
}

class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
  public id!: number;
  public userId!: number;
  public products!: Product[]
  public users!: User[]
  public status!: StatusEnum;

  static initModel(sequelize: Sequelize) {
    Order.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        status: {
          type: DataTypes.TEXT,
          primaryKey: false,
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
