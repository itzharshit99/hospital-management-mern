// import React, { useEffect } from "react";
// import { useContext } from "react";
// import { DoctorContext } from "../../context/DoctorContext.jsx";
// import { AppContext } from "../../context/AppContext";
// import { assets } from "../../assets/assets.js";

// const DoctorAppointments = () => {
//   const {
//     dToken,
//     appointments,
//     getAppointments,
//     completeAppointment,
//     cancelAppointment,
//   } = useContext(DoctorContext);
//   const { calculateAge, slotDateFormat, currency } = useContext(AppContext);
//   useEffect(() => {
//     if (dToken) {
//       getAppointments();
//     }
//   }, [dToken]);

//   return (
//     <div className="w-full max-w-6xl m-5">
//       <p className="mb-3 text-lg font-medium">All Appointments</p>
//       <div className="bg-white border rounded text-sm max-h[80vh] min-h-[50vh] overflow-y-scroll">
//         <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b">
//           <p>#</p>
//           <p>patient details</p>
//           <p>payment</p>
//           <p>age</p>
//           <p>date & time</p>
//           <p>fees</p>
//           <p>action</p>
//         </div>
//         {appointments.reverse().map((item, index) => (
//           <div
//             className="flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50"
//             key={index}
//           >
//             <p>{index + 1}</p>
//             <div className="flex items-center gap-2">
//               <img
//                 className="w-8 rounded-full"
//                 src={item.userData.image}
//                 alt=""
//               />{" "}
//               <p>{item.userData.name}</p>
//             </div>
//             <div>
//               <p>{item.payment ? "Online" : "Cash"}</p>
//             </div>
//             <p>{calculateAge(item.userData.dob)}</p>
//             <p>
//               {slotDateFormat(item.slotDate)},{item.slotTime}
//             </p>
//             <p>
//               {currency}
//               {item.amount}
//             </p>
//             {item.cancelled ? (
//               <p className="text-red-500 text-xs font-medium">cancelled</p>
//             ) : item.isCompleted ? (
//               <p className="text-green-500 text-xs font-medium">completed</p>
//             ) : (
//               <div className="flex gap-1">
//                 <img
//                   onClick={() => cancelAppointment(item._id)}
//                   className="w-10 cursor-pointer"
//                   src={assets.cancel_icon}
//                   alt=""
//                 />
//                 <img
//                   onClick={() => completeAppointment(item._id)}
//                   className="w-10 cursor-pointer"
//                   src={assets.tick_icon}
//                   alt=""
//                 />
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DoctorAppointments;

import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext.jsx";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets.js";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorAppointments = () => {
  const {
    dToken,
    appointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
    backendUrl
  } = useContext(DoctorContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  const [prescriptionText, setPrescriptionText] = useState({}); // Store prescription text for each appointment
  const [selectedAppointment, setSelectedAppointment] = useState(null); // Store selected appointment

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  const handleSendPrescription = async () => {
    if (!selectedAppointment) return;

    const text = prescriptionText[selectedAppointment._id] || "";

    if (!text || text.trim() === "") {
      alert("Please enter a prescription!");
      return;
    }

    try {
      const response = await axios.post(backendUrl + "/api/doctor/prescription", {
        docId: selectedAppointment.docId,
        userId: selectedAppointment.userData._id,
        prescriptionText: text,
      },{headers:{dToken}});
      console.log(response);

      toast.success(`Prescription sent to ${selectedAppointment.userData.name}`);
      setSelectedAppointment(null); // Close the modal
      setPrescriptionText({ ...prescriptionText, [selectedAppointment._id]: "" }); // Clear the prescription text for this appointment
    } catch (error) {
      console.error("Error sending prescription:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Error sending prescription");
    }
  };

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll">
        <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr_1fr] gap-1 py-3 px-6 border-b">
          <p>#</p>
          <p>Patient Details</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
          <p>Prescription</p>
        </div>
        {appointments.reverse().map((item, index) => (
          <div
            className="flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50"
            key={index}
          >
            <p>{index + 1}</p>
            <div className="flex items-center gap-2">
              <img className="w-8 rounded-full" src={item.userData.image} alt="" />
              <p>{item.userData.name}</p>
            </div>
            <div>
              <p>{item.payment ? "Online" : "Cash"}</p>
            </div>
            <p>{calculateAge(item.userData.dob)}</p>
            <p>
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </p>
            <p>
              {currency}
              {item.amount}
            </p>
            {item.cancelled ? (
              <p className="text-red-500 text-xs font-medium">Cancelled</p>
            ) : item.isCompleted ? (
              <p className="text-green-500 text-xs font-medium">Completed</p>
            ) : (
              <div className="flex gap-1">
                <img
                  onClick={() => cancelAppointment(item._id)}
                  className="w-10 cursor-pointer"
                  src={assets.cancel_icon}
                  alt=""
                />
                <img
                  onClick={() => completeAppointment(item._id)}
                  className="w-10 cursor-pointer"
                  src={assets.tick_icon}
                  alt=""
                />
              </div>
            )}

            {/* Prescription Button */}
            <button
              onClick={() => setSelectedAppointment(item)}
              className="bg-[#5f6FFF] text-white px-4 py-1 rounded-2xl hover:bg-[#5f6FFF] cursor-pointer "
            >
              Write Prescription
            </button>
          </div>
        ))}
      </div>

      {/* Modal for Writing Prescription */}
      {selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
            <h2 className="text-lg font-bold mb-2">Write Prescription</h2>
            <p className="text-sm text-gray-600 mb-2">
              Patient: {selectedAppointment.userData.name}
            </p>
            <textarea
              className="w-full border p-2 rounded mb-3 h-100"
              placeholder="Write prescription..."
              value={prescriptionText[selectedAppointment._id] || ""}
              onChange={(e) => 
                setPrescriptionText({
                  ...prescriptionText,
                  [selectedAppointment._id]: e.target.value,
                })
              }
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={handleSendPrescription}
                className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
              >
                Send
              </button>
              <button
                onClick={() => setSelectedAppointment(null)}
                className="bg-gray-500 text-white px-4 py-1 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorAppointments;