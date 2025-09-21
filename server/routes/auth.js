const express = require("express");
const router = express.Router();
const { register, login, forgotPassword, resetPassword, updateUserProfile } = require("../controller/auth");

router.post("/register", register);
router.post("/login",  login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.put("/update/:id", updateUserProfile);

module.exports = router;
