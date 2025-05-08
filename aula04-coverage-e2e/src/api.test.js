const { describe, it } = require("mocha");
const request = require("supertest");
const app = require("./api");
const assert = require("assert");
describe("API Suit Test", () => {
  describe("/contact", () => {
    it("should request the contact page and return HTTP Status 200", async () => {
      const response = await request(app).get("/contact");
      assert.deepStrictEqual(response.status, 200);
      assert.deepEqual(response.text, "contact us page");
    });
  });
  describe("/hello", async () => {
    it("should request an inexistent route /hi and redirect to /hello", async () => {
      const response = await request(app).get("/hi");
      assert.deepStrictEqual(response.status, 200);
      assert.deepStrictEqual(response.text, "default page");
    });
  });
  describe("/login", () => {
    it("should login successfully on the login route and return HTTP Status 200", async () => {
      await request(app)
        .post("/login")
        .send({
          username: "vyctor",
          password: "123",
        })
        .expect(200);
    });
    it("should not login successfully on the login route with wrong credentials", async () => {
      await request(app)
        .post("/login")
        .send({
          username: "vyctorr",
          password: "1233",
        })
        .expect(401);
    });
  });
});
