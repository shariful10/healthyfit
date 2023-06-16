import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { BsFillEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Player } from "@lottiefiles/react-lottie-player";
import AnimationLottie from "../../assets/login.json";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { saveUser } from "../../api/auth";
import "./Login.css";
const Login = () => {
  const { singIn, signInWithGoogle, setLoading } = useAuth();
  const [passwordShown, setPasswordShown] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate("");
  let location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const onSubmit = (data) => {
    singIn(data?.email, data?.password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        reset();
        Swal.fire({
          title: "User Login SuccessFull.",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });

        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
        if (error.code === "auth/wrong-password") {
          setError(toast.error("Your Password doesn't match", {}));
        }
      });
  };
  const handleGoogleLogIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
        setSuccess(toast.success("Google SinIn Success", {}));
        // todo save add to db user
        saveUser(result.user);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  };
  return (
    <div>
      <Helmet>
        <title>HealthyFit | Login</title>
      </Helmet>
      <div className="grid md:grid-cols-2 items-center lg:grid-cols-2">
        <div className="mx-auto w-[80%]">
          <Player autoplay loop src={AnimationLottie}></Player>
        </div>
        <div className="flex justify-center w-full items-center min-h-screen">
          <div className="flex flex-col max-w-md p-6 rounded-lg sm:p-10 bg-white shadow-lg">
            <div className="mb-8 text-center">
              <h1 className="my-3 text-4xl font-bold">LogIn</h1>
              <p className="text-sm text-gray-400">Welcome to Healthy Fit</p>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6 ng-untouched ng-pristine ng-valid"
            >
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm">
                    Email address
                  </label>
                  <input
                    style={{ borderRadius: "0px 200px 0px 200px" }}
                    type="email"
                    name="email"
                    id="email"
                    {...register("email", { required: true })}
                    placeholder="Enter Your Email Here"
                    className="w-full px-3 text-center py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                    data-temp-mail-org="0"
                  />
                  {errors.email && (
                    <span className="text-red-600">Email is required</span>
                  )}
                </div>
                <div>
                  <div className="flex justify-between password-filed ">
                    <label
                      htmlFor="password"
                      className="text-sm mb-2 password-filed"
                    >
                      Password
                    </label>
                    {passwordShown ? (
                      <BsEyeSlashFill
                        onClick={togglePassword}
                        className="eye text-blue-500"
                      />
                    ) : (
                      <BsFillEyeFill
                        onClick={togglePassword}
                        className="eye text-blue-500"
                      />
                    )}
                  </div>
                  <input
                    style={{ borderRadius: "0px 200px 0px 200px" }}
                    type={passwordShown ? "text" : "password"}
                    name="password"
                    id="password"
                    {...register("password", {
                      required: true,
                    })}
                    placeholder="*******"
                    className="w-full px-3 text-center py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full rounded-md py-3 text-white"
                >
                  Continue
                </button>
              </div>
            </form>
            <div className="flex items-center pt-4 space-x-1">
              <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
              <p className="px-3 text-sm dark:text-gray-400">
                Signup with social accounts
              </p>
              <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
            </div>
            <div
              onClick={handleGoogleLogIn}
              className="flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer"
            >
              <FcGoogle size={32} />

              <p>Continue with Google</p>
            </div>
            <p className="px-6 text-sm text-center text-gray-400">
              New Here?
              <Link
                to="/singup"
                className="hover:underline hover:text-rose-500 text-gray-600"
              >
                Create an Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
