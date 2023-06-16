import { motion } from "framer-motion";
import { fadeIn } from "../../../variants";
const PopularClassesCard = ({ classItem }) => {
  const { classImage, className, classPrice, instructor, availableSeats } =
    classItem.selectedClass;

  return (
    <motion.div
      variants={fadeIn("up", 0.3)}
      initial="hidden"
      whileInView={"show"}
      className=" min-h-full lg:w-full w-[64%] mx-auto rounded overflow-hidden shadow-lg bg-white mt-4"
    >
      <img src={classImage} alt="image" />
      <div className="ml-3 space-y-1">
        <h2 className="text-xl uppercase font-bold pt-2">
          Class Name :{className}
        </h2>
        <p className=" font-semibold">Price: ${classPrice}</p>
        <p className=" font-semibold">Instructor Name: {instructor?.name}</p>
        <p className=" font-semibold">Available Seats: {availableSeats}</p>
      </div>
    </motion.div>
  );
};

export default PopularClassesCard;
