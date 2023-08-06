const { stat } = require("fs");
const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        status: {
          type: String,
          default: "pending",
        },
      },
    ],
    amount: {
      type: Number,
      required: true,
      default: 0,
    },
    address: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("Order", OrderSchema);