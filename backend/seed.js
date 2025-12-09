import mongoose from "mongoose";
import dotenv from "dotenv";
import Blog from "./models/Blog.js";
import User from "./models/User.js";
import { sampleBlogs } from "./sampleData.js";
import bcrypt from "bcryptjs";

const hashed = await bcrypt.hash("admin", 10);

dotenv.config();

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✔ Connected to MongoDB");

    // OPTIONAL: Clear old data
    await User.deleteMany();
    await Blog.deleteMany();
    console.log("🧹 Cleared old users & blogs");

    // Create one user for all blogs
    const user = await User.create({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashed, // You can hash this manually if needed
    });

    console.log("👤 User created:", user.email);
     const blogsWithUser = sampleBlogs.map((blog) => ({
      ...blog,
      createdBy: user._id,
    }));
    

    await Blog.insertMany(blogsWithUser);
    console.log("📝 Inserted sample blogs!");

    process.exit();
  } catch (err) {
    console.error("❌ Error while seeding:", err);
    process.exit(1);
  }
}

seed();
