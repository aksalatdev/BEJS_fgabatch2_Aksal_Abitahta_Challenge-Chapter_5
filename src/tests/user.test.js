const request = require("supertest");
const app = require("../app");

describe("User Controller", () => {
	let userId;
	let randomEmail;

	beforeAll(async () => {
		// Generate email random
		const randomNum = Math.floor(Math.random() * 1000000);
		randomEmail = `testuser${Date.now()}${randomNum}@hohohiheih.com`;

		const res = await request(app).post("/api/v1/users").send({
			name: "testId",
			email: randomEmail,
			password: "password1234",
			identity_type: "ID Card",
			identity_number: "555555",
			address: "jl. joko",
		});

		// Simpan userId yang didapat dari pembuatan user
		userId = res.body.id;
		expect(res.statusCode).toEqual(201);
	});

	// Unit test untuk mengambil user berdasarkan ID
	test("get user by ID", async () => {
		const resById = await request(app).get(`/api/v1/users/${userId}`);
		expect(resById.statusCode).toEqual(200);
		expect(resById.body).toHaveProperty("id", userId);
		expect(resById.body.name).toEqual("testId");
	});

	// Unit test untuk mengambil semua user
	test(" get all users", async () => {
		const res = await request(app).get("/api/v1/users");
		expect(res.statusCode).toEqual(200);
		expect(res.body).toBeInstanceOf(Array);
	});
});
