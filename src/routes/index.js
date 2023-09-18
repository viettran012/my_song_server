const apiRouter = require("./v1/api");
const userRouter = require("./v1/user");
const userRouterV2 = require("./v2/user");
const apiRouterV2 = require("./v2/api");

function route(app) {
  // api
  app.use("/api", apiRouter);
  app.use("/user", userRouter);

  app.use("/v2/user", userRouterV2);
  app.use("/v2/api", apiRouterV2);
}

module.exports = route;
