const config = require("config")
const mongoose = require("mongoose");
const mongoURI = config.get("mongoURI")

const connectDB = async() => {
    try {
        await mongoose.connect("mongodb+srv://ansh:ansh123@cluster0.pl7m9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
        console.log("Mongoose running")
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
};

module.exports = connectDB