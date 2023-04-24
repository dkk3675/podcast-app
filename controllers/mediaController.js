const Media = require("../Models/Media");

exports.getAll = async (req, res) => {
  try {
    const media = await Media.find();

    res.json(media);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
// Backendurl/public/videos/file_name.mp4
exports.create = async (req, res) => {
  const { name, description, category, type, speaker } = req.body;
  let videosPaths = [];

  if (Array.isArray(req.files.videos) && req.files.videos.length > 0) {
    for (let video of req.files.videos) {
      videosPaths.push("/" + video.path);
    }
  }

  try {
    const createdMedia = await Media.create({
      name,
      description,
      category,
      type,
      speaker,
      videos: videosPaths,
      favourites: 0,
    });

    res.json({ message: "Media created successfully", createdMedia });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

exports.like = async (req, res) => {
  console.log(req.body);
  const { email, podcast_name, isLiked } = req.body;

  try {
    const media = await Media.findOneAndUpdate(
      { name: podcast_name },
      { $inc: { favourites: isLiked ? 1 : -1 } }
    );

    res.json({ message: "Media liked successfully", media });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
