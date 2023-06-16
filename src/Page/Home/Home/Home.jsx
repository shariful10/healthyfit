import { Helmet } from "react-helmet-async";
import Cover from "../../../components/Cover";
import { motion } from "framer-motion";
import { fadeIn } from "../../../../variants";
import { useEffect, useState } from "react";
import FeaturedCard from "../../../components/Cards/FeaturedCard";
import PopularClasses from "./PopularClasses/PopularClasses";
import PopularInstructors from "./PopularInstructors/PopularInstructors";

const Home = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/featured-class`)
      .then((response) => response.json())
      .then((classes) => setClasses(classes))
      .catch((error) => console.error("Error retrieving classes:", error));
  }, []);
  return (
    <div>
      <Helmet>
        <title>HealthyFit | Home</title>
      </Helmet>
      <Cover />

      <PopularClasses />
      <PopularInstructors />
      <div className="mt-8 text-center">
        <h2 className="lg:text-4xl font-semibold mb-8 text-transparent text-2xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          -------------------------- Ours Featured Class
          --------------------------
        </h2>
        <motion.div
          variants={fadeIn("up", 0.3)}
          initial="hidden"
          whileInView={"show"}
          className="grid grid-cols-1 px-32 lg:px-12 sm:grid-cols-2 md:grid-cols-3 gap-4"
        >
          {classes.map((singleClass) => (
            <FeaturedCard key={singleClass._id} singleClass={singleClass} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
