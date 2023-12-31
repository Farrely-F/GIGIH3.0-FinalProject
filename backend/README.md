# Generasi GIGIH3.0 MidTerm Project

Hello coders! 👋 in this project, Generasi GIGIH3.0 assigned every si GIGIH in fullstack engineer path to create a REST API using Node.Js, Express, and MongoDB using Mongoose.

## Table of Contents

- [Database Structure](#database-structure)
- [API Structure](#api-structure)
- [API Requests and Responses](#api-requests-and-responses)
- [How to Run Locally](#how-to-run-locally)

## Database Structure

![Database Structure](https://lh3.googleusercontent.com/u/2/drive-viewer/AITFw-wkzhiy6briDMtxC1ts8i3BMCEnLtEbhTtqv4CefIx4iP2Jo_uWmJlwlvMz0S0BIZxoqLQQt4waMikYl5fIb2WokRVaPg=w1600-h698)

### Videos Collection

Each document in the `videos` collection represents a video with the following fields:

- `videoID` (String, required): : A unique identifier for the video.
- `imageUrl` (String, required): The URL or path to the video's thumbnail image.

### Products Collection

Each document in the `products` collection represents a product associated with a specific video with the following fields:

- `productID` (String, required): A unique identifier for the product.
- `link` (String, required): The URL or path to the product.
- `title` (String, required): The title or name of the product.
- `price` (Number, required): The price of the product.
- `videoID` (String, required): The videoID to which this product is associated.

### Comments Collection

Each document in the `comments` collection represents a comment made on a specific video with the following fields:

- `username` (String, required): The username of the commenter.
- `comment` (String, required): The content of the comment.
- `timestamp` (Date, default: Date.now): The timestamp of when the comment was created.
- `videoID` (String, required): The videoID to which this comment is associated.

## API Structure

![Database Structure](https://lh3.googleusercontent.com/u/2/drive-viewer/AITFw-zQCAhc_D69X-sF0-ssN2rkVOx6tuJF2L4ml-CItLn5Eulz0BRKTswCwhFeBMsKzc5YlDulE3SbjeJVX2JIEjw7jatRQg=w1600-h698)

## API Requests and Responses

below is the list of API requests and responses

### 1. Get Video Thumbnails

- **URL:** `/api/videos`
- **Method:** GET
- **Request Parameters:** None
- **Response:**
  - **Success Response:**

```json
[
  {
    "videoID": "video1",
    "imageUrl": "https://example.com/thumbnail1.jpg"
  },
  {
    "videoID": "video2",
    "imageUrl": "https://example.com/thumbnail2.jpg"
  }
]
```

- **Error/Fail Response:**
  - _Response:_ `500`
    ```json
    { "error": "Failed to fetch video thumbnails" }
    ```

### 2. Get Products for a Video

- **URL:** `/api/products`
- **Method:** GET
- **Request Parameters:**
  - `videoID` (String, required): The ID of the video for which products are requested.
- **Success Response:**
  - Sample of success response (http://localhost:3000/api/products?videoID=video1)

```json
[
  {
    "productID": "product1",
    "link": "https://example.com/product1",
    "title": "Product 1",
    "price": 19.99,
    "videoID": "video1"
  },
  {
    "productID": "product2",
    "link": "https://example.com/product2",
    "title": "Product 2",
    "price": 29.99,
    "videoID": "video1"
  }
]
```

- **Error/Fail Response:**
  - _Response :_ `404`
    - (video not available)
    ```json
    { "error": "Video with ${videoID} not found" }
    ```
    - (No products found on video)
    ```json
    { "error": "No products found for ${videoID}" }
    ```
  - _Response :_ `500`
    ```json
    { "error": "Failed to fetch products" }
    ```

### 3. Get Comments for a Video

- **URL:** `/api/comments`
- **Method:** GET
- **Request Parameters:**
  - `videoID` (String, required): The ID of the video for which comments are requested.
- **Success Response:**
  - Sample of Success Response (http://localhost:3000/api/comments?videoID=video1)

```json
[
  {
    "username": "user1",
    "comment": "Great video!",
    "timestamp": "2023-07-27T12:34:56Z",
    "videoID": "video1"
  }
]
```

- **Error/Fail Response:**
  - _Response :_ `404`
    - (video not available)
    ```json
    { "error": "Video with ${videoID} not found" }
    ```
    - (No products found on video)
    ```json
    { "error": "No Comments found for ${videoID}" }
    ```
  - _Response :_ `500`
    ```json
    { "error": "Failed to fetch Comments" }
    ```

### 4. Submit a Comment

- **URL:** `/api/comments`
- **Method:** POST
- **Request:**
  - these request body is a must!

```json
{
  "username": "user3",
  "comment": "I enjoyed this video!",
  "videoID": "video1"
}
```

- **Response:**
  - Sucessfull Response

```json
{
  "success": "Comment by user3 in video1 submitted successfully"
}
```

- **Error/Fail Response:**
  - _Response :_ `400`
    - (doesn't match require fields)
    ```json
    { "error": "all fields are required" }
    ```
  - _response :_ `404`
    - (Video not found)
    ```json
    { "error": "Video not found" }
    ```
  - _Response :_ `500`
    ```json
    { "error": "Failed to submit comments" }
    ```

## How to Run Locally

1. Clone the repository to your local machine.

```bash
  git clone https://github.com/Farrely-F/GIGIH3.0-midTerm.git
```

2. Make sure youre on the right directory. if not, change directory using

```bash
  cd GIGIH3.0-midTerm
```

3. Install the project dependencies using

```bash
  npm install
```

4. Ensure you have MongoDB installed and running at the specified `MONGODB_URL` in the `.env` file. If you are confused, try checking out the .env example in`.env.example`

5. Seed the database with dummy data by running

```bash
  npm run seed
```

6. Start the server using

```bash
  npm run dev
```

7. The server will be running at `http://localhost:3000`.
