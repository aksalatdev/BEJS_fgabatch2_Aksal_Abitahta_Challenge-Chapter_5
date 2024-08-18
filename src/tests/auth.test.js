const request = require("supertest");
const app = require("../app");

// REGISTER
describe("Auth Controller", () => {
	let randomEmail;
	beforeAll(() => {
		const randomNum = Math.floor(Math.random() * 1000000);
		randomEmail = `testuser${Date.now()}${randomNum}@hohohiheih.com`;
	});

	test("should register a new user", async () => {
		const res = await request(app).post("/api/v1/auth/register").send({
			name: "testUser",
			email: randomEmail,
			password: "test123",
		});

		expect(res.statusCode).toEqual(201);
		expect(res.body).toHaveProperty("id");
	});

	// LOGIN
	test("should login a user", async () => {
		const loginRes = await request(app).post("/api/v1/auth/login").send({
			email: randomEmail,
			password: "test123",
		});

		const token = loginRes.headers.authorization.replace("Bearer ", "");
		// console.log("Token received:", token);

		expect(loginRes.statusCode).toEqual(200);
		expect(token).toBeTruthy();
	});

	// AUTHENTICATE
	test("should authenticate a logged-in user", async () => {
		// Login and get token
		const loginRes = await request(app).post("/api/v1/auth/login").send({
			email: randomEmail,
			password: "test123",
		});

		const token = loginRes.headers.authorization.replace("Bearer ", "");
		// console.log("Token received:", token);

		// Gunakan token untuk authenticate
		const res = await request(app)
			.get("/api/v1/auth/authenticate")
			.set("Authorization", `Bearer ${token}`);

		// console.log("Authentication Response Status:", res.statusCode);
		// console.log("Authentication Response Body:", res.text);

		expect(res.statusCode).toEqual(200);
		expect(res.text).toEqual("Authenticated");
	});
});
