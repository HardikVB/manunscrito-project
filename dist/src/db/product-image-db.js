"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductImage = void 0;
const sequelize_1 = require("sequelize");
const product_db_1 = require("./product-db");
class ProductImage extends sequelize_1.Model {
    static associate() {
        ProductImage.belongsTo(product_db_1.Product, {
            foreignKey: 'productId',
            onDelete: 'CASCADE',
        });
    }
    static initModel(sequelize) {
        ProductImage.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            image_base64: {
                type: sequelize_1.DataTypes.TEXT('long'),
                allowNull: false,
            },
            productId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
        }, {
            sequelize,
            tableName: 'product_images',
        });
    }
}
exports.ProductImage = ProductImage;
