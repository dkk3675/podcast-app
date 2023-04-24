const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors({ origin: "https://stackduo-podcasts.netlify.app/" }));

const mongodbUri = `mongodb+srv://${process.env.MONGO_USER_ID}:${process.env.MONGO_PASSWORD}@cluster0.wkfdb3d.mongodb.net/login_register?retryWrites=true&w=majority`;

mongoose.connect(mongodbUri, {
  useNewUrlParser: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to mongodb...");
});

mongoose.connection.on("error", (err) => {
  console.log("Error connecting to mongo", err);
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  likedPodcasts: [{ podcastName: String, isLiked: Boolean }],
});

const User = new mongoose.model("User", userSchema);

//Routes
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      if (password === user.password) {
        res.send({ message: "Login Successful", user: user });
      } else {
        res.send({ message: "Password didn't match" });
      }
    } else {
      res.send({ message: "User not registered" });
    }
  });
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      res.send({ message: "User already registered" });
    } else {
      const user = new User({
        name,
        email,
        password,
      });
      user.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: "Successfully Registered, Please login now." });
        }
      });
    }
  });
});

app.post("/button-click", async (req, res) => {
  const { email, podcast_name, isLiked } = req.body;
  const user = await User.findOne({ email });
  const podcast = user.likedPodcasts.find(
    (podcast) => podcast.podcastName === podcast_name
  );

  if (podcast) {
    podcast.isLiked = isLiked;
  } else {
    user.likedPodcasts.push({ podcastName: podcast_name, isLiked });
  }

  user.save((err) => {
    if (err) {
      console.log(err);
      //   res.send({ message: false });
    } else {
      res.send(isLiked);
    }
  });
});

app.post("/isLiked", async (req, res) => {
  const { email, podcast_name } = req.body;
  const user = await User.findOne({ email });
  const podcast = user.likedPodcasts.find(
    (podcast) => podcast.podcastName === podcast_name
  );
  if (podcast) {
    res.send(podcast.isLiked);
  } else {
    res.send(false);
  }
});

app.listen(9002, () => {
  console.log("BE started at port 9002");
});
