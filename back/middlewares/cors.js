const allowedMethods = 'GET,HEAD,PUT,PATCH,POST,DELETE';
const allowedCors = [
  'http://localhost:3000',
  'http://localhost:3002',
  'https://localhost:3000',
  'http://localhost:3001',
  'https://localhost:3001',
  'https://nm4homies-dinosaurcreative.vercel.app',
  'https://nm4homies.vercel.app',
  'https://nm4h.vercel.app',
  'https://nm4h-dinosaurcreative.vercel.app'
];

module.exports = (req, res, next) => {
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const { origin } = req.headers;

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', allowedMethods);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  return next();
};