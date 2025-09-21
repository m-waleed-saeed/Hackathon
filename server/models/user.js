const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        firstName: { type: String, required: true, trim: true },
        lastName: { type: String, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        password: { type: String, required: true },
        role: { type: String, enum: ['admin', 'user'], default: 'user', },
        phone: { type: String, trim: true },
        address: { type: String, trim: true },
        resetPasswordToken: { type: String },
        resetPasswordExpire: { type: Date },
        createdAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;