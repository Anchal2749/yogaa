import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  phone: String,
  batch: String,
  payment_status: Boolean,
  month: String,
});

const User = mongoose.model("User", userSchema);
export default User;
