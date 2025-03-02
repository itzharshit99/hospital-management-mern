import { useContext, useEffect, useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "../../context/DoctorContext";

const DoctorDashboard = () => {
    const { getAppointments, appointments, completeAppointment, cancelAppointment, backendUrl, dToken } = useContext(DoctorContext);
    const [meetingLinks, setMeetingLinks] = useState({}); // Store meeting links for each appointment

    useEffect(() => {
        getAppointments();
    }, []);

    const startCall = async (appointmentId, docId, userId) => {
        try {
            const { data } = await axios.post(backendUrl +
                '/api/meeting/start-meeting',
                { docId, userId }
            );
            console.log(data);

            if (data.success) {
                setMeetingLinks((prev) => ({ ...prev, [appointmentId]: data.meetingLink }));
                toast.success("Meeting link generated!");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Error starting video call");
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Doctor Dashboard</h2>

            {appointments.length === 0 ? (
                <p>No appointments available</p>
            ) : (
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">Patient Name</th>
                            <th className="border p-2">Date</th>
                            <th className="border p-2">Status</th>
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appointment) => (
                            <tr key={appointment._id} className="border">
                                <td className="border p-2">{appointment.userData.name}</td>
                                <td className="border p-2">{new Date(appointment.date).toLocaleString()}</td>
                                <td className="border p-2">{appointment.isCompleted ? "Completed ✅" : "Pending ⏳"}</td>
                                <td className="border p-2 space-x-2">
                                    <button
                                        onClick={() => completeAppointment(appointment._id)}
                                        className="px-3 py-1 bg-green-500 text-white rounded"
                                    >
                                        Complete
                                    </button>
                                    <button
                                        onClick={() => cancelAppointment(appointment._id)}
                                        className="px-3 py-1 bg-red-500 text-white rounded"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() =>
                                            startCall(appointment._id, appointment.docId, appointment.userId)
                                        }
                                        className="px-3 py-1 bg-blue-500 text-white rounded"
                                    >
                                        Start Video Call
                                    </button>
                                    {meetingLinks[appointment._id] && (
                                        <a
                                            href={meetingLinks[appointment._id]}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-3 py-1 bg-purple-500 text-white rounded"
                                        >
                                            Join Call
                                        </a>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default DoctorDashboard;
