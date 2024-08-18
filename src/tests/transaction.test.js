const request = require("supertest");
const app = require("../app");

describe("Transaction API", () => {
	let transactionId;

	test("membuat transaksi baru", async () => {
		const res = await request(app).post("/api/v1/transactions").send({
			amount: 50000,
			source_account_id: 1,
			destination_account_id: 2,
		});
		expect(res.statusCode).toEqual(201);
		expect(res.body).toHaveProperty("id");

		// Simpan transactionId untuk dipakai di test berikutnya
		transactionId = res.body.id;
	});

	// Unit test untuk mengambil by ID
	test("get transaction byID", async () => {
		// Gunakan transactionId dari test sebelumnya
		const resById = await request(app).get(
			`/api/v1/transactions/${transactionId}`,
		);
		expect(resById.statusCode).toEqual(200);
		expect(resById.body).toHaveProperty("id", transactionId);
		expect(resById.body.amount).toEqual(50000);
	});

	// Unit test untuk mengambil semua user
	test("get all transaction", async () => {
		const res = await request(app).get("/api/v1/transactions");
		expect(res.statusCode).toEqual(200);
		expect(res.body).toBeInstanceOf(Array);
	});
});
