var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var formDataSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    productId: { type: Schema.Types.ObjectId, required: true, ref: "Product" },
    brideData: { type: Object, required: true },
    groomData: { type: Object, required: true },
    eventsData: [{ type: Object, required: true }],
    specialNotes: String,
    images: [{ type: String }],
    orderId: { type: Schema.Types.ObjectId, ref: "Order" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FormData", formDataSchema);
