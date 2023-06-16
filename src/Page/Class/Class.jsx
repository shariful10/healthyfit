import { useEffect, useState } from "react";

import useAdmin from "../../hooks/useAdmin";
import useInstructor from "../../hooks/useInstructor";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Class = () => {
  const [classes, setClasses] = useState([]);
  const { user } = useAuth();
  console.log(classes);
  const navigate = useNavigate();
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/all-class?status=approved`)
      .then((response) => response.json())
      .then((data) => setClasses(data))
      .catch((error) => console.error("Error fetching classes:", error));
  }, []);

  const handleSelect = (classId) => {
    if (!user) {
      toast.error("Please log in before selecting the course.");
      return navigate("/login");
    }

    if (isAdmin || isInstructor) {
      toast.error("Admins and instructors cannot select a course.");
      return;
    }

    const selectedClass = classes.find(
      (classItem) => classItem._id === classId
    );

    if (!selectedClass) {
      console.error("Selected class not found");
      return;
    }

    const payload = {
      selectedClass,
      email: user.email, // or any other user identifier you want to send
    };
    console.log(payload);

    fetch(`${import.meta.env.VITE_API_URL}/select-class`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your class has been selected",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error("Error selecting class:", error);
        // Handle error, show error message, etc.
      });
  };

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {classes.map((classItem) => (
          <div
            key={classItem._id}
            className={`bg-white shadow-md rounded-md p-4 ${
              classItem.availableSeats === 0 ? "bg-red-500" : ""
            }`}
          >
            <img
              src={classItem.classImage}
              alt={classItem.classImage}
              className="mb-4"
            />
            <h2 className="text-lg font-bold">{classItem.className}</h2>
            <p className="text-gray-600 mb-2">{classItem?.instructor?.name}</p>
            <p className="mb-2">
              Available Seats: {classItem.availableSeats}
              {classItem.availableSeats === 0 ? "(No seats available)" : ""}
            </p>
            <p className="mb-2">Price: ${classItem.classPrice}</p>

            <button
              disabled={
                classItem.availableSeats === 0 || isAdmin || isInstructor
              }
              onClick={() => handleSelect(classItem._id)}
              className={`${
                classItem.availableSeats === 0 || isAdmin || isInstructor
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500"
              } text-white rounded px-4 py-2`}
            >
              Select
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Class;
