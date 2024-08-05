const { Router } = require("express");

const usersRouter = require("./users.routes.js");
const sessionRouter = require("./sessions.routes.js");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/sessions", sessionRouter);

module.exports = routes;