import { Sequelize } from 'sequelize';
import { ProductTranslation } from '../db/product-translate-db';
import { ProductImage } from '../db/product-image-db';
import { Product } from '../db/product-db';
import { User } from '../db/user-db';
import { configDotenv } from 'dotenv';
import { Order } from '../db/orders-db';
import { OrderProducts } from '../db/order-products';

configDotenv()

// Inicialização do sequelize com os detalhes da conexão
const sequelize = new Sequelize(
  process.env.DATABASE || "defaultdb",
  process.env.DATABASE_USER || "default",
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT || "28938"),
    dialect: 'mysql',
  }
);

// Inicialização dos modelos
User.initModel(sequelize);
ProductTranslation.initModel(sequelize);
ProductImage.initModel(sequelize);
Product.initModel(sequelize);
Order.initModel(sequelize);
OrderProducts.initModel(sequelize);

// Definindo as associações entre os modelos
Product.hasMany(ProductTranslation, { foreignKey: 'productId', as: 'translations' });
Product.hasMany(ProductImage, { foreignKey: 'productId', as: 'images' });

Order.belongsToMany(Product, { through: OrderProducts, foreignKey: 'orderId', otherKey: 'productId', as: 'products' });
Product.belongsToMany(Order, { through: OrderProducts, foreignKey: 'productId', otherKey: 'orderId', as: 'products', uniqueKey: 'id' });

Order.belongsToMany(User, { through: OrderProducts, foreignKey: 'orderId', otherKey: 'userId', as: 'users' });
User.belongsToMany(Order, { through: OrderProducts, foreignKey: 'userId', otherKey: 'orderId', as: 'users', uniqueKey: 'id' });

// Sincronização do modelo com a base de dados
sequelize.sync().then(() => {
  console.log('Database synced');
});

export { ProductTranslation, ProductImage, Product, User };
