import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, age, email, phone, batch } = req.body;
  
  if (age < 18 || age > 65) return res.status(400).json({ message: "Age must be between 18-65" });

  const newUser = new User({ name, age, email, phone, batch, payment_status: false, month: new Date().toISOString().slice(0, 7) });

  await newUser.save();
  res.json({ message: "User Registered! Proceed to Payment." });
});

router.post("/payment", async (req, res) => {
  function CompletePayment() { return true; } // Mock Payment Function

  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ message: "User not found" });

  const paymentSuccess = CompletePayment();
  if (paymentSuccess) {
    user.payment_status = true;
    await user.save();
    return res.json({ message: "Payment Successful!" });
  } else {
    return res.status(500).json({ message: "Payment Failed" });
  }
});

export default router;
