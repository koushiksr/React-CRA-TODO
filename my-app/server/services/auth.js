const jwt = require('jsonwebtoken');
const secretKey = "koushik@123";
function verifyToken(req, res, next) {
  const tokenHeader = req.headers['authorization'];
  const token = tokenHeader && tokenHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Token missing' });
  }

  try {
    const decodedToken = jwt.verify(token, secretKey, { algorithm: 'HS256' });
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
}

module.exports = verifyToken