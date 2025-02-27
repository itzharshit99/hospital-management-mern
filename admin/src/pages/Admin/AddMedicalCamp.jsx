import React, { useState, useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddMedicalCamp = () => {
  const [campName, setCampName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [details, setDetails] = useState("");
  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const campData = { campName, date, time, location, details };

      const { data } = await axios.post(
        backendUrl + "/api/admin/add-medical-camp",
        campData,
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success(data.message);
        setCampName("");
        setDate("");
        setTime("");
        setLocation("");
        setDetails("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Medical Camp</p>
      <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl">
        <div className="flex flex-col gap-4 text-gray-600">
          <div className="flex flex-col gap-1">
            <p>Camp Name</p>
            <input
              onChange={(e) => setCampName(e.target.value)}
              value={campName}
              className="border rounded px-3 py-2"
              type="text"
              placeholder="Camp Name"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <p>Date</p>
            <input
              onChange={(e) => setDate(e.target.value)}
              value={date}
              className="border rounded px-3 py-2"
              type="date"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <p>Time</p>
            <input
              onChange={(e) => setTime(e.target.value)}
              value={time}
              className="border rounded px-3 py-2"
              type="time"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <p>Location</p>
            <input
              onChange={(e) => setLocation(e.target.value)}
              value={location}
              className="border rounded px-3 py-2"
              type="text"
              placeholder="Location"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <p>Details</p>
            <textarea
              onChange={(e) => setDetails(e.target.value)}
              value={details}
              className="border rounded px-3 py-2"
              placeholder="Provide details about the medical camp"
              rows={4}
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-[#5f6FFF] px-10 py-3 mt-4 text-white rounded-full cursor-pointer"
        >
          Add Camp
        </button>
      </div>
    </form>
  );
};

export default AddMedicalCamp;
