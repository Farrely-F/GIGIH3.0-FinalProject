import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../utils/useFetch";
import useVideoData from "../utils/useVideoData";
import axios from "axios";
import { API_BASE_URL } from "../config";

const formatTimestamp = (timestamp) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(timestamp).toLocaleDateString(undefined, options);
};

const SingleVideo = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useFetch(`${API_BASE_URL}/videos/${videoId}`);
  const { comments, products, fetchCommentsAndProducts } = useVideoData(videoId);

  const [newComment, setNewComment] = useState({
    username: "",
    comment: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewComment((prevComment) => ({
      ...prevComment,
      [name]: value,
    }));
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();

    if (!newComment.username || !newComment.comment) {
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/comments`,
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
        setNewComment({
          username: "",
          comment: "",
        });
        fetchCommentsAndProducts();
      } else {
        console.error("Failed to submit comment");
      }
    } catch (error) {
      console.error("Network error while submitting comment", error);
    }
  };

  useEffect(() => {
    if (error) {
      navigate("/404");
    }
  }, [error, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Video not found</div>;
  }

  const { videoUrl } = data;
  // console.log(data);

  const deleteComment = async (commentId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/comments/${commentId}`);

      if (response.status === 200) {
        // Comment deleted successfully, update the comment list
        fetchCommentsAndProducts();
      } else {
        console.error("Failed to delete comment:", response.data.error);
      }
    } catch (error) {
      console.error("Network error while deleting comment", error);
    }
  };

  return (
    <div className="w-full min-h-screen lg:flex px-6 md:px-16 py-24">
      {/* Videos */}
      <div className="min-w-[80%] h-fit">
        <iframe
          className="rounded-md relative w-full aspect-video mb-5 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          src={videoUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
        {/* Products */}

        {/* Render Product List Here */}
        {products.length > 0 ? (
          <div className="bg-slate-400/10 p-4 rounded-lg mb-4">
            <h3 className="font-bold text-2xl mb-4">Products:</h3>
            <ul className="overflow-x-auto flex gap-x-5">
              {products.map((product) => (
                <li className="rounded-md hover:bg-white/10 p-2" key={product.productID}>
                  <a href={product.link} target="_blank" rel="noopener noreferrer">
                    <img src={product.imageUrl} alt={product.title} className="aspect-square w-[80px] mb-2 rounded-xl" />
                    <p className="text-xs">{product.title}</p>
                    <p className="text-xs">${product.price}</p>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="bg-slate-400/10 p-4 rounded-lg mb-8">
            <h3 className="font-bold text-2xl mb-4">Products:</h3>
            <ul className="overflow-x-auto flex gap-x-5">
              <li className="rounded-md">
                <p>No Products Available</p>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Comments */}
      <div className="min-w-[20%] lg:pl-4">
        <h3 className="font-bold text-2xl pb-4 border-b-2 border-white/10">Comments:</h3>

        {/* Render Comment List Here */}
        {comments.length > 0 ? (
          <div className="h-[200px] md:min-h-[320px] overflow-y-auto mb-8">
            <ul className="overflow-y-auto min-h-[200px]">
              {comments.map((comment) => (
                <li className="group py-2 hover:bg-slate-600/10 pl-2 transition-all ease-in-out duration-300" key={comment.timestamp}>
                  <p>
                    <strong>{comment.username}:</strong> {comment.comment}
                  </p>
                  <div className="flex gap-x-2">
                    <p className="text-xs text-gray-400">{formatTimestamp(comment.timestamp)}</p>
                    <button
                      onClick={() => deleteComment(comment._id)} // Pass the correct _id
                      className="text-xs text-red-500 hover:text-red-700 cursor-pointer hidden group-hover:block"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div>No comments available.</div>
        )}

        {/* Input */}
        <form className="bottom-0 text-black w-full" onSubmit={handleCommentSubmit}>
          <label className="text-white block text-sm mb-1">Username:</label>
          <input
            type="text"
            className="block w-full sm:max-w-sm h-[32px] p-2 rounded-md text-sm text-white bg-slate-500/30 backdrop-blur-sm outline outline-1 outline-white/20 focus:shadow-[0_0_16px_rgba(255,255,255,0.15)]"
            name="username"
            value={newComment.username}
            onChange={handleInputChange}
            autoComplete="off"
            required
          />
          <label className="text-white text-sm mb-1">Comment:</label>
          <textarea
            className="resize-none p-2 block w-full sm:max-w-sm rounded-md mb-4 text-sm text-white bg-slate-500/30 backdrop-blur-sm outline outline-1 outline-white/20 focus:shadow-[0_0_16px_rgba(255,255,255,0.15)]"
            name="comment"
            value={newComment.comment}
            onChange={handleInputChange}
            required
          />
          <button type="submit" className="bg-green-600 px-4 py-1 rounded-md text-white">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default SingleVideo;
