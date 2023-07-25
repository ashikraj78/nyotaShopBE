var jwt = require("jsonwebtoken");

let authServices = {
  generateToken: async function (user) {
    let secret = process.env.SECRET;
    return jwt.sign(
      { _id: user._id, mobilenumber: user.mobilenumber, name: user.name },
      secret
    );
  },
};
module.exports = authServices;
