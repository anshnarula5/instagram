const connectDB = require("./config/db.js");

const express = require("express");
const cors = require("cors");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

//routes

app.use("/api/user", require("./routes/user"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/profile", require("./routes/profile"));

app.listen(5000, () => console.log("Running on 5000"));
