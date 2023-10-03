const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors({ origin: process.env.FRONTEND_URL }));

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
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  await User.findOne({ email: email }).then((user) => {
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

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  await User.findOne({ email: email }).then((err, user) => {
    if (user) {
      res.send({ message: "User already registered" });
    } else {
      const user = new User({
        name,
        email,
        password,
      });
      user
        .save()
        .then((data) => {
          res.send({ message: "Successfully Registered, Please login now." });
        })
        .catch((err) => {
          console.log(err);
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

  user.save().then((data) => {
    if (data) {
      res.send(isLiked);
      //   res.send({ message: false });
    } else {
      console.log(err);
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

app.listen(process.env.PORT, () => {
  console.log("BE started at port 9002");
});
