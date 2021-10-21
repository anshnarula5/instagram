const connectDB = require("./config/db.js")

const express = require("express")
const cors = require("cors")

const app = express()

connectDB()

app.use(cors())

app.get("/", (req, res) => res.send("Hello"))

app.listen(5000, () => console.log("Running on 5000"))