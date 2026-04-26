import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import connectToDatabase from "../database/mongodb.js";

await connectToDatabase();

const createAdmin = async () => {
    const email = "admin@example.com";

    const existing = await User.findOne({ email });
    if (existing) {
        console.log("Admin already exists");
        process.exit();
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    await User.create({
        name: "Admin",
        email,
        password: hashedPassword,
        role: "admin"
    });

    console.log("Admin created");
    process.exit();
};

createAdmin();