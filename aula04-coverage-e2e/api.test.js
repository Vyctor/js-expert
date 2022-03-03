const { describe, it } = require("mocha");
const request = require("supertest");
const app = require("./api");
const assert = require("assert");

describe("API Suit Test", () => {
  describe("/contact", () => {
    it("should request the contact page and return HTTP Status 200", async () => {
      const response = await request(app).get("/contact").expect(200);

      assert.deepStrictEqual(response.text, "contact us page");
    });
  });
  describe("/hello", () => {
    it("should request an inexistent rooute /hi and redirect to /hello", async () => {
      const response = await request(app).get("/hi").expect(200);

      assert.deepStrictEqual(response.text, "Hello World");
    });
  });
  describe("/login", () => {
    it("should login successfully on the login route and return HTTP Status 200", async () => {
      const response = await request(app)
        .post("/login")
        .send({
          username: "Vyctor",
          password: "123",
        })
        .expect(200);

      assert.deepStrictEqual(response.text, "Login has succeded");
    });
    it("should not do login with wrong credentials", async () => {
      const response = await request(app)
        .post("/login")
        .send({
          username: "Marcos",
          password: "123",
        })
        .expect(401);

      assert.ok(response.unauthorized);

      assert.deepStrictEqual(response.text, "Login failed");
    });
  });
});
