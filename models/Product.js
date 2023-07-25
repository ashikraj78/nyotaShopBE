var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var productSchema = new Schema(
  {
    title: { type: String, required: true },
    subTitle: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    cost: { type: Number, required: true },
    timeDuration: { type: Number, required: true },
    videoLink: { type: String, required: true },
    videoTheme: { type: String, required: true },
    musicTheme: { type: String, required: true },
    photosRequired: { type: Boolean, required: true },
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Product", productSchema);
