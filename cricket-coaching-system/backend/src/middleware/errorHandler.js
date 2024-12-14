export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const status = err.name === 'ValidationError' ? 400 :
                 err.name === 'UnauthorizedError' ? 401 : 500;
  const message = err.name === 'ValidationError' ? err.message :
                  err.name === 'UnauthorizedError' ? 'Invalid token' : 'Something went wrong!';

  res.status(status).json({ message });
};
