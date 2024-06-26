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
exports.getProducts = exports.findUserByEmail = void 0;
const db_1 = require("./db");
function getProducts(page = 1, pageSize = 10) {
    return __awaiter(this, void 0, void 0, function* () {
        const offset = (page - 1) * pageSize;
        return yield db_1.Product.findAndCountAll({
            limit: pageSize,
            offset: offset,
        });
    });
}
exports.getProducts = getProducts;
;
function findUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield db_1.User.findOne({ where: { email: email } });
    });
}
exports.findUserByEmail = findUserByEmail;
;
