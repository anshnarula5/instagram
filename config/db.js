const config = require("config")
const mongoose = require("mongoose");
const mongoURI = config.get("mongoURI")

const connectDB = async() => {
    try {
        await mongoose.connect(mongoURI)
        console.log("Mongoose running")
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
};

module.exports = connectDB