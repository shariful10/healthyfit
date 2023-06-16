import { useState } from "react";

import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { imageUpload } from "../../api/imageUpload";
import useAuth from "../../hooks/useAuth";
import AddClassForm from "../../components/Forms/AddClassForm";
import { addClass } from "../../api/class";
import { Helmet } from "react-helmet-async";

const AddAClass = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [uploadButtonText, setUploadButtonText] = useState("Upload Image");
  const navigate = useNavigate();

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
          status: "pending",
          totalEnrolledStudents: 0,
          feedback: "",

          instructor: {
            name: user?.displayName,
            image: user.photoURL,
            email: user?.email,
          },
        };

        // post room data to server
        addClass(classesData)
          .then((data) => {
            console.log(data);
            setUploadButtonText("Uploaded!");
            setLoading(false);
            toast.success("Class Added SuccessFull");
            navigate("/instructor-dashBoard/my-class");
          })
          .catch((error) => console.log(error));

        setLoading(false);
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
        <title>HealthyFit | Add A Class</title>
      </Helmet>
      <AddClassForm
        handleSubmit={handleSubmit}
        loading={loading}
        handleImageChange={handleImageChange}
        uploadButtonText={uploadButtonText}
        user={user}
      />
    </>
  );
};

export default AddAClass;
