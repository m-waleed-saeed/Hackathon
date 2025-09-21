const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const colors = require('colors');


const { MONGODB_USERNAME, MONGODB_PASSWORD } = process.env;
const connectDB = async () => {
    try {
        const connect = await mongoose.connect(`mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.yorovsc.mongodb.net/`);
        console.log('MongoDB Connected Successfully'.bgCyan.bold);
    } catch (error) {
        console.log('Error connecting to MongoDB'.bgRed.bold);
        process.exit(1);
    }
}

module.exports = connectDB;