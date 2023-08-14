const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path"); // Import path module
const routes = require("./routes/routes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// database url/mongoDB url
const databaseUrl = process.env.MONGODB_URL;

// Middleware
app.use(cors(), bodyParser.json());

// Database connection
mongoose.connect(databaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Use the routes with the "/api" prefix
app.use("/api", routes);

// Serve the frontend build (index.html and static files) from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// All other routes should point to the index.html file to support client-side routing
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start the server with npm start and then use mock data/dummy data using node seed.js
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
