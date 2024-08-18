const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
	const token = req.header("Authorization");
	if (!token) return res.status(401).send("Access Denied");

	// console.log("Token received in middleware:", token);

	try {
		const verified = jwt.verify(
			token.replace("Bearer ", ""),
			process.env.JWT_SECRET,
		);
		req.user = verified;
		next();
	} catch (error) {
		if (error.name === "TokenExpiredError") {
			return res.status(401).send("Token Expired");
		}
		res.status(400).send("Invalid Token");
	}
};

module.exports = authenticate;
