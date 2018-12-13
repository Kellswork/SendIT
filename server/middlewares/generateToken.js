import jwt from 'jsonwebtoken';

const generateToken = (rows, name, email) => {
  const token = jwt.sign({
    id: rows.rows[0].id,
    name: name.rows[0].name,
    email,
    admin: rows.rows[0].isadmin,
  },
  process.env.JWT_SECRET_KEY, {
    expiresIn: '24h',
  });
  return token;
};
export default generateToken;
