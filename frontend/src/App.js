import useFetch from "./utils/useFetch";

function App() {
  // const { data } = useFetch("http://localhost:8080/api/videos");

  return (
    <div>
      <h1>Hello World</h1>
      <p>My First React App</p>
      {/* {data.map((video) => {
        return (
          <div key={video.videoID}>
            <h2>{video.videoTitle}</h2>
            <img src={video.imageUrl} alt="" />
          </div>
        );
      })} */}
    </div>
  );
}

export default App;
