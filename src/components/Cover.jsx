import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper";
import Image1 from "../../src/assets/images/slider-img1.jpg";
import Image2 from "../../src/assets/images/slider-img2.jpg";
import { motion } from "framer-motion";
import { fadeIn } from "../../variants";
const Cover = () => {
  return (
    <>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        <SwiperSlide>
          <div>
            <div className="absolute w-1/2 top-48 left-[30%] space-y-2  ">
              <motion.h2
                variants={fadeIn("up", 0.3)}
                initial="hidden"
                whileInView={"show"}
                className="text-6xl font-bold text-white"
              >
                Find Your <span className="text-orange-400">Healthy</span>
              </motion.h2>
              <motion.h3
                variants={fadeIn("up", 0.3)}
                initial="hidden"
                whileInView={"show"}
                className="text-white font-bold text-6xl lg:text-center md:text-center xl:text-center mr-24"
              >
                Weight
              </motion.h3>
              <motion.p
                variants={fadeIn("up", 0.3)}
                initial="hidden"
                whileInView={"show"}
                className="lg:text-center md:text-center xl:text-center mr-12 text-white "
              >
                It is a long established fact that a reader will be distracted
                by the readable content layout readable English.ratione, id
                soluta aspernatur nulla minus.
              </motion.p>
              <motion.div
                variants={fadeIn("up", 0.3)}
                initial="hidden"
                whileInView={"show"}
                className="text-center mr-20"
              >
                <button className="bg-white p-2 rounded text-xl font-semibold text-orange-400 hover:border-r-4 border-orange-400 ">
                  Get Quote
                </button>
              </motion.div>
            </div>
            <div
              style={{
                backgroundImage: `linear-gradient(140deg, #181818 0%, rgba(24, 24, 24, 0.822917) 24.48%, rgba(24, 24, 24, 0) 100%), url(${Image1})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
                height: "80vh",
                width: "100%",
              }}
            ></div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div>
            <div className="absolute w-1/2 top-48 left-[30%] space-y-2  ">
              <h2 className="text-6xl font-bold text-white">
                Find Your <span className="text-orange-400">Healthy</span>
              </h2>
              <h3 className="text-white font-bold text-6xl lg:text-center md:text-center xl:text-center mr-24">
                Weight
              </h3>
              <p className="lg:text-center md:text-center xl:text-center mr-12 text-white ">
                It is a long established fact that a reader will be distracted
                by the readable content layout readable English.ratione, id
                soluta aspernatur nulla minus.
              </p>
              <div className="text-center mr-20">
                <button className="bg-white p-2 rounded text-xl font-semibold text-orange-400 hover:border-r-4 border-orange-400 ">
                  Get Quote
                </button>
              </div>
            </div>
            <div
              style={{
                backgroundImage: `linear-gradient(140deg, #181818 0%, rgba(24, 24, 24, 0.822917) 24.48%, rgba(24, 24, 24, 0) 100%), url(${Image2})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
                height: "80vh",
                width: "100%",
              }}
            ></div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Cover;
