// run in terminal using node seed.js to input dummy data below
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Video = require("./models/Video");
const Product = require("./models/Product");
const Comment = require("./models/Comment");

dotenv.config();

// Temporary storage arrays
const temporaryVideoData = [
  { videoID: "video1", videoTitle: "Oli Motor", videoUrl: "https://www.youtube.com/embed/6K4tdxznqP0", imageUrl: "https://imgx.gridoto.com/crop/0x0:544x318/700x465/photo/2019/10/09/1472055836.png" },
  { videoID: "video2", videoTitle: "Review HP Baru", videoUrl: "https://www.youtube.com/embed/BZ5gCb02H4A", imageUrl: "https://i.ytimg.com/vi/CYnYz2tpWN4/maxresdefault.jpg" },
  { videoID: "video3", videoTitle: "Video 3", videoUrl: "https://www.youtube.com/watch?v=VOcDtavMlYU", imageUrl: "https://ecs7.tokopedia.net/img/helpcenter/2020/06/step2-2.png" },
  { videoID: "video4", videoTitle: "Video 4", videoUrl: "https://www.youtube.com/watch?v=VOcDtavMlYU", imageUrl: "https://ecs7.tokopedia.net/img/helpcenter/2020/06/step2-2.png" },
  { videoID: "video5", videoTitle: "Video 5", videoUrl: "https://www.youtube.com/watch?v=VOcDtavMlYU", imageUrl: "https://ecs7.tokopedia.net/img/helpcenter/2020/06/step2-2.png" },
  { videoID: "video6", videoTitle: "Video 6", videoUrl: "https://www.youtube.com/watch?v=VOcDtavMlYU", imageUrl: "https://ecs7.tokopedia.net/img/helpcenter/2020/06/step2-2.png" },
  { videoID: "video7", videoTitle: "Video 7", videoUrl: "https://www.youtube.com/watch?v=VOcDtavMlYU", imageUrl: "https://ecs7.tokopedia.net/img/helpcenter/2020/06/step2-2.png" },
  { videoID: "video8", videoTitle: "Video 8", videoUrl: "https://www.youtube.com/watch?v=VOcDtavMlYU", imageUrl: "https://ecs7.tokopedia.net/img/helpcenter/2020/06/step2-2.png" },
  { videoID: "video9", videoTitle: "Video 9", videoUrl: "https://www.youtube.com/watch?v=VOcDtavMlYU", imageUrl: "https://ecs7.tokopedia.net/img/helpcenter/2020/06/step2-2.png" },
  { videoID: "video10", videoTitle: "Video 10", videoUrl: "https://www.youtube.com/watch?v=VOcDtavMlYU", imageUrl: "https://ecs7.tokopedia.net/img/helpcenter/2020/06/step2-2.png" },
  // Add more video data here...
];

const temporaryProductData = [
  { productID: "product1", imageUrl: "https://images.tokopedia.net/img/cache/250-square/VqbcmM/2023/3/2/2f07b128-3d6e-4472-8d14-129655440c31.jpg", link: "https://example.com/product1", title: "Product 1", price: 19.99, videoID: "video1" },
  { productID: "product2", imageUrl: "https://rembangnews.com/wp-content/uploads/2023/06/DM_EDCF38BC0FF9D117B6110AE83542DAF3_170323110346_mm.jpg", link: "https://example.com/product2", title: "Product 2", price: 29.99, videoID: "video1" },
  { productID: "product3", imageUrl: "https://cdn.medcom.id/dynamic/content/2021/06/16/1288728/GARUZ6k4SI.jpeg?w=480", link: "https://example.com/product2", title: "Product 2", price: 100.99, videoID: "video2" },
  // Add more product data here...
];

const temporaryCommentData = [
  { username: "user1", comment: "Great video!", videoID: "video1" },
  { username: "user2", comment: "Awesome content!", videoID: "video2" },
  // Add more comment data here...
];

// Function to insert temporary data into MongoDB collections
const insertTemporaryData = async () => {
  try {
    // Insert temporary data into the respective collections
    await Video.insertMany(temporaryVideoData);
    await Product.insertMany(temporaryProductData);
    await Comment.insertMany(temporaryCommentData);

    console.log("Temporary data inserted successfully.");
  } catch (err) {
    console.error("Error inserting temporary data:", err);
  }
};

// Function to clear temporary data from MongoDB collections
const clearTemporaryData = async () => {
  try {
    await Video.deleteMany();
    await Product.deleteMany();
    await Comment.deleteMany();

    console.log("Temporary data cleared successfully.");

    // Exit the Node.js process forcefully
    process.exit(0);
  } catch (err) {
    console.error("Error clearing temporary data:", err);
    // Exit the Node.js process with an error code
    process.exit(1);
  }
};

// Database connection
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", async () => {
  console.log("Connected to MongoDB");

  // Insert temporary data
  await insertTemporaryData();

  // Uncomment the line below if you want to clear the temporary data after a delay (e.g., 10 seconds)
  //   setTimeout(clearTemporaryData, 10000);

  // Uncomment the line below if you want to clear the temporary data when the server is closed
  process.on("SIGINT", clearTemporaryData);
});
