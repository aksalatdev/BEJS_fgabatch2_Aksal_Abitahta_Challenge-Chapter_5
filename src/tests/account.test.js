const request = require("supertest");
const app = require("../app");

describe("Account API", () => {
	let accountId;
	let userId = 1;

	test("create a new account", async () => {
		const res = await request(app).post("/api/v1/accounts").send({
			userId: userId,
			bank_name: "Bank Test",
			bank_account_number: "1234567890",
			balance: 100000,
		});

		expect(res.statusCode).toEqual(201);
		expect(res.body).toHaveProperty("id");
		accountId = res.body.id;
	});

	// Unit test untuk mengambil semua user
	test("get all accounts", async () => {
		const res = await request(app).get("/api/v1/accounts");
		expect(res.statusCode).toEqual(200);
		expect(Array.isArray(res.body)).toBeTruthy();
	});

	// by id
	test("get account by id", async () => {
		const res = await request(app).get(`/api/v1/accounts/${accountId}`);
		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty("id", accountId);
		expect(res.body.bank_name).toEqual("Bank Test");
	});
});
