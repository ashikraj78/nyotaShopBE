var User = require("../../models/User");
var TemporaryUser = require("../../models/TemporaryUser");

let userServices = {
  createTemporaryUser: async function (user) {
    try {
      return await TemporaryUser.create(user);
    } catch (error) {
      return error;
    }
  },
  findTemporaryUser: async function (mobilenumber) {
    try {
      return await TemporaryUser.findOne({ mobilenumber: mobilenumber });
    } catch (error) {
      return error;
    }
  },
  deleteTemporaryUser: async function (mobilenumber) {
    try {
      return await TemporaryUser.findOneAndDelete({
        mobilenumber: mobilenumber,
      });
    } catch (error) {
      return error;
    }
  },
  createUser: async function (user) {
    try {
      return await User.create(user);
    } catch (error) {
      return error;
    }
  },
  listUsers: async function () {
    try {
      return await User.find({});
    } catch (error) {
      return error;
    }
  },
  showUser: async function (userId) {
    try {
      let user = await User.findById(userId).populate(
        "myProducts",
        "title cost videoLink"
      );
      return user;
    } catch (error) {
      return error;
    }
  },
  findUser: async function (mobilenumber) {
    try {
      return await (
        await User.findOne({ mobilenumber: mobilenumber })
      ).populate("myProducts", "title cost videoLink");
    } catch (error) {
      return error;
    }
  },
  updateUser: async function (userId, user) {
    try {
      return await User.findByIdAndUpdate(userId, user, { new: true });
    } catch (error) {
      return error;
    }
  },
};
module.exports = userServices;
