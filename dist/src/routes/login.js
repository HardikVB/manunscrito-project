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
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_functions_1 = require("../utils/db-functions");
const router = express_1.default.Router();
exports.router = router;
const { generateAccessToken } = require('../utils/auth');
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`[POST] Login`);
    let userRequest = req.body;
    try {
        const user = yield (0, db_functions_1.findUserByEmail)(userRequest.email);
        if (user == null) {
            return res.status(400).send('Nome de utilizador ou palavra-passe incorretos');
        }
        // Comparar a senha fornecida com o hash da senha armazenada no banco de dados
        const match = yield bcrypt_1.default.compare(userRequest.password, user.password);
        if (!match) {
            return res.status(400).send('Nome de utilizador ou palavra-passe incorretos');
        }
        // Se as senhas coincidirem, gerar e enviar token de acesso
        const accessToken = generateAccessToken(user);
        res.send({ accessToken: accessToken });
    }
    catch (error) {
        res.status(500).send('Erro ao fazer login');
    }
}));
