const mongoose = require("mongoose");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, "Name should be 3 char long"],
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    validate: [validator.isEmail, "Enter valid email"],
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    minLength: [8, "Password sholud be 8 char long"],
    required: [true, "Password is required"],
    select: false,
  },
  role: {
    type: String,
    default: "sub-admin",
  },
  status: {
    type: String,
    default: "active",
  },
  accountCreatedAt: {
    type: Date,
    default: Date.now(),
  },
});

adminSchema.pre("save", async function (next) {
  
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//  //! Get JWT Token...
adminSchema.methods.getToken = async function () {
  return await JWT.sign({ id: this._id }, process.env.SECRET_KEY_OF_ADMIN_JWT,{expiresIn:"2h"});
};

//  //! Compare Password...
adminSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("admins", adminSchema);
