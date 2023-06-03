const mongoose = require("mongoose");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, "Name should be 3 char long"],
    required: [true, "Name is required"],
  },
  profilePicture: {
    data: Buffer,
    contentType: String,
  },
  email: {
    type: String,
    validate: [validator.isEmail, "Enter valid email"],
    required: [true, "Email is required"],
    unique: true,
  },
  phone: {
    type: String,
    minLength: [10, "Phone no must be 10 digit long"],
    default: "0000000000",
  },
  password: {
    type: String,
    minLength: [8, "Password sholud be 8 char long"],
    required: [true, "Password is required"],
    select: false,
  },
  status: {
    type: String,
    default: "Active",
  },
  accountCreatedAt: {
    type: Date,
    default: Date.now(),
  },

  resetPasswordToken: String,
  tokenExpireTime: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//  //! Get JWT Token...
userSchema.methods.getToken = async function () {
  return await JWT.sign({ id: this._id }, process.env.SECRET_KEY_OF_JWT);
};

//  //! Compare Password...
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//  //! Get Reset Password Token...
userSchema.methods.getResetPasswordToken = function () {
  //  //? Generate Reset Password Token...
  const resetToken = crypto.randomBytes(10).toString("hex");

  //  //? Hash the Reset Password Token...
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  //  //? Add reset password expiry time of db...
  this.tokenExpireTime = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

module.exports = mongoose.model("Users", userSchema);
