import { useState } from "react";

const FeedbackModal = ({ isOpen, onClose, onSubmit }) => {
  const [feedbackText, setFeedbackText] = useState("");

  const handleSubmit = () => {
    onSubmit(feedbackText);
    setFeedbackText("");
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="bg-white w-96 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Submit Feedback</h2>
        <textarea
          className="w-full h-32 p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
          placeholder="Enter your feedback here..."
        />
        <div className="flex justify-end mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <button
            className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
