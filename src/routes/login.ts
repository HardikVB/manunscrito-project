import { Request, Response } from 'express';
import express from 'express';
import bcrypt from 'bcrypt';
import { User } from '../db/user-db';
import { findUserByEmail } from '../utils/db-functions';

const router = express.Router();
const { generateAccessToken } = require('../utils/auth')


router.post('/', async (req: Request, res: Response) => {
    console.log(`[POST] Login`)

    let userRequest = req.body as User;

    try {
        const user = await findUserByEmail(userRequest.email);

        if (user == null) {
            return res.status(400).send('Nome de utilizador ou palavra-passe incorretos');
        }

        // Comparar a senha fornecida com o hash da senha armazenada no banco de dados
        const match = await bcrypt.compare(userRequest.password, user.password);

        if (!match) {
            return res.status(400).send('Nome de utilizador ou palavra-passe incorretos');
        }

        // Se as senhas coincidirem, gerar e enviar token de acesso
        const accessToken = generateAccessToken(user);

        res.send({accessToken: accessToken})

    } catch (error) {
        res.status(500).send('Erro ao fazer login');
    }
});
  
export { router }