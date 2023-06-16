import { Link } from "react-router-dom";
import useAdmin from "../../../hooks/useAdmin";
import useInstructor from "../../../hooks/useInstructor";
import useAuth from "../../../hooks/useAuth";

const Items = () => {
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();
  const { user } = useAuth();
  return (
    <div className=" w-full md:w-auto   ">
      <ul className="flex lg:text-sm font-semibold justify-center items-center gap-x-5">
        <Link>
          <li>Home</li>
        </Link>
        <Link to="/instructors">
          <li>Instructors</li>
        </Link>
        <Link to="/class">
          <li>Classes</li>
        </Link>
        <div className="px-2 ">
          {user && (
            <>
              {isAdmin ? (
                <>
                  <Link to="/admin-dashBoard">Admin DashBoard</Link>
                </>
              ) : isInstructor ? (
                <>
                  <Link to="/instructor-dashBoard">Instructor DashBoard</Link>
                </>
              ) : (
                <>
                  <Link to="/student-dashboard"> Dashboard</Link>
                </>
              )}
            </>
          )}
        </div>
      </ul>
    </div>
  );
};

export default Items;
