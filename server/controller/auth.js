const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendResetPasswordMail = require("../utils/sendResetPasswordMail");
const dotenv = require("dotenv");
dotenv.config();

const { JWT_SECRET } = process.env

const register = async (req, res) => {
    const { firstName, lastName, email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: 'User already exists', success: false })
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await User.create({ firstName, lastName, email, password: hashedPassword })

        return res.status(201).json({ message: 'User created successfully', user: newUser, success: true })
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong', success: false, error: error.message })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: 'User not found', success: false })
        }
        const hashedPassword = await bcrypt.compare(password, user.password)

        if (!hashedPassword) {
            return res.status(400).json({ message: 'Invalid Email or password', success: false })
        }

        const token = jwt.sign({ email: user.email, _id: user._id }, JWT_SECRET, { expiresIn: '1d' })

        const { password: _, ...userWithoutPassword } = user._doc;

        return res.status(200).json({ message: 'Login successful', user: userWithoutPassword, token, success: true })

    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong', success: false, error: error.message })
    }
}

const forgotPassword = async (req, res) => {
    const { email } = req.body
    try {
        if (!email) return res.status(400).json({ message: 'Please provide your email', success: false })

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found", success: false });

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '10m' })

        const resetUrl = `${process.env.CLIENT_URL}auth/reset-password/${token}`

        const message = `
        <h2>Passowrd Reset Requset</h2>
        <p>Click the link below to reset your password:</p>
        <a href="${resetUrl}" target="_blank">Click her to reset you passworrd</a>`;

        await sendResetPasswordMail({
            to: user.email,
            subject: 'Password Reset Requset',
            html: message,
        })
        return res.status(200).json({ message: 'Reset password link sent to you email', success: true })
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong', success: false, error: error.message })
    }
}

const resetPassword = async (req, res) => {
    const { token } = req.params
    const { password } = req.body
    try {
        let decoded;
        try {
            decoded = jwt.verify(token, JWT_SECRET)
        } catch {
            return res.status(400).json({ message: "Invalid or expired token", success: false });
        }
        const user = await User.findById(decoded.id)

        if (!user) return res.status(404).json({ message: "User not found", success: false });
        
        user.password = hashedPassword;
        const hashedPassword = await bcrypt.hash(password, 10);
        await user.save();

        return res.status(200).json({ message: 'Password reset successfully', success: true })

    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong', success: false, error: error.message })
    }
}

const updateUserProfile = async (req, res) => {
    try {
        const userId = req.params.id;
        const { firstName, lastName, email, phone, address } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { firstName, lastName, email, phone, address },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        return res.status(200).json({ message: 'User profile updated successfully', user: updatedUser, success: true })
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong', success: false, error: error.message })
    }
};


module.exports = { register, login, forgotPassword, resetPassword, updateUserProfile }

