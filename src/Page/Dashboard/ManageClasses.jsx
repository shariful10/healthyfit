import { useState } from "react";
import { useEffect } from "react";
import FeedbackModal from "../../components/FeedbackModal/FeedbackModal";
import { Helmet } from "react-helmet-async";
// import Swal from "sweetalert2";

const ManageClasses = () => {
  const [classes, setClasses] = useState([]);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  useEffect(() => {
    // Fetch classes data from the backend
    fetch(`${import.meta.env.VITE_API_URL}/all-class`)
      .then((response) => response.json())
      .then((data) => setClasses(data))
      .catch((error) => console.error("Error fetching classes:", error));
  }, []);

  const handleApproveClass = (classId) => {
    // Update class status to "approved" in the backend
    fetch(`${import.meta.env.VITE_API_URL}/classes/${classId}/approve`, {
      method: "PUT",
    })
      .then(() => {
        // Update the class status in the frontend
        const updatedClasses = classes.map((cls) => {
          if (cls._id === classId) {
            return { ...cls, status: "approved" };
          }
          return cls;
        });
        setClasses(updatedClasses);
      })
      .catch((error) => console.error("Error approving class:", error));
  };

  const handleDenyClass = (classId) => {
    // Update class status to "denied" in the backend
    fetch(`${import.meta.env.VITE_API_URL}/classes/${classId}/deny`, {
      method: "PUT",
    })
      .then(() => {
        // Update the class status in the frontend
        const updatedClasses = classes.map((cls) => {
          if (cls._id === classId) {
            return { ...cls, status: "denied" };
          }
          return cls;
        });
        setClasses(updatedClasses);
      })
      .catch((error) => console.error("Error denying class:", error));
  };

  const handleSubmitFeedback = (feedback) => {
    // Prepare the feedback data
    const feedbackData = {
      classId: selectedClassId,
      feedback,
    };
    console.log(feedback);
    // Send the feedback to the backend
    fetch(
      `${import.meta.env.VITE_API_URL}/classes/${selectedClassId}/feedback`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedbackData),
      }
    )
      .then(() => {
        // Close the feedback modal
        setFeedbackModalOpen(false);
        // Reset the selected class and feedback text
        setSelectedClassId("");
        setFeedbackText("");
        // Perform any necessary actions after submitting the feedback
      })
      .catch((error) => console.error("Error submitting feedback:", error));
  };

  return (
    <div>
      <Helmet>
        <title>HealthyFit | Manage Classes</title>
      </Helmet>
      <table className="table shadow-sm mt-40 shadow-xl mx-auto w-[90%]">
        <thead className="bg-gray-500 text-white ">
          <tr className="text-end">
            <th>Class Image</th>
            <th>Class Name</th>
            <th>Instructor Name</th>
            <th>Instructor Email</th>
            <th>Available Seats</th>
            <th>Price</th>
            <th className="text-end">Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((cls) => (
            <tr key={cls._id}>
              <td>
                <img className="w-28" src={cls.classImage} alt="Class" />
              </td>
              <td>{cls.className}</td>
              <td>{cls.instructor.name}</td>
              <td>{cls.instructor.email}</td>
              <td>{cls.availableSeats}</td>
              <td>${cls.classPrice}</td>
              <td>{cls.status}</td>
              <td className="space-y-2 text-center">
                <button
                  onClick={() => handleApproveClass(cls._id)}
                  disabled={cls.status !== "pending"}
                  className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleDenyClass(cls._id)}
                  disabled={cls.status !== "pending"}
                  className="bg-red-500 text-white px-7 py-2 rounded disabled:opacity-50"
                >
                  Deny
                </button>
                <button
                  onClick={() => {
                    setSelectedClassId(cls._id);
                    setFeedbackModalOpen(true);
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                  Feedback
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <FeedbackModal
        isOpen={feedbackModalOpen}
        onClose={() => setFeedbackModalOpen(false)}
        onSubmit={handleSubmitFeedback}
      />
    </div>
  );
};

export default ManageClasses;
