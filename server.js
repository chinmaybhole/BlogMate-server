const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const textbotRouter = require("./routes/text.routes.js");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://chinmaymotog5:chinmaybhole@mychat.qghujiu.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.use("/", textbotRouter);
app.get("/", (req, res) => res.send("Server is running..."));
app.listen(port, () => {
  console.log(`Server is running on port: http://localhost:${port}`);
});
