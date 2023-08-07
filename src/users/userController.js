const authServices = require("../auth/authServices");
let userServices = require("./userServices");
const accountSid = process.env.TWILLIO_ACCOUNT_SID;
const authToken = process.env.TWILLIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

let userController = {
  generateOTP: async function (req, res) {
    const { name, mobilenumber, otpForm } = req.body;
    if (!mobilenumber) {
      return res.status(400).json({ msg: " Mobile Number is required" });
    } else if (!name && otpForm == "singup") {
      return res.status(400).json({ msg: "Name is required" });
    } else if (otpForm == "signup") {
      const mobileNumberExist = await userServices.findMobileNumber(
        mobilenumber
      );
      if (mobileNumberExist) {
        return res
          .status(400)
          .json({ msg: "Mobile Number is already registered. Please Login" });
      }
    } else if (otpForm !== "signup") {
      const mobileNumberExist = await userServices.findMobileNumber(
        mobilenumber
      );
      if (!mobileNumberExist) {
        return res.status(400).json({ msg: "Please Signup first" });
      }
    }

    const otp = 123456;

    // const otp = Math.floor(100000 + Math.random() * 900000);
    // const message = `Your OTP code is: ${otp}`;

    // try {
    //   await client.messages.create({
    //     body: message,
    //     from: "+17626004967",
    //     to: "+918989047460",
    //   });
    // } catch (error) {
    //   console.error(error);
    //   return res.status(500).json({ msg: "Failed to send OTP" });
    // }

    const temporaryUser = { name, mobilenumber, otp };
    try {
      const createdTemporaryUser = await userServices.createTemporaryUser(
        temporaryUser
      );
      return res.status(201).json({
        mobileNumber: createdTemporaryUser.mobilenumber,
        temporaryUserId: createdTemporaryUser._id,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Failed to create temporary user" });
    }
  },
  createUser: async function (req, res) {
    const userOtp = req.body.otp;
    const mobilenumber = req.body.mobilenumber;
    const temporaryUserId = req.body.temporaryUserId;
    // Get stored OTP from database
    const storedUser = await userServices.findTemporaryUser(temporaryUserId);
    const storedOtp = storedUser?.otp;

    if (userOtp == storedOtp) {
      const user = {
        name: storedUser.name,
        mobilenumber: storedUser.mobilenumber,
        isValidated: true,
        isAdmin: storedUser.mobilenumber == "918989047460" ? true : false,
        isCreator: false,
      };

      if (!user.name || !user.mobilenumber) {
        res.status(400).json({ msg: "name, mobilenumber is required" });
      }

      try {
        const createUser = await userServices.createUser(user);
        await userServices.deleteTemporaryUser(storedUser._id);
        const jwtToken = await authServices.generateToken(createUser);
        return res.status(201).json({
          user: createUser.toJSON(),
          jwtToken,
        });
      } catch (error) {
        res.status(500).json({ msg: "Something went wrong" });
      }
    } else {
      // OTP verification failed
      return res
        .status(400)
        .json({ msg: "Invalid OTP. Please check and try again." });
    }
  },

  listUsers: async function (req, res, next) {
    try {
      const listUsers = await userServices.listUsers();
      return res.json({ users: listUsers });
    } catch (error) {
      next(error);
    }
  },
  loginUser: async function (req, res, next) {
    const userOtp = req.body.otp;
    const mobilenumber = req.body.mobilenumber;
    const temporaryUserId = req.body.temporaryUserId;

    // Get stored OTP from database
    const storedUser = await userServices.findTemporaryUser(temporaryUserId);
    const storedOtp = storedUser?.otp;

    if (userOtp == storedOtp) {
      try {
        const user = await userServices.findUser(mobilenumber);
        await userServices.deleteTemporaryUser(storedUser._id);
        const jwtToken = await authServices.generateToken(user);
        return res.status(201).json({
          user: user.toJSON(),
          jwtToken,
        });
      } catch (error) {
        res.status(500).json({ msg: "Something went wrong,  first singup" });
      }
    } else {
      return res
        .status(400)
        .json({ msg: "Invalid OTP. Please check and try again." });
    }
  },

  showUser: async function (req, res, next) {
    const id = req.query.id;
    try {
      let user = await userServices.showUser(id);
      return res.json({ user });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = userController;
