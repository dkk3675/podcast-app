const mongoose = require("mongoose");

const MediaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    speaker: {
      type: String,
      required: true,
    },
    videos: [{ type: String, required: true }],
    favourites: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Media = mongoose.model("Media", MediaSchema);
