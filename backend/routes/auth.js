import { Router } from "express";
const router = Router();
import bcrypt from "bcryptjs";
import passport from "passport";
const { authenticate } = passport;
import User from "../models/User.js";

// Register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const exUser = await User.findOne({ email });
    if (exUser) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Login
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error("Passport error:", err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (!user) {
      return res.status(401).json({ message: info?.message || "Invalid credentials" });
    }

    req.logIn(user, (err) => {
      if (err) {
        console.error("Login error:", err);
        return res.status(500).json({ message: "Failed to log in" });
      }
      return res.status(200).json({ message: "Login successful", user });
    });
  })(req, res, next);
});

// ✅ Logout route
router.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.status(200).json({ message: "Logged out successfully" });
  });
});

// ✅ Get currently logged-in user
router.get("/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});

export default router;
