const http = require("http");
const DEFAULT_USER = {
  username: "vyctor",
  password: "123",
};

const routes = {
  "/contact:get": (request, response) => {
    response.writeHead(200, {
      "Content-Type": "text/plain",
    });
    response.write("contact us page");
    return response.end();
  },
  "/login:post": async (request, response) => {
    for await (const data of request) {
      const user = JSON.parse(data);
      console.log("user", user);
      if (
        user.username !== DEFAULT_USER.username ||
        user.password !== DEFAULT_USER.password
      ) {
        response.writeHead(401, {
          "Content-Type": "text/plain",
        });
        response.write("Login failed");
        return response.end();
      }
      response.writeHead(200, {
        "Content-Type": "text/plain",
      });
      response.write("Login successful");
      return response.end();
    }
  },
  default: (request, response) => {
    response.writeHead(200, {
      "Content-Type": "text/plain",
    });
    return response.end("default page");
  },
};

const handler = function (request, response) {
  const { url, method } = request;
  const routeKey = `${url}:${method.toLowerCase()}`;
  const chosen = routes[routeKey] || routes.default;
  return chosen(request, response);
};

const app = http.createServer(handler);

app.listen(3000, () => {});

module.exports = app;
