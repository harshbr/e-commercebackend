const mongoose = require("mongoose");
const orderschema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  items: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  orderdate: {
    type: Date,
    default: Date.now,
  },
});

const ordermodell = mongoose.model("ordertable", orderschema);

module.exports = ordermodell;
