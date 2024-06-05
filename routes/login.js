const express = require('express');
const router = express.Router();
const { findUserByEmail } = require('../utils/db')
const { generateAccessToken } = require('../utils/auth')
const bcrypt = require('bcrypt')

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', async (req, res) => {
    console.log(`[POST] Login`)

    const { email, password } = req.body;

    try {
        const user = await findUserByEmail(email);

        if (user == null) {
            return res.status(400).send('Nome de utilizador ou palavra-passe incorretos');
        }

        // Comparar a senha fornecida com o hash da senha armazenada no banco de dados
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(400).send('Nome de utilizador ou palavra-passe incorretos');
        }

        // Se as senhas coincidirem, gerar e enviar token de acesso
        const accessToken = generateAccessToken(user);
        res.send(accessToken);

    } catch (error) {
        console.log(error)

        res.status(500).send('Erro ao fazer login');
    }
});
  
module.exports = router;