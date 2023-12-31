import React from "react";

const Skeleton = () => {
  return (
    <div className="group h-[560px] md:h-[320px] w-[300px] md:w-[172px] relative shadow rounded-lg animate-pulse">
      <div className="w-full h-full relative rounded-lg bg-gray-600/50" />
    </div>
  );
};

export default Skeleton;
