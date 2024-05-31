const express = require('express');
const router = express.Router();
const { addUser } = require('../utils/db');
const bcrypt = require('bcrypt')

router.get('/', (req, res) => {
  res.render('register');
});

router.post('/register', async (req, res) => {
    console.log(`[POST] Register`)

    const { username, password, email } = req.body;
  
    try {
      // Gerar o hash da senha usando bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Adicionar o usuário com a senha criptografada ao banco de dados
      await addUser(username, email, hashedPassword);
  
      res.status(201).send('Utilizador registado com sucesso!');
  
    } catch (error) {
      console.log(error)
      res.status(500).send('Erro ao registar utilizador');
    }
});

module.exports = router;