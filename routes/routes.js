// routes/routes.js
const express = require("express");
const router = express.Router();
const Video = require("../models/Video");
const Product = require("../models/Product");
const Comment = require("../models/Comment");

router.get("/", async (req, res) => {
  try {
    const videos = await Video.find({}, { _id: 0, __v: 0 });
    res.send(videos);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch video thumbnails" });
  }
});

// 1. Video Thumbnail List - GET
router.get("/videos", async (req, res) => {
  try {
    const videos = await Video.find({}, { _id: 0, __v: 0 });
    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch video thumbnails" });
  }
});

// 2. Product List - GET
router.get("/products", async (req, res) => {
  const videoID = req.query.videoID;
  if (!videoID) {
    return res.status(400).json({ error: "VideoID is required" });
  }

  try {
    // Check if the videoID exists in the Video collection
    const video = await Video.findOne({ videoID });
    if (!video) {
      return res.status(404).json({ error: `Video with ${videoID} not found` });
    }

    // Video exists, fetch the products
    const products = await Product.find({ videoID }, { _id: 0, __v: 0 });

    // Check if any products exist for the given videoID
    if (products.length === 0) {
      return res.status(404).json({ error: `No products found for ${videoID}` });
    }

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// 3. Comment List - GET
router.get("/comments", async (req, res) => {
  const videoID = req.query.videoID;
  if (!videoID) {
    return res.status(400).json({ error: "VideoID is required" });
  }

  try {
    // Check if the videoID exists in the Video collection
    const video = await Video.findOne({ videoID });
    if (!video) {
      return res.status(404).json({ error: `Comments in ${videoID} not found` });
    }

    // Video exists, fetch the comments
    const comments = await Comment.find({ videoID }, { _id: 0, __v: 0 });

    // Check if any products exist for the given videoID
    if (comments.length === 0) {
      return res.status(404).json({ error: `No comments found in ${videoID}` });
    }

    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});

// 4. Submit Comment - POST
router.post("/comments", async (req, res) => {
  const { username, comment, videoID } = req.body;
  if (!username || !comment || !videoID) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    // Check if the videoID exists in the Video collection
    const video = await Video.findOne({ videoID });
    if (!video) {
      return res.status(404).json({ error: "Video not found" });
    }

    // Create the comment since the videoID exists
    await Comment.create({ username, comment, videoID });
    res.json({ success: `Comment by ${username} in ${videoID} submitted successfully` });
  } catch (err) {
    res.status(500).json({ error: "Failed to submit comment" });
  }
});

module.exports = router;
