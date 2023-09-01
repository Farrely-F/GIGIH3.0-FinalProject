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

// 2. Single Video - GET
router.get("/videos/:videoID", async (req, res) => {
  const videoID = req.params.videoID;

  try {
    // Fetch the video details
    const video = await Video.findOne({ videoID }, { _id: 0, __v: 0 });
    if (!video) {
      return res.status(404).json({ error: `Video with ID ${videoID} not found` });
    }

    // Fetch the product list for the video
    const products = await Product.find({ videoID }, { _id: 0, __v: 0 });

    // Fetch the comment list for the video, including the _id field
    const comments = await Comment.find({ videoID }, { _id: 1, username: 1, comment: 1, timestamp: 1 });

    // Combine the video details, product list, and comment list
    const videoWithDetails = {
      ...video.toObject(),
      products,
      comments,
    };

    res.json(videoWithDetails);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch video details" });
  }
});

// 3. Product List - GET
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

// 4. Comment List - GET
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

    // Video exists, fetch the comments including the _id field
    const comments = await Comment.find({ videoID }).select("_id username comment timestamp");

    // Check if any products exist for the given videoID
    if (comments.length === 0) {
      return res.status(404).json({ error: `No comments found in ${videoID}` });
    }

    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});

// 5. Submit Comment - POST
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

// 6. Delete Comment - DELETE
router.delete("/comments/:commentId", async (req, res) => {
  const commentId = req.params.commentId;

  try {
    // Find the comment by ID and delete it
    const deletedComment = await Comment.findByIdAndDelete(commentId);

    if (!deletedComment) {
      return res.status(404).json({ error: `Comment with ID ${commentId} not found` });
    }

    res.json({ message: "Comment deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete comment" });
  }
});

module.exports = router;
