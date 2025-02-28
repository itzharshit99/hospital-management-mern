import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "../context/AppContext.jsx";


const Feedback = () => {
  const [doctorName, setDoctorName] = useState("");
  const [feedback, setFeedback] = useState("");
  const { backendUrl, token } = useContext(AppContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (!doctorName || !feedback) {
        return toast.error("All fields are required");
      }

      const { data } = await axios.post(
        `${backendUrl}/api/user/add-feedback`,
        { doctorName, feedback },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        setDoctorName("");
        setFeedback("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Submit Feedback</p>
      <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl">
        <div className="flex flex-col gap-4 text-gray-600">
          <div className="flex-1 flex flex-col gap-1">
            <p>Doctor Name</p>
            <input
              onChange={(e) => setDoctorName(e.target.value)}
              value={doctorName}
              className="border rounded px-3 py-2"
              type="text"
              placeholder="Enter doctor's name"
              required
            />
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <p>Your Feedback</p>
            <textarea
              onChange={(e) => setFeedback(e.target.value)}
              value={feedback}
              className="w-full px-4 pt-2 border rounded"
              placeholder="Write your feedback"
              required
              rows={5}
            ></textarea>
          </div>
        </div>
        <button
          type="submit"
          className="bg-[#5f6FFF] px-10 py-3 mt-4 text-white rounded-full cursor-pointer"
        >
          Submit Feedback
        </button>
      </div>
    </form>
  );
};

export default Feedback;