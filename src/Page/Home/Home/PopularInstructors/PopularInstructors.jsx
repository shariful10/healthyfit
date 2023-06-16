import { useEffect, useState } from "react";

const PopularInstructors = () => {
  const [popularInstructors, setPopularInstructors] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/popular-instructors`)
      .then((response) => response.json())
      .then((data) => setPopularInstructors(data))
      .catch((error) =>
        console.error("Error fetching popular instructors:", error)
      );
  }, []);

  return (
    <div className="px-6">
      <h2 className="lg:text-3xl text-xl font-bold mb-4 text-center mt-5 uppercase ">
        -------------------------- Popular Instructors
        --------------------------
      </h2>
      <div className="grid grid-cols-3 gap-4">
        {popularInstructors.map((instructor) => (
          <div key={instructor._id} className="bg-white rounded-lg p-4 shadow">
            <img
              src={instructor.instructorImage}
              alt={instructor.instructorName}
              className="w-full mb-2"
            />
            <p className="font-semibold uppercase">
              {instructor.instructorName}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularInstructors;
