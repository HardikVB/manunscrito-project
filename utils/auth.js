const jwt = require('jsonwebtoken');
const SECRET_KEY = 'hardik_bachu';
const { findUserByEmail } = require('./db-functions');

const getUserToken = (BearerToken) => {
  const token = BearerToken && BearerToken.split(' ')[1];
  
  if (token == null) return null;

  return jwt.decode(token, SECRET_KEY);
}

const authenticateToken = (req, res, next) => {  
  const authHeader = req.headers['authorization'] || req.query['token']; 
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user; // Passa o usuário para o próximo middleware
    next();
  });
};

const verifyAdminPrivilage = async (req, res, next) => {
  authenticateToken(req, res, async (err) => {
    if (err) return;

    const user = req.user;

    const userDb = await findUserByEmail(user.email);

    if (!userDb) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (userDb.privilege !== "admin") {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    next();
  });
}

const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email, privilege: user.privilege }, SECRET_KEY);
};

module.exports = {
  authenticateToken,
  generateAccessToken,
  getUserToken,
  verifyAdminPrivilage
};
