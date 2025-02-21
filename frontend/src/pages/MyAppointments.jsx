import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";

const MyAppointments = () => {
  const { backendUrl, token , getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const months = ["",
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ]
  const slotDateFormate = (slotDate)=>{
    const dateArray = slotDate.split('_');
    return dateArray[0] + " " + months[Number(dateArray[1])]+  " " + dateArray[2]
  }
  const getUserAppointments = async (req, res) => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", {
        headers: { token },
      });
      if (data.success) {
        setAppointments(data.appointments.reverse());
        console.log(data.appointments);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const cancelAppointment = async(appointmentId)=>{
    try {
      const {data} = await axios.post(backendUrl+'/api/user/cancel-appointment',{appointmentId},{headers:{token}})
      if(data.success){
        toast.success(data.message);
        getUserAppointments()
        getDoctorsData()
      }
      else{
        toast.error(data.message)
      }
      console.log(appointmentId);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }
  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
        My appointments
      </p>
      <div>
        {appointments.map((item, index) => (
          <div
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
            key={index}
          >
            <div>
              <img
                className="w-32 bg-indigo-50"
                src={item.docData.image}
                alt=""
              />
            </div>
            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-neutral-800-800 font-semibold">
                {item.docData.name}
              </p>
              <p>{item.docData.speciality}</p>
              <p className="text-zinc-700 font-medium mt-1">Address:</p>
              <p className="text-sx">{item.docData.address.line1}</p>
              <p className="text-sx">{item.docData.address.line2}</p>
              <p className="text-sx mt-1">
                <span className="text-sm text-neutral-700 font-medium">
                  Date & Time:
                </span>{slotDateFormate(item.slotDate)}
                | {item.slotTime}
              </p>
            </div>
            <div></div>
            <div className="flex flex-col gap-2 justify-end">
              {!item.cancelled && <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-[#5f6FFF] hover:text-white transition-all duration-300">
                Pay Online
              </button>}
              {!item.cancelled && <button onClick={()=> cancelAppointment(item._id)} className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border  hover:bg-red-600 hover:text-white transition-all duration-300">
                Cancel appointment
              </button> }
              {item.cancelled && <button className="sm:min-w-48 py-2 border border-red-500 roundedn text-red-500">Appointment Cancelled</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
