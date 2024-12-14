import jwt from 'jsonwebtoken';

export const generateToken = (id, role) => {
  const payload = { id, role };
  const secretKey = process.env.JWT_SECRET;
  const token = jwt.sign(payload, secretKey, { expiresIn: '24h' });
  return token;
};
