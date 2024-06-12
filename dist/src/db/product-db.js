"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const sequelize_1 = require("sequelize");
class Product extends sequelize_1.Model {
    static initModel(sequelize) {
        Product.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            price: {
                type: sequelize_1.DataTypes.FLOAT,
                allowNull: false,
            },
            image_thumbnail: {
                type: sequelize_1.DataTypes.TEXT('long'),
                allowNull: false,
            },
        }, {
            sequelize,
            tableName: 'products',
        });
    }
}
exports.Product = Product;
