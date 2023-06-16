import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Player } from "@lottiefiles/react-lottie-player";
import AnimationLottie from "../../assets/login.json";
import { Helmet } from "react-helmet-async";
import { FcGoogle } from "react-icons/fc";

import { BsEyeSlashFill, BsFillEyeSlashFill } from "react-icons/bs";
import { saveUser } from "../../api/auth";
import { useState } from "react";
import { toast } from "react-hot-toast";
import "./SingUp.css";
import useAuth from "../../hooks/useAuth";
const SignUp = () => {
  const [success, setSuccess] = useState("");
  const navigate = useNavigate("");
  let location = useLocation();
  const [passwordShown, setPasswordShown] = useState(false);
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const { createUser, setLoading, signInWithGoogle, updateUserProfile, user } =
    useAuth();

  const onSubmit = (data) => {
    createUser(data?.email, data?.password).then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser);
      updateUserProfile(data?.name, data?.photoURL)
        .then(() => {
          const saveUser = { name: data?.name, email: data?.email };
          fetch(`${import.meta.env.VITE_API_URL}/users`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(saveUser),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.insertedId) {
                reset();
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "User Created SuccessFully",
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
              navigate(from, { replace: true });
            });
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };
  const handleGoogleLogIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
        setSuccess(toast.success("Google SinIn Success", {}));
        // todo save add to db user
        saveUser(result.user);
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  };
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  return (
    <>
      <Helmet>
        <title>HealthyFit | SingUp</title>
      </Helmet>
      <div className="grid md:grid-cols-2 items-center lg:grid-cols-2">
        <div className="mx-auto w-[80%]">
          <Player autoplay loop src={AnimationLottie}></Player>
        </div>
        <div className="flex justify-center w-full items-center min-h-screen">
          <div className="flex flex-col max-w-md p-6 rounded-lg sm:p-10 bg-white shadow-lg  text-gray-900">
            <div className="mb-8 text-center">
              <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
              <p className="text-sm text-gray-400">Welcome to Healthy Fit</p>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6 ng-untouched ng-pristine ng-valid"
            >
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm">
                    Name
                  </label>
                  <input
                    style={{ borderRadius: "0px 200px 0px 200px" }}
                    type="text"
                    name="name"
                    id="name"
                    {...register("name", { required: true })}
                    placeholder="Enter Your Name Here"
                    className="w-full px-3 text-center py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                    data-temp-mail-org="0"
                  />
                  {errors.name && (
                    <span className="text-red-600">Name is required</span>
                  )}
                </div>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm">
                      Photo URL
                    </label>

                    <input
                      type="url"
                      style={{ borderRadius: "0px 200px 0px 200px" }}
                      {...register("photoURL", { required: true })}
                      placeholder="Photo URL"
                      name="photoURL"
                      className="w-full px-3 text-center py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                      data-temp-mail-org="0"
                    />
                    {errors.photoURL && (
                      <span className="text-red-600">
                        Photo URL is required
                      </span>
                    )}
                  </div>
                </div>

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
                  <div className="flex justify-between  password-filed">
                    <label htmlFor="password" className="text-sm mb-2 ">
                      Password
                    </label>
                    {passwordShown ? (
                      <BsEyeSlashFill
                        onClick={togglePassword}
                        className="eye text-red-500"
                      />
                    ) : (
                      <BsEyeSlashFill
                        onClick={togglePassword}
                        className="eye text-red-500"
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
                      minLength: 6,
                      maxLength: 20,
                      pattern:
                        /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                    })}
                    placeholder="*******"
                    className="w-full px-3 text-center py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                  />
                  {errors.password?.type === "required" && (
                    <p className="text-red-600">Password is required</p>
                  )}
                  {errors.password?.type === "minLength" && (
                    <p className="text-red-600">
                      Password must be 6 characters
                    </p>
                  )}
                  {errors.password?.type === "maxLength" && (
                    <p className="text-red-600">
                      Password must be less than 20 characters
                    </p>
                  )}
                  {errors.password?.type === "pattern" && (
                    <p className="text-red-600">
                      Password must have one Uppercase one lower case, one
                      number and one special character.
                    </p>
                  )}
                </div>
                <div>
                  <div className="flex justify-between password-filed">
                    <label htmlFor="password" className="text-sm mb-2 ">
                      Confirm Password
                    </label>
                    {passwordShown ? (
                      <BsFillEyeSlashFill
                        onClick={togglePassword}
                        className="eye text-blue-500"
                      />
                    ) : (
                      <BsEyeSlashFill
                        onClick={togglePassword}
                        className="eye text-blue-500"
                      />
                    )}
                  </div>
                  <input
                    style={{ borderRadius: "0px 200px 0px 200px" }}
                    type={passwordShown ? "text" : "password"}
                    name="confirmPassword"
                    id="password"
                    {...register("confirmPassword", {
                      required: true,
                      minLength: 6,
                      maxLength: 20,
                      pattern:
                        /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                      validate: (value) =>
                        value === watch("password") || "Passwords do not match",
                    })}
                    placeholder="*******"
                    className="w-full px-3 text-center py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                  />
                  {errors.confirmPassword?.type === "required" && (
                    <p className="text-red-600">Confirm Password is required</p>
                  )}
                  {errors.confirmPassword?.type === "minLength" && (
                    <p className="text-red-600">
                      Confirm Password must be 6 characters
                    </p>
                  )}
                  {errors.confirmPassword?.type === "maxLength" && (
                    <p className="text-red-600">
                      Confirm Password must be less than 20 characters
                    </p>
                  )}
                  {errors.confirmPassword?.type === "pattern" && (
                    <p className="text-red-600">
                      Confirm Password must have one Uppercase one lower case,
                      one number and one special character.
                    </p>
                  )}
                  {errors.confirmPassword && (
                    <p>{errors.confirmPassword.message}</p>
                  )}
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
              Already have an account?
              <Link
                to="/login"
                className="hover:underline hover:text-rose-500 text-gray-600"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
