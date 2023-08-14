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
  identifyCreator: async function (req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(400).send({ message: "Token required" });
    }
    try {
      const payload = await jwt.verify(token, process.env.SECRET);
      const mobileNumber = payload.mobilenumber;
      if (!mobileNumber) {
        return res
          .status(400)
          .send({ message: "Mobile number missing in token" });
      }
      const creatorMobileNumbers =
        process.env.CREATOR_MOBILE_NUMBERS?.split(",");

      if (creatorMobileNumbers.includes(mobileNumber)) {
        next();
      } else {
        return res.status(403).send({ message: "You are not authenticated" });
      }
    } catch (error) {
      return res.status(400).send({ message: "Invalid token" });
    }
  },
};
module.exports = authMiddleware;
