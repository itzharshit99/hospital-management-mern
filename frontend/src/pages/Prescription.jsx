import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { FaUserMd, FaCalendarAlt, FaFileMedical } from "react-icons/fa"; // Import icons

const Prescription = () => {
  const { prescriptions, getPrescriptions } = useContext(AppContext);

  // Fetch prescriptions when the component mounts
  useEffect(() => {
    getPrescriptions();
  }, []);

  return (
    <div className="min-h-screen  p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
          <FaFileMedical className="mr-2 text-blue-500" /> Your Prescriptions
        </h2>
        {prescriptions.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-600 text-lg">No prescriptions found.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {prescriptions.map((prescription) => (
              <div
                key={prescription._id}
                className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                        <FaUserMd className="text-blue-500 text-2xl" /> {/* Doctor icon */}
                      </div>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-800">{prescription.docId.name}</p>
                      <p className="text-sm text-gray-500 flex items-center">
                        <FaCalendarAlt className="mr-2" /> {/* Calendar icon */}
                        {new Date(prescription.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
                      <FaFileMedical className="mr-2 text-blue-500" /> Prescription
                    </h3>
                    <p className="text-gray-700 whitespace-pre-wrap">{prescription.prescriptionText}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Prescription;