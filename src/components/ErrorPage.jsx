import { Player } from "@lottiefiles/react-lottie-player";
import AnimationLottie from "../assets/404.json";
import { Helmet } from "react-helmet-async";
import { Link, useRouteError } from "react-router-dom";
const ErrorPage = () => {
  const { error } = useRouteError();
  return (
    <div>
      <Helmet>
        <title>HealthyFit | ErrorPage</title>
      </Helmet>

      <div className="mx-auto w-[50%]">
        <Player autoplay loop src={AnimationLottie}></Player>
      </div>
      <h3 className="text-center text-red-600">{error.message}</h3>
      <div className="text-center mt-3">
        <Link to="/">
          <button className="text-xl font-semibold  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-md p-3 text-white">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
