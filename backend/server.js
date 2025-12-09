import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import blogRoutes from "./routes/blogRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";
import passport from "passport";
import "dotenv/config";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend URL
    credentials: true, // allow cookies to be sent
  })
);

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/blogWebsite", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sessions
app.use(
  session({
    secret: "yourSecretKey",
    resave: false,
    saveUninitialized: false,
     cookie: {
      httpOnly: true,
      secure: false,
      sameSite: "lax", // or 'none' if using https
    },
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
import configurePassport from "./config/passport.js";
configurePassport(passport);


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/api/blogs", blogRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
(async () => {
    // Dynamically import the router module
    const authRouter = await import("./routes/auth.js");

    // The imported module object will have a 'default' property 
    // that holds the actual exported router instance.
    app.use("/api/auth", authRouter.default); 
})();


connectDB().then(() => {
  app.listen(5000, () => console.log("🚀 Server running on port 5000"));
});
