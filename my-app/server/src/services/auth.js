const env = require("../config/envConfig");
const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const tokenHeader = req.headers["authorization"];
  const token = tokenHeader && tokenHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Token missing" });
  }

  try {
    const decodedToken = jwt.verify(token, env.secretKey, {
      algorithm: "HS256",
    });
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
}

module.exports = verifyToken;
