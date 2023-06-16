import { Outlet } from "react-router-dom";
import Navbar from "../Page/Shared/Navbar/Navbar";
import Footer from "../components/Footer";
import ContactUs from "../components/ContactUs/ContactUs";

const Main = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-[calc(100vh-68px)] pt-24">
        <Outlet />
      </div>
      <Footer />
      <ContactUs />
    </div>
  );
};

export default Main;
