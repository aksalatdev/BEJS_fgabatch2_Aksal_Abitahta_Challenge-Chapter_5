const express = require("express");
const authController = require("../../../controllers/authController");
const authenticate = require("../../../middlewares/authenticate");
const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);

// sementara
router.get("/authenticate", authenticate, (req, res) => {
	res.status(200).send("Authenticated");
});

module.exports = router;
