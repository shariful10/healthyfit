import axios from "axios";
import { useEffect, useState } from "react";
import PopularClassesCard from "../../../../components/Cards/PopularClassesCard";

const PopularClasses = () => {
  const [popularClasses, setPopularClasses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/popular-classes`
        );
        setPopularClasses(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="lg:text-4xl text-xl uppercase font-semibold text-center ">
        ------------------------ Ours Popular Classes -----------------------
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {popularClasses?.map((classItem) => (
          <PopularClassesCard key={classItem._id} classItem={classItem} />
        ))}
      </div>
    </div>
  );
};

export default PopularClasses;
