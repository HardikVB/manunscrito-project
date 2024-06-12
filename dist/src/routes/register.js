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
const user_db_1 = require("../db/user-db");
const router = express_1.default.Router();
exports.router = router;
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`[POST] Register`);
    let user = req.body; // Corrigido o tipo para User, presumindo que UserResponse seja o tipo correto
    try {
        // Gerar o hash da senha usando bcrypt
        const hashedPassword = yield bcrypt_1.default.hash(user.password, 10);
        user.password = hashedPassword;
        // Adicionar o usuário com a senha criptografada ao banco de dados
        yield user_db_1.User.create(user);
        res.status(201).send('Utilizador registado com sucesso!');
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Erro ao registar utilizador');
    }
}));
