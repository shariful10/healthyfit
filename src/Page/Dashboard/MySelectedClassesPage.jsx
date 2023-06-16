// import Swal from "sweetalert2";
import { Link } from "react-router-dom";

import useClassSelcet from "../../hooks/useClassSelcet";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const MySelectedClassesPage = () => {
  const [selectedClasses, refetch] = useClassSelcet();

  const handleDeleteClass = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_API_URL}/student/classes/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire("Deleted!", "Your item has been deleted.", "success");
            }
          });
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>HealthyFit | MySelectedClass</title>
      </Helmet>
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">My Selected Classes</h1>
        {/* <p>Total Amount: {totalAmount}</p> */}
        <table className="table shadow-2xl w-[90%] mx-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Class Photo</th>
              <th className="px-4 py-2">Class Name</th>
              <th className="px-4 py-2">Instructor</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {selectedClasses.map((classItem) => (
              <tr key={classItem?.selectedClass._id}>
                <td className="px-4 py-2">
                  <img
                    className="w-16"
                    src={classItem?.selectedClass?.classImage}
                    alt=""
                  />
                </td>
                <td className="px-4 py-2">
                  {classItem?.selectedClass?.className}
                </td>
                <td className="px-4 py-2">
                  {classItem?.selectedClass?.instructor.name}
                </td>
                <td className="px-4 py-2">
                  $ {classItem?.selectedClass?.classPrice}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDeleteClass(classItem._id)}
                    className="bg-red-500 mr-2 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    // disabled={isLoading}
                  >
                    {/* {isLoading ? "Deleting..." : "Delete Class"} */}
                    Delete
                  </button>
                  <Link
                    to="/student-dashBoard/payments"
                    state={{ state: classItem }}
                  >
                    <button className="bg-green-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                      Pay
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MySelectedClassesPage;
