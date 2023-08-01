var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema(
  {
    name: { type: String, required: true },
    mobilenumber: { type: Number, required: true, unique: true },
    isValidated: Boolean,
    isAdmin: { type: Boolean, default: false },
    isCreator: { type: Boolean, default: false },
    myProducts: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    myOrders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
