const userController = require("./controllers/users.controller");
const validationMiddleware = require("./../authorization/middlewares/verify.user.middleware");

exports.routesConfig = (app) => {
  app.post("/users", [userController.insert]);
  app.get("/users", [
    validationMiddleware.validJWTNeeded,
    userController.listUsers,
  ]);

  app.get("/users/:userId", [userController.getById]);
  app.put("/users/:userId", [userController.updateById]);
  app.delete("/users/:userId", [userController.deleteUser]);
};
