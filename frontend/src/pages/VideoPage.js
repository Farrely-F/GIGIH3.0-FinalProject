import React from "react";
import { useParams } from "react-router-dom";

const VideoPage = () => {
  const { videoID } = useParams();
  // Fetch video data based on videoID
  // Replace this with your actual data fetching logic
  const videoData = {
    videoTitle: "Sample Video Title",
    description: "Sample video description.",
    videoUrl: "https://example.com/sample.mp4",
  };

  return (
    <div>
      {/* Display video details here */}
      <h2>{videoData.videoTitle}</h2>
      <p>{videoData.description}</p>
      <video controls>
        <source src={videoData.videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPage;
