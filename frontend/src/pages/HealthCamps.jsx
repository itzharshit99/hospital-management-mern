import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { FaMapMarkerAlt, FaClock, FaCalendarAlt, FaInfoCircle } from "react-icons/fa";

const HealthCamps = () => {
  const { medicalCamps, getMedicalCamps } = useContext(AppContext);

  useEffect(() => {
    getMedicalCamps();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Title */}
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
        🏥 Upcoming <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">Medical Camps</span>
      </h2>

      {/* Medical Camps Grid */}
      {medicalCamps.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {medicalCamps.map((camp) => (
            <div 
              key={camp._id} 
              className="p-5 border rounded-xl shadow-lg bg-white hover:shadow-2xl transition-all duration-300 flex flex-col cursor-pointer"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{camp.campName}</h3>
              <div className="space-y-2 text-gray-600">
                <p className="flex items-center">
                  <FaCalendarAlt className="mr-2 text-blue-500" /> 
                  <strong className="mr-1">Date:</strong> {new Date(camp.date).toDateString()}
                </p>
                <p className="flex items-center">
                  <FaClock className="mr-2 text-green-500" /> 
                  <strong className="mr-1">Time:</strong> {camp.time}
                </p>
                <p className="flex">
                  <FaMapMarkerAlt className="mr-2 text-red-500" /> 
                  <strong className="mr-1">Location:</strong> {camp.location}
                </p>
                <p className="flex">
                  <FaInfoCircle className="mr-2 text-purple-500" /> 
                  <strong className="mr-2">Details:</strong> {camp.details}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg mt-5">No medical camps available</p>
      )}
    </div>
  );
};

export default HealthCamps;
