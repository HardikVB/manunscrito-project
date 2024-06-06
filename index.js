const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const cors = require('cors');

require('dotenv').config()
// Increase the request body size limit
app.use(bodyParser.json({ limit: '50mb' }));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');
const storeRoute = require('./routes/store');

app.use('/login', loginRoute);
app.use('/store', storeRoute);
app.use('/register', registerRoute);

// Rota padrão para servir o arquivo index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(process.env.PORT, () => {
  console.log(`Servidor a correr na porta ${process.env.PORT}`);
});
