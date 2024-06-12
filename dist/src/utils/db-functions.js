"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db");
class DbFunctions {
    getProducts(page = 1, pageSize = 10) {
        return __awaiter(this, void 0, void 0, function* () {
            const offset = (page - 1) * pageSize;
            return yield db_1.Product.findAndCountAll({
                limit: pageSize,
                offset: offset,
            });
        });
    }
    ;
    getProductById(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.Product.findByPk(productId, {
                include: [{ model: db_1.ProductTranslation }, { model: db_1.ProductImage }],
            });
        });
    }
    ;
    updateProduct(updateProduct) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield db_1.Product.findByPk(updateProduct.id);
            if (!product) {
                throw new Error('Product not found');
            }
            return yield product.save();
        });
    }
    ;
    deleteProduct(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield db_1.Product.findByPk(productId);
            if (!product) {
                throw new Error('Product not found');
            }
            return yield product.destroy();
        });
    }
    ;
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.User.findOne({ where: { email: email } });
        });
    }
    ;
}
exports.default = new DbFunctions();
