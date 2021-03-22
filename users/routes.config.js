const userController = require("./controllers/users.controller");
const validationMiddleware = require("./../authorization/middlewares/verify.user.middleware");

exports.routesConfig = (app) => {
  app.post("/users", [userController.insert]);
  app.get("/users", [
    validationMiddleware.validJWTNeeded,
    userController.listUsers,
  ]); 
  app.get("/users/:userId", [
    validationMiddleware.validJWTNeeded,
    userController.getById,
  ]);
  app.put("/users/:userId", [
    validationMiddleware.validJWTNeeded,
    userController.updateById,
  ]);
  app.delete("/users/:userId", [
    validationMiddleware.validJWTNeeded,
    userController.deleteUser,
  ]);
};
