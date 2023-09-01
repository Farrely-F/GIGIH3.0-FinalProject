import React, { Suspense, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../utils/useFetch";
import { API_BASE_URL } from "../config";
import Skeleton from "../components/Skeleton";

const techStacks = [
  {
    tech_name: "MongoDB",
    tech_logo: "https://newrelic.com/sites/default/files/styles/800w/public/2021-10/mongo_logo.jpg?itok=Z1PabBZB",
  },
  {
    tech_name: "ExpressJs",
    tech_logo: "https://cdn.icon-icons.com/icons2/2699/PNG/512/expressjs_logo_icon_169185.png",
  },
  {
    tech_name: "ReactJs",
    tech_logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png",
  },
  {
    tech_name: "NodeJs",
    tech_logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/2560px-Node.js_logo.svg.png",
  },
];

const Videos = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { data } = useFetch(`${API_BASE_URL}/videos`);

  useEffect(() => {
    if (data.length > 0) {
      setIsLoading(false);
    }
  }, [data]);

  return (
    <div className="min-h-screen flex flex-col px-8 py-24 md:p-16 items-center">
      <h1 className="text-2xl font-bold mb-16 text-center hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] rounded-lg hover:scale-105 transition ease-out duration-700 origin-center">TokopediaPlay Clone</h1>
      <div className="grid mx-auto gap-6 md:grid-cols-3 lg:grid-cols-5 mb-24">
        {isLoading ? (
          Array.from({ length: 10 }).map((_, index) => <Skeleton key={index} />)
        ) : data.length > 0 ? (
          data.map((video) => (
            <Link key={video.videoID} to={`/video/${video.videoID}`}>
              <div className="group h-[560px] md:h-[320px] w-[240px] md:w-[172px] relative shadow hover:shadow-[0_0_16px_rgba(255,255,255,0.15)] rounded-lg hover:scale-105 transition ease-out duration-700 origin-center">
                <div className="w-full h-full relative rounded-lg">
                  <img src={video.imageUrl} className="w-full h-full object-cover rounded-lg" alt="vide_thumbnail" />
                  <div className="bg-[linear-gradient(to_bottom,rgba(0,0,0,0.2),rgba(0,0,0,1))] group-hover:bg-[linear-gradient(to_bottom,rgba(0,0,0,0.6),rgba(0,0,0,1))] inset-0  absolute rounded-lg" />
                </div>
                <h2 className="absolute bottom-5 left-5">{video.videoTitle}</h2>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center">No Videos Found!</p>
        )}
      </div>
      <div className="min-h-screen w-full flex flex-col justify-center">
        <h2 className="text-2xl mb-8 text-center font-bold">Crafted With:</h2>
        <div className=" grid grid-cols-2 lg:grid-cols-4 mx-auto w-fit place-content-center place-items-center gap-10 md:gap-20">
          {techStacks.map((tech, techIndex) => (
            <div key={techIndex + 1} className="flex flex-col items-center gap-y-4">
              <img src={tech.tech_logo} className="w-36 aspect-square object-scale-down rounded-lg bg-white" alt="tech_stack_logo" />
              <p>{tech.tech_name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const VideosWithSuspense = () => {
  return (
    <Suspense fallback={<Skeleton />}>
      <Videos />
    </Suspense>
  );
};

export default VideosWithSuspense;
