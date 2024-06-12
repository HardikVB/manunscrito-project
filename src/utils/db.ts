import { Sequelize } from 'sequelize';
import { ProductTranslation } from '../db/product-translate-db';
import { ProductImage } from '../db/product-image-db';
import { Product } from '../db/product-db';
import { User } from '../db/user-db';
import { configDotenv } from 'dotenv';

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

// Definindo as associações entre os modelos
Product.hasMany(ProductTranslation, { foreignKey: 'productId', as: 'translations' });
Product.hasMany(ProductImage, { foreignKey: 'productId', as: 'images' });

// Sincronização do modelo com a base de dados
sequelize.sync();

export { ProductTranslation, ProductImage, Product, User };
