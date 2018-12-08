import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({
      status: 401,
      error: 'access denied, no token provided',
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userData = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      status: 401,
      error: 'authentication failed, please login again',
    });
  }
};
export default auth;
