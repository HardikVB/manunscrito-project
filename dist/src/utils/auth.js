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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserToken = exports.authenticateToken = exports.verifyAdminPrivilage = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_functions_1 = require("./db-functions");
const SECRET_KEY = 'hardik_bachu';
function getUserToken(BearerToken) {
    const token = BearerToken && BearerToken.split(' ')[1];
    if (token == null)
        return null;
    return jsonwebtoken_1.default.decode(token);
}
exports.getUserToken = getUserToken;
function authenticateToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const authHeader = req.headers['authorization'] || req.query['token'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) {
            res.sendStatus(401);
            return null;
        }
        try {
            const user = yield jsonwebtoken_1.default.verify(token, SECRET_KEY);
            next && next();
            return user;
        }
        catch (err) {
            res.sendStatus(403);
        }
        return null;
    });
}
exports.authenticateToken = authenticateToken;
;
function verifyAdminPrivilage(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield authenticateToken(req, res);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            const userDb = yield (0, db_functions_1.findUserByEmail)(user.email);
            if (!userDb) {
                return res.status(404).json({ error: 'User not found' });
            }
            if (userDb.privilege !== "admin") {
                return res.status(403).json({ error: 'Unauthorized' });
            }
            next();
        }
        catch (error) {
            console.error('Error verifying admin privilege:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
}
exports.verifyAdminPrivilage = verifyAdminPrivilage;
function generateAccessToken(user) {
    return jsonwebtoken_1.default.sign({ id: user.id, email: user.email, privilege: user.privilege }, SECRET_KEY);
}
exports.generateAccessToken = generateAccessToken;
;
