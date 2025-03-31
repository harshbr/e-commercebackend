const mongoose = require("mongoose");

const categoryschema = new mongoose.Schema({
  productname: {
    type: String,
    required: true,
  },
  productcategoryimg: {
    type: String,
    required: true,
  },
});

const categortmodel = mongoose.model("produtcategorytable", categoryschema);

module.exports = categortmodel;
