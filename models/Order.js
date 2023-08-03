var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var orderSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    productId: { type: Schema.Types.ObjectId, required: true, ref: "Product" },
    formDataId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "FormData",
    },
    razorPayPaymentId: { type: String, required: true },
    paidAmount: { type: Number, required: true },
    orderStatus: {
      type: String,
      enum: ["Received", "InProgress", "Delivered"],
      default: "Received",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
