import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';
import fs from 'fs';
import https from 'https';

import { router as storeRoute } from './src/routes/store';
import { router as loginRoute } from './src/routes/login';
import { router as registerRoute } from './src/routes/register';

const app = express();

// Increase the request body size limit
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

interface LanguageRequest extends Request {
  language?: string;
}

// Middleware to extract language parameter and pass it to the request
app.use('/:language', (req: LanguageRequest, res: Response, next: NextFunction) => {
  req.language = req.params.language;
  next();
});

// Routes
app.use('/:language/login', loginRoute);
app.use('/:language/store', storeRoute);
app.use('/:language/register', registerRoute);

// Default route to serve the index.html file
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// HTTPS server configuration
const httpsOptions = {
  key: fs.readFileSync('caminho/para/server.key'),
  cert: fs.readFileSync('caminho/para/server.cert')
};

const httpsPort = 443;
const httpsServer = https.createServer(httpsOptions, app);

httpsServer.listen(httpsPort, () => {
  console.log(`Servidor HTTPS está ouvindo na porta ${httpsPort}`);
});

// HTTP server configuration (opcional para redirecionamento HTTPS)
const httpPort = process.env.HTTP_PORT || 80;

app.listen(httpPort, () => {
  console.log(`Servidor HTTP está ouvindo na porta ${httpPort}`);
});
