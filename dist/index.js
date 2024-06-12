"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const store_1 = require("./src/routes/store");
const login_1 = require("./src/routes/login");
const register_1 = require("./src/routes/register");
const app = express();
// Increase the request body size limit
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
// Middleware to extract language parameter and pass it to the request
app.use('/:language', (req, res, next) => {
    req.language = req.params.language;
    next();
});
app.use('/:language/login', login_1.router);
app.use('/:language/store', store_1.router);
app.use('/:language/register', register_1.router);
// Default route to serve the index.html file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});
app.listen(process.env.PORT, () => {
    console.log(`Servidor a correr na porta ${process.env.PORT}`);
});
