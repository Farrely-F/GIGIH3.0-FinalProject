import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../utils/useFetch";
import axios from "axios";

const formatTimestamp = (timestamp) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(timestamp).toLocaleDateString(undefined, options);
};

const SingleVideo = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useFetch(`http://localhost:8080/api/videos/${videoId}`);

  // State for the new comment
  const [newComment, setNewComment] = useState({
    username: "",
    comment: "",
  });

  // State for comments and products
  const [comments, setComments] = useState([]);
  const [products, setProducts] = useState([]);

  // Function to fetch comments and products
  const fetchCommentsAndProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/videos/${videoId}`);
      if (response.status === 200) {
        setComments(response.data.comments);
        setProducts(response.data.products);
      }
    } catch (error) {
      console.error("Failed to fetch comments and products", error);
    }
  };

  // Fetch comments and products on initial render
  useEffect(() => {
    fetchCommentsAndProducts();
  }, []);

  // Fetch comments and products at regular intervals
  useEffect(() => {
    const interval = setInterval(() => {
      fetchCommentsAndProducts();
    }, 5000); // Fetch every 5 seconds

    return () => {
      clearInterval(interval);
    };
  }, []);

  // Function to handle input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewComment((prevComment) => ({
      ...prevComment,
      [name]: value,
    }));
  };

  // Function to submit a comment
  const handleCommentSubmit = async (event) => {
    event.preventDefault();

    // Check if the username or comment is empty
    if (!newComment.username || !newComment.comment) {
      return;
    }

    try {
      // Send the comment to the backend API
      const response = await axios.post(
        "http://localhost:8080/api/comments",
        {
          username: newComment.username,
          comment: newComment.comment,
          videoID: videoId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // Comment submitted successfully, handle response if needed
        console.log("Comment submitted successfully");

        // Clear the input fields after successful submission
        setNewComment({
          username: "",
          comment: "",
        });

        // Fetch comments again to update the list with the new comment
        fetchCommentsAndProducts();
      } else {
        // Handle error responses from the server
        console.error("Failed to submit comment");
      }
    } catch (error) {
      // Handle network errors
      console.error("Network error while submitting comment", error);
    }
  };

  useEffect(() => {
    if (error) {
      navigate("/404"); // Navigate to the 404 page in case of an error
    }
  }, [error, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Video not found</div>;
  }

  const { videoUrl } = data;

  return (
    <div className="w-full min-h-screen flex">
      <div className="min-w-[15%] flex flex-col items-center">
        {/* Render Product List Here */}
        {products && products.length > 0 ? (
          <div>
            <h3 className="font-bold text-2xl mb-4">Products</h3>
            <ul className="min-h-[500px] overflow-y-scroll">
              {products.map((product) => (
                <li className="mb-4 p-4 rounded-md hover:bg-white/10" key={product.productID}>
                  <a href={product.link} target="_blank" rel="noopener noreferrer">
                    <img src={product.imageUrl} alt={product.title} width="100" />
                    <p>{product.title}</p>
                    <p>${product.price}</p>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div>No products available.</div>
        )}
      </div>
      <div className="min-w-[65%] px-5">
        <iframe
          className="rounded-md"
          width="100%"
          height="100%"
          src={videoUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
      <div className="relative px-2 min-w-[20%]">
        <div>
          {/* Render Comment List Here */}
          {comments && comments.length > 0 ? (
            <div>
              <h3 className="font-bold text-2xl mb-4">Comments</h3>
              <ul>
                {comments.map((comment) => (
                  <li className="" key={comment.timestamp}>
                    <p className="text-xs">{formatTimestamp(comment.timestamp)}</p>
                    <p>
                      <strong>{comment.username}:</strong> {comment.comment}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div>No comments available.</div>
          )}
          <form className="absolute bottom-0 text-black" onSubmit={handleCommentSubmit}>
            <label className="text-white block">Username</label>
            <input type="text" className="block w-[200px]" name="username" value={newComment.username} onChange={handleInputChange} />
            <label className="text-white">Comment:</label>
            <textarea className="block mb-2 w-[200px]" name="comment" value={newComment.comment} onChange={handleInputChange} />
            <button type="submit" className="bg-green-600 px-4 py-1 rounded-md text-white">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SingleVideo;
