"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductTranslation = void 0;
const sequelize_1 = require("sequelize");
const product_db_1 = require("./product-db");
class ProductTranslation extends sequelize_1.Model {
    static associate() {
        ProductTranslation.belongsTo(product_db_1.Product, {
            foreignKey: 'productId',
            onDelete: 'CASCADE',
        });
    }
    static initModel(sequelize) {
        ProductTranslation.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            language: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            title: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true,
            },
            description_thumbnail: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true,
            },
            productId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
        }, {
            sequelize,
            tableName: 'product_translations',
        });
    }
}
exports.ProductTranslation = ProductTranslation;
