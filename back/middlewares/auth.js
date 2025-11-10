const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { devSecretKey } = require('../utils/config');

function extractBearerToken(header) {
  return header.replace('_id=', '');
}

module.exports = (req, res, next) => {
  const authorization = req.headers.cookie;

  if (!authorization || !authorization.startsWith('_id=')) {
    return next(new UnauthorizedError('Авторизуйтесь'));
  }
  const token = extractBearerToken(authorization);
  let payload;
  try {
    payload = jwt.verify(token, devSecretKey);
  } catch (err) {
    return next(new UnauthorizedError('Ошибка авторизации'));
  }
  req.user = payload;
  next();
};