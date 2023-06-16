import { useState } from "react";

// import { useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import { TbFidgetSpinner } from "react-icons/tb";
import { Player } from "@lottiefiles/react-lottie-player";
import AnimationLottie from "../../assets/update.json";

import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import { imageUpload } from "../../api/imageUpload";
import { Helmet } from "react-helmet-async";

const UpdateClass = () => {
  const classUpdate = useLoaderData();
  const { className, availableSeats, classPrice, classImage, _id } =
    classUpdate;

  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [uploadButtonText, setUploadButtonText] = useState("Upload Image");
  // const navigate = useNavigate();
  // handleFrom Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const className = form.className.value;
    const instructorName = form.displayName;
    const instructorEmail = form.email;
    const availableSeats = form.availableSeats.value;
    const classPrice = form.price.value;
    const classImage = form.image.files[0];
    // upload Imag

    setUploadButtonText("Uploading...");
    imageUpload(classImage)
      .then((data) => {
        const classesData = {
          classImage: data.data.display_url,
          className,
          instructorName,
          instructorEmail,
          availableSeats,
          classPrice: parseFloat(classPrice),

          instructor: {
            name: user?.displayName,
            image: user.photoURL,
            email: user?.email,
          },
        };

        fetch(`${import.meta.env.VITE_API_URL}/classUpdate/${_id}`, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
          body: JSON.stringify(classesData),
        })
          .then((res) => res.json())
          .then((data) => {
            setUploadButtonText("Uploaded!");
            setLoading(false);
            if (data.modifiedCount > 0) {
              Swal.fire({
                title: "Success!",
                text: "Class Update SuccessFull",
                icon: "success",
                confirmButtonText: "Cool",
              });
              setLoading(false);
            }
          });
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
      });
  };

  const handleImageChange = (classImage) => {
    setUploadButtonText(classImage.name);
  };
  return (
    <>
      <Helmet>
        <title>HealthyFit | Update Class</title>
      </Helmet>
      <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl px-5 bg-gray-50">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div className="space-y-1 text-sm">
                <label htmlFor="location" className="block text-gray-600">
                  Class name
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
                  name="className"
                  id="className"
                  type="text"
                  placeholder="Class Name"
                  required
                  defaultValue={className}
                />
              </div>
              <div className="mx-auto w-[80%]">
                <Player autoplay loop src={AnimationLottie}></Player>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-1 text-sm">
                <label htmlFor="title" className="block text-gray-600">
                  Instructor name
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
                  name="instructorName"
                  id="instructorName"
                  type="text"
                  placeholder="Instructor Name"
                  required
                  defaultValue={user?.displayName}
                />
              </div>

              <div className="space-y-1 text-sm">
                <label htmlFor="price" className="block text-gray-600">
                  Instructor email
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
                  name="instructorEmail "
                  id="instructorEmail"
                  type="text"
                  placeholder="Instructor Email "
                  required
                  defaultValue={user?.email}
                />
              </div>

              <div className=" p-4 bg-white w-full  m-auto rounded-lg">
                <div className="file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
                  <div className="flex flex-col w-max mx-auto text-center">
                    <label>
                      <input
                        onChange={(event) =>
                          handleImageChange(event.target.files[0])
                        }
                        className="text-sm cursor-pointer w-36 hidden"
                        type="file"
                        name="classImage"
                        id="image"
                        accept="image/*"
                        hidden
                      />
                      <div className="bg-rose-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-rose-500">
                        {uploadButtonText}
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex  justify-between gap-2">
                <div className="space-y-1 w-full text-sm">
                  <label htmlFor="bedrooms" className="block text-gray-600">
                    Available seats
                  </label>
                  <input
                    className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
                    name="availableSeats"
                    id="availableSeats"
                    type="number"
                    placeholder="Available Seats"
                    required
                    defaultValue={availableSeats}
                  />
                </div>

                <div className="space-y-1 w-full text-sm">
                  <label htmlFor="bathrooms" className="block text-gray-600">
                    Price
                  </label>
                  <input
                    className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
                    name="price"
                    id="price"
                    type="number"
                    placeholder="Price"
                    required
                    defaultValue={classPrice}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="w-1/2 p-3 mt-5 text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-md py-3 text-white"
            >
              {loading ? (
                <TbFidgetSpinner className="m-auto animate-spin" size={24} />
              ) : (
                "Update A Class"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateClass;
