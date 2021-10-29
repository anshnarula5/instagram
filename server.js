const connectDB = require("./config/db.js");

const express = require("express");
const cors = require("cors");

const app = express();

connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(cors());


//routes

app.use("/api/user", require("./routes/user"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/profile", require("./routes/profile"));
app.use("/api/posts", require("./routes/post"));

app.listen(5000, () => console.log("Running on 5000"));
