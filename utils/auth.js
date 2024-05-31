const jwt = require('jsonwebtoken');
const SECRET_KEY = 'hardik_bachu';


const getUserToken = (BerearToken) => {
  const token = BerearToken && BerearToken.split(' ')[1];
  
  if (token == null) return null

  return jwt.decode(token, SECRET_KEY);
}

const authenticateToken = (req, res, next) => {  
  try {
    const authHeader = req.headers['authorization'] || req.query['token']; 

    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, user) => {

      if (err) return res.sendStatus(403);

      next();
    });
  } catch (error) {
    console.log(error)
  }
};

const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username }, SECRET_KEY);
};

module.exports = {
  authenticateToken,
  generateAccessToken,
  getUserToken
};