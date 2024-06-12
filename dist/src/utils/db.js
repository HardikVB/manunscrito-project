"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Product = exports.ProductImage = exports.ProductTranslation = void 0;
const sequelize_1 = require("sequelize");
const product_translate_db_1 = require("../db/product-translate-db");
Object.defineProperty(exports, "ProductTranslation", { enumerable: true, get: function () { return product_translate_db_1.ProductTranslation; } });
const product_image_db_1 = require("../db/product-image-db");
Object.defineProperty(exports, "ProductImage", { enumerable: true, get: function () { return product_image_db_1.ProductImage; } });
const product_db_1 = require("../db/product-db");
Object.defineProperty(exports, "Product", { enumerable: true, get: function () { return product_db_1.Product; } });
const user_db_1 = require("../db/user-db");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return user_db_1.User; } });
const dotenv_1 = require("dotenv");
(0, dotenv_1.configDotenv)();
// Inicialização do sequelize com os detalhes da conexão
const sequelize = new sequelize_1.Sequelize(process.env.DATABASE || "defaultdb", process.env.DATABASE_USER || "default", process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT || "28938"),
    dialect: 'mysql',
});
// Inicialização dos modelos
user_db_1.User.initModel(sequelize);
product_translate_db_1.ProductTranslation.initModel(sequelize);
product_image_db_1.ProductImage.initModel(sequelize);
product_db_1.Product.initModel(sequelize);
// Definindo as associações entre os modelos
product_db_1.Product.hasMany(product_translate_db_1.ProductTranslation, { foreignKey: 'productId', as: 'translations' });
product_db_1.Product.hasMany(product_image_db_1.ProductImage, { foreignKey: 'productId', as: 'images' });
// Sincronização do modelo com a base de dados
sequelize.sync();
