const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Render Signup Page
module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup");
};

// Register User
module.exports.register = async (req, res) => {
    try {
        const { username, password, role } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({
                message: "Username already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = new User({
            username,
            password: hashedPassword,
            role
        });

        await newUser.save();

        res.status(201).json({
            message: `User registered successfully with username ${username}`
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: "Server error"
        });
    }
};

// Login User

module.exports.renderLoginForm=(req,res)=>{
    res.render("users/login.ejs");
}


module.exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({
                message: `User with username ${username} not found`
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                message: "Incorrect password"
            });
        }

        // Generate JWT
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        // Store JWT in cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 1000
        });

        res.status(200).json({
            message: "Login successful",
            token
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: "Server error"
        });
    }
};

// Logout User
module.exports.logout = (req, res) => {
    res.clearCookie("token");

    res.status(200).json({
        message: "Logged out successfully"
    });
};