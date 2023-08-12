// index.js
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const routes = require("./routes/routes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// database url/mongoDB url
const databaseUrl = process.env.MONGODB_URL;

// Middleware
app.use(bodyParser.json());

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

// Start the server with npm start and then use mock data/dummy data using node seed.js
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
