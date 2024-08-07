const { Router } = require("express");

const DishesController = require("../controllers/DishesController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization");

const dishesRoutes = Router();

const dishesController = new DishesController();

dishesRoutes.use(ensureAuthenticated);

dishesRoutes.get("/", dishesController.index);
dishesRoutes.post("/", verifyUserAuthorization("admin"), dishesController.create);
dishesRoutes.get("/:id", dishesController.show);
dishesRoutes.put("/:id", verifyUserAuthorization("admin"), dishesController.update);
dishesRoutes.delete("/:id", verifyUserAuthorization("admin"), dishesController.delete);

module.exports = dishesRoutes;