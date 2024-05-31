const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

require('dotenv').config()

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const homeRoute = require('./routes/home');
const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');
const storeRoute = require('./routes/store');
const buyRoute = require('./routes/buy');
const dashboardRoute = require('./routes/dashboard');

app.use('/', homeRoute);
app.use('/login', loginRoute);
app.use('/register', registerRoute);
app.use('/store', storeRoute);
app.use('/buy', buyRoute);
app.use('/dashboard', dashboardRoute);

app.listen(process.env.PORT, () => {
  console.log(`Servidor a correr na porta ${process.env.PORT}`);
});
