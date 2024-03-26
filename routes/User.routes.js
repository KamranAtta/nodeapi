var user = require("../controllers/User.Controller");

module.exports = (app) => {
  app.post("/signup", user.signup);
  app.post("/login", user.login);
  app.get("/users", user.getAllUsers);
  app.get('/users/:id', user.getUserById);
  app.patch('/users/:id', user.updateUserById);
  app.delete('/users/:id', user.deleteUser);
};