// models/Video.js
const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  videoID: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

module.exports = mongoose.model("Video", videoSchema);
