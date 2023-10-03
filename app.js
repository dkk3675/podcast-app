const express = require("express");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL }));

const mediaRoutes = require("./routes/media");

app.use("/api/v1/media", mediaRoutes);
app.use("/public", express.static(path.join(__dirname, "public")));

const mongodbUri = `mongodb+srv://${process.env.MONGO_USER_ID}:${process.env.MONGO_PASSWORD}@cluster0.wkfdb3d.mongodb.net/media?retryWrites=true&w=majority`;

mongoose.connect(mongodbUri, {
  useNewUrlParser: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to mongodb...");
});

mongoose.connection.on("error", (err) => {
  console.log("Error connecting to mongo", err);
});

app.listen(process.env.PORT, () => {
  console.log(`App is running on PORT ${process.env.PORT}`);
});
