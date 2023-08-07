var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var temporaryUserSchema = new Schema(
  {
    name: String,
    mobilenumber: { type: Number, required: true },
    otp: { type: Number, required: true },
    isValidated: Boolean,
  },
  { timestamps: true }
);

module.exports = mongoose.model("TemporaryUser", temporaryUserSchema);
