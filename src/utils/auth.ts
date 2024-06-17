import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from './db';
import { findUserByEmail } from './db-functions';

const SECRET_KEY = 'hardik_bachu';

function getUserToken(BearerToken: string) {
  const token = BearerToken && BearerToken.split(' ')[1];
  
  if (token == null) return null;

  return jwt.decode(token);
}

async function authenticateToken(req: Request, res: Response, next?: NextFunction): Promise<User | null> {  
  const authHeader = req.headers['authorization'] || req.query['token'] as string; 
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    res.sendStatus(401);

    return null;
  }

  try {
    const user = await jwt.verify(token, SECRET_KEY) as User;

    next && next();

    return user;

  } catch (err) {
    res.sendStatus(403);
  }

  return null;
};

async function verifyAdminPrivilage(req: Request, res: Response, next: NextFunction) {
  try {

    const user = await authenticateToken(req, res);

    if(!user) {
      return null;
    }

    const userDb = await findUserByEmail(user.email);

    if (!userDb) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (userDb.privilege !== "admin") {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    next();
  } catch (error) {
    console.error('Error verifying admin privilege:', error);

    res.status(500).json({ error: 'Internal server error' });
  }
}

function generateAccessToken(user: User) {
  return jwt.sign({ id: user.id, email: user.email, privilege: user.privilege }, SECRET_KEY);
};


export { generateAccessToken, verifyAdminPrivilage, authenticateToken, getUserToken };
