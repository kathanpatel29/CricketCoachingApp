import crypto from 'crypto';

export const hashPassword = (password) => {
  if (!password) {
    throw new Error('Password is required');
  }

  const salt = crypto.randomBytes(16).toString('hex');
  const hashedPassword = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return { salt, hashedPassword };
};

export const validatePassword = (password, salt, hashedPassword) => {
  const hashedAttempt = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return hashedAttempt === hashedPassword;
};
