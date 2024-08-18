const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Register User
exports.register = async (req, res) => {
	const { email, password, name } = req.body;
	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await prisma.user.create({
			data: {
				email,
				name,
				password: hashedPassword,
			},
		});
		res.status(201).json(user);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

// Login User
exports.login = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await prisma.user.findUnique({ where: { email } });
		if (!user)
			return res.status(400).json({ error: "Email or password is incorrect" });

		const validPass = await bcrypt.compare(password, user.password);
		if (!validPass) return res.status(400).json({ error: "Invalid password" });

		const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
			expiresIn: "3m",
		});
		res.header("Authorization", token).send(token);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
