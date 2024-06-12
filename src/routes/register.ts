import { Request, Response } from 'express';
import express from 'express';
import bcrypt from 'bcrypt';
import { User } from '../db/user-db';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  console.log(`[POST] Register`);

  let user = req.body as User; // Corrigido o tipo para User, presumindo que UserResponse seja o tipo correto

  try {
    // Gerar o hash da senha usando bcrypt
    const hashedPassword = await bcrypt.hash(user.password, 10);

    user.password = hashedPassword;

    user.privilege = "normal"

    // Adicionar o usuário com a senha criptografada ao banco de dados
    await User.create(user);

    res.status(201).send({message: 'Utilizador registado com sucesso!'});

  } catch (error) {
    console.log(error);
    res.status(500).send({message: 'Utilizador registado com sucesso!'});
  }
});

export { router }
