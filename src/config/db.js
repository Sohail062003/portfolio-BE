require('dotenv').config({ debug: false });
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI);
        console.log("Successfully Connected ");
    } catch (error) {
        console.error("Connection Error -", error)
        process.exit(1)
    }
}

module.exports = connectDB;