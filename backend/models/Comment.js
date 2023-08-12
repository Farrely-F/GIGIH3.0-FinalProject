// models/Comment.js
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  username: { type: String, required: true },
  comment: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  videoID: { type: String, required: true },
});

module.exports = mongoose.model("Comment", commentSchema);
