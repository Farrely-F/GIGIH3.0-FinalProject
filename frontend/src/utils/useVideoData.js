// useVideoData.js
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";

const useVideoData = (videoId) => {
  const [comments, setComments] = useState([]);
  const [products, setProducts] = useState([]);

  const fetchCommentsAndProducts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/videos/${videoId}`);
      if (response.status === 200) {
        setComments(response.data.comments);
        setProducts(response.data.products);
      }
    } catch (error) {
      console.error("Failed to fetch comments and products", error);
    }
  };

  useEffect(() => {
    fetchCommentsAndProducts();
  }, [videoId]);

  return { comments, products, fetchCommentsAndProducts };
};

export default useVideoData;
