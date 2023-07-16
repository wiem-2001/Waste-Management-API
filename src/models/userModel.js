const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, require: true },
  confirmPassword:{ type: String, require: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  phone_number: { type: Number, required: false },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
module.exports = User;
