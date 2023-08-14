import React from "react";
import { Link } from "react-router-dom";
import useFetch from "../utils/useFetch";
import { API_BASE_URL } from "../config";

const Videos = () => {
  const { data } = useFetch(`${API_BASE_URL}/videos`);

  return (
    <div className="grid grid-cols-5 gap-10 p-10">
      {data.map((video) => {
        const containerStyle = {
          backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2)), url(${video.imageUrl})`,
        };

        return (
          <div key={video.videoID} className="relative">
            <Link to={`/video/${video.videoID}`} className="block">
              <div style={containerStyle} className={`relative rounded-md bg-center min-h-[350px] max-w-[200px] cursor-pointer`}>
                <h2 className="absolute bottom-5 left-5">{video.videoTitle}</h2>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Videos;
