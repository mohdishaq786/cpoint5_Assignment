const mongoose = require("mongoose");
const { stringify } = require("querystring");

const itemSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Inventory = mongoose.model("Inventory", itemSchema);

module.exports = Inventory;
