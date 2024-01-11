const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true,
  },

  isOnline: {
    type: Boolean,
    default: false
  },

  cartItem: [{
    productId: {
      type: String,

    },

  }],


  createdAt: {
    type: Date,
    default: new Date()
  }
});

module.exports = mongoose.model("User", userSchema);
