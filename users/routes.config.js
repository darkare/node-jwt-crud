const userController = require("./controllers/users.controller");

exports.routesConfig = (app) => {
  app.get("/users", [userController.listUsers]);
  app.post("/users", [userController.insert]);
  app.get("/users/:userId", [userController.getById]);
  app.put("/users/:userId", [userController.updateById]);
  app.delete("/users/:userId", [userController.deleteUser]);
};
