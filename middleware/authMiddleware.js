var jwt = require("jsonwebtoken");
var userService = require("../src/users/userServices");
var authMiddleware = {
  identifyUser: async function (req, res, next) {
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      try {
        var payload = await jwt.verify(token, process.env.SECRET);
        var userId = payload._id;
        var user = await userService.showUser(userId);
        req.user = user;
        next();
      } catch (error) {
        return res.status(400).send({ message: "invalid token" });
      }
    } else {
      return res.status(400).send({ message: "token required" });
    }
  },
};
module.exports = authMiddleware;
