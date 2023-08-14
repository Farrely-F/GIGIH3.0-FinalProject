import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#29292a] text-[#ddcfc9]">
      <div className="text-center">
        <h1 className="font-bold text-3xl">Oops!</h1>
        <p className="my-5">Sorry, an unexpected error has occured</p>
        <p>{error.statusText || error.message}</p>
      </div>
    </div>
  );
};

export default ErrorPage;
