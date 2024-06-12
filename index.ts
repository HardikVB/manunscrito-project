const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
import { Request, Response, NextFunction } from 'express';
import { router as storeRoute } from './src/routes/store';
import { router as loginRoute } from './src/routes/login';
import { router as registerRoute } from './src/routes/register';
const app = express();

// Increase the request body size limit
app.use(bodyParser.json({ limit: '50mb' }));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

interface LanguageRequest extends Request {
  language?: string;
}

// Middleware to extract language parameter and pass it to the request
app.use('/:language', (req: LanguageRequest, res: Response, next: NextFunction) => {
  req.language = req.params.language;

  next();
});

app.use('/:language/login', loginRoute);
app.use('/:language/store', storeRoute);
app.use('/:language/register', registerRoute);

// Default route to serve the index.html file
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(process.env.PORT, () => {
  console.log(`Servidor a correr na porta ${process.env.PORT}`);
});
