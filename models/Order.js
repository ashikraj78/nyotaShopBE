var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var orderSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    videoId: { type: String, required: true },
    isCompleted: Boolean,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
