import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const videos = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    videos();
  }, []);
  return { data };
};

export default useFetch;
