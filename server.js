const connectDB = require("./config/db.js");

const express = require("express");
const cors = require("cors");
const path = require("path");

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

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT;

app.listen(PORT, () => console.log("Running on 5000"));
