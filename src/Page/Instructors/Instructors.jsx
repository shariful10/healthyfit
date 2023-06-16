import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

const Instructors = () => {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    // Fetch instructor data from the server
    fetch(`${import.meta.env.VITE_API_URL}/instructors`)
      .then((response) => response.json())
      .then((instructors) => setInstructors(instructors))
      .catch((error) => console.error("Error retrieving instructors:", error));
  }, []);
  return (
    <>
      <Helmet>
        <title>HealthyFit | Instructors</title>
      </Helmet>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {instructors.map((instructor) => (
            <div
              key={instructor._id}
              className={`border border-gray-300 p-4 ${"bg-red-100"}`}
            >
              <img
                src={instructor.instructor.image}
                alt={instructor.image}
                className="w-full mb-4"
              />
              <h2 className="text-lg font-bold mb-2">
                {instructor.instructor.name}
              </h2>
              <p className="text-sm mb-2">
                Instructor Name: {instructor.instructor.name}
              </p>
              <p className="text-sm mb-2">
                Email: {instructor.instructor.email}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Instructors;
