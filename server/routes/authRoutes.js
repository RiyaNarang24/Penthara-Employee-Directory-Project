const express = require("express");

const { verifyAdminKey } = require("../controllers/authController");

const router = express.Router();

/**
 * Route to verify the admin secret key.
 */
router.post("/verify-key", verifyAdminKey);

module.exports = router;