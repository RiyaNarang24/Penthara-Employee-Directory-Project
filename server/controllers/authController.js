const jwt = require("jsonwebtoken");

/**
 * Verifies the admin secret key and creates a JWT token
 * for authorized employee management actions.
 */
const verifyAdminKey = (req, res) => {
  const { secretKey } = req.body;

  if (!secretKey) {
    return res.status(400).json({
      message: "Secret key is required",
    });
  }

  if (secretKey !== process.env.ADMIN_SECRET) {
    return res.status(401).json({
      message: "Invalid secret key",
    });
  }

  const token = jwt.sign(
    { role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.status(200).json({
    message: "Authentication successful",
    token,
  });
};

module.exports = {
  verifyAdminKey,
};