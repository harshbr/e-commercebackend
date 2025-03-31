const mongoose = require("mongoose");

const usermodeldefine = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const usermodell = mongoose.model("registertable", usermodeldefine);

module.exports = usermodell;
