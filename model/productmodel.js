const mongoose = require("mongoose");

const productschema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "produtcategorytable",
    required: true,
  },
  productname: {
    type: String,
    required: true,
  },
  productimage: {
    type: [String], // Changed to an array of strings (URLs)
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  batterhours: {
    type: String,
    required: true,
  },
});

const productmodell = mongoose.model("produtctable", productschema);

module.exports = productmodell;
