const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  adress: {
    type: String,
  },
  postCode: {
    type: String,
  },
  name: {
    type: String,
  },
  dateOfPurchace: {
    type: Date,
  },
  email: {
    type: String,
  },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
