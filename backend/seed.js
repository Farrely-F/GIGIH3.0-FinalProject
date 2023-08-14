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
  { videoID: "video2", videoTitle: "Review HP Baru", videoUrl: "https://www.youtube.com/embed/BZ5gCb02H4A", imageUrl: "https://assets.ayobandung.com/crop/0x0:0x0/750x500/webp/photo/2023/02/01/1380714195.jpg" },
  { videoID: "video3", videoTitle: "Alat Musik", videoUrl: "https://www.youtube.com/embed/ayGDExI0zpE", imageUrl: "https://s2.bukalapak.com/bukalapak-kontenz-production/content_attachments/60587/original/alat_musik_modern_main.jpg" },
  { videoID: "video4", videoTitle: "Mainan Anak", videoUrl: "https://www.youtube.com/embed/zNN9pAh5j4E", imageUrl: "https://www.goodnewsfromindonesia.id/uploads/post/large-toko-mainan-b0e40bd769fc66faf8a4be353745ad3d.jpg" },
  { videoID: "video5", videoTitle: "Laptop", videoUrl: "https://www.youtube.com/embed/BxdZm7PUIaw", imageUrl: "https://alamatbagus.com/wp-content/uploads/2022/02/toko-laptop-di-surabaya-aurora.jpg" },
  {
    videoID: "video6",
    videoTitle: "Alat Solat",
    videoUrl: "https://www.youtube.com/embed/vK-1m3He7mo",
    imageUrl: "https://erahajj-storage.akselera.co.id/1634910175-953632/1634212757_snihZHSicyI9JTPSSnd6w3spS9La7IST12IzN9GY.jpg",
  },
  {
    videoID: "video7",
    videoTitle: "Baju Muslimah",
    videoUrl: "https://www.youtube.com/embed/klyho-Tjyes",
    imageUrl: "https://media.karousell.com/media/photos/products/2023/1/24/setelan_baju_muslimahfashion_w_1674580610_385db19f_progressive.jpg",
  },
  { videoID: "video8", videoTitle: "Makanan", videoUrl: "https://www.youtube.com/embed/2wEgBY-zzok", imageUrl: "https://tribratanews.polri.go.id/web/image/blog.post/50469/image" },
  {
    videoID: "video9",
    videoTitle: "Alat Masak",
    videoUrl: "https://www.youtube.com/embed/0kdTiF7DxjU",
    imageUrl: "https://asset.kompas.com/crops/g5DAVSMKigJENSFksQ-L1l7kKjA=/8x0:1000x661/780x390/data/photo/2020/11/26/5fbf8465d0c83.jpg",
  },
  { videoID: "video10", videoTitle: "Handuk", videoUrl: "https://www.youtube.com/embed/MfmAVEkjKJ4", imageUrl: "https://ternate.karantina.pertanian.go.id/wp-content/uploads/2022/12/Berikut-5-Cara-Memilih-Handuk-Mandi-Yang-Tepat.jpg" },
  // Add more video data here...
];

const temporaryProductData = [
  { productID: "product1", imageUrl: "https://images.tokopedia.net/img/cache/250-square/VqbcmM/2023/3/2/2f07b128-3d6e-4472-8d14-129655440c31.jpg", link: "https://example.com/product1", title: "Motul", price: 19.99, videoID: "video1" },
  {
    productID: "product2",
    imageUrl: "https://images.tokopedia.net/img/cache/700/product-1/2019/6/28/5295439/5295439_eea9d8b5-186d-41f0-9bc2-d83b44e1e0eb_480_480.jpg",
    link: "https://example.com/product2",
    title: "Headlamp",
    price: 29.99,
    videoID: "video1",
  },
  { productID: "product3", imageUrl: "https://cdn.medcom.id/dynamic/content/2021/06/16/1288728/GARUZ6k4SI.jpeg?w=480", link: "#", title: "Smartphone", price: 100.99, videoID: "video2" },
  { productID: "product4", imageUrl: "https://images.tokopedia.net/img/cache/700/VqbcmM/2021/4/1/34ce6ab3-d4e2-4290-9746-5c9b8ad5d30f.jpg", link: "#", title: "Gitar Listrik", price: 150, videoID: "video3" },
  { productID: "product5", imageUrl: "https://lumiere-a.akamaihd.net/v1/images/open-uri20150422-20810-a07syh_9331bd0a.jpeg?region=0%2C0%2C450%2C450", link: "#", title: "Mainan Anak", price: 200, videoID: "video4" },
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
