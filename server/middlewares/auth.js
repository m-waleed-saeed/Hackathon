const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // "Bearer <token>"

  if (!token) {
    return res.status(401).json({ success: false, message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // yaha decoded ke andar id honi chahiye
    next();
  } catch (err) {
    res.status(401).json({ success: false, message: "Token is not valid" });
  }
};

module.exports = authMiddleware;