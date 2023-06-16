import { Helmet } from "react-helmet-async";
import { FaUserShield, FaChalkboardTeacher } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
// import axios from "axios";

const ManageUsers = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data: users = [], refetch } = useQuery(["users"], async () => {
    const res = await axiosSecure.get("/users");
    return res.data;
  });
  const handleMakeAdmin = (user) => {
    fetch(`${import.meta.env.VITE_API_URL}/users/admin/${user?._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.name} is an Admin Now!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };
  const makeInstructor = (userId) => {
    fetch(`${import.meta.env.VITE_API_URL}/users/instructor/${userId}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "is an Instructor Now!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };
  return (
    <div className="w-full ">
      <Helmet>
        <title>Healthy Fit | Mange Users</title>
      </Helmet>

      <div className="px-12">
        <div>
          <table className="px-5 py-5 shadow-sm shadow-xl  mt-5 border-b border-gray-200 bg-white text-sm table ">
            <thead className="bg-gray-500 text-xl text-white">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user, i) => (
                <tr key={user?._id}>
                  <th>{i + 1}</th>

                  <td>{user?.name}</td>

                  <td>{user?.email}</td>
                  <td>
                    {user.role === "admin" ? (
                      "admin"
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="btn btn-ghost hover:bg-neutral-900 bg-orange-600 text-white "
                      >
                        <FaUserShield />
                      </button>
                    )}
                  </td>
                  <td>
                    {user.role === "instructor" ? (
                      "instructor"
                    ) : (
                      <button
                        onClick={() => makeInstructor(user?._id)}
                        className="btn btn-ghost hover:bg-neutral-900 bg-orange-600 text-white "
                      >
                        <FaChalkboardTeacher />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
