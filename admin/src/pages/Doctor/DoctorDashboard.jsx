import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "../../context/DoctorContext";

const DoctorDashboard = () => {
    const { getAppointments, appointments, completeAppointment, cancelAppointment, backendUrl, dToken } = useContext(DoctorContext);
    const [meetingLinks, setMeetingLinks] = useState({}); // Store meeting links for each appointment
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                await getAppointments();
            } catch (error) {
                toast.error("Failed to fetch appointments");
            } finally {
                setLoading(false);
            }
        };
        fetchAppointments();
    }, []);

    const startCall = async (appointmentId, docId, userId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/meeting/start-meeting', { docId, userId });
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
        <div className="p-6 bg-gray-50 min-h-screen">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Doctor Dashboard</h2>

            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : appointments.length === 0 ? (
                <p className="text-gray-600">No appointments available.</p>
            ) : (
                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Patient Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {appointments.map((appointment) => (
                                <tr key={appointment._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-sm text-gray-800">{appointment.userData.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-800">{new Date(appointment.date).toLocaleString()}</td>
                                    <td className="px-6 py-4 text-sm">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                                appointment.isCompleted
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                            }`}
                                        >
                                            {appointment.isCompleted ? "Completed ✅" : "Pending ⏳"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm space-x-2">
                                        <button
                                            onClick={() => completeAppointment(appointment._id)}
                                            className="px-3 py-1.5 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors disabled:bg-green-300"
                                            disabled={appointment.isCompleted}
                                        >
                                            Complete
                                        </button>
                                        <button
                                            onClick={() => cancelAppointment(appointment._id)}
                                            className="px-3 py-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors disabled:bg-red-300"
                                            disabled={appointment.isCompleted}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={() => startCall(appointment._id, appointment.docId, appointment.userId)}
                                            className="px-3 py-1.5 bg-[#5f6FFF] text-white rounded-md hover:bg-blue-800 transition-colors"
                                        >
                                            Start Video Call
                                        </button>
                                        {meetingLinks[appointment._id] && (
                                            <a
                                                href={meetingLinks[appointment._id]}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-3 py-1.5 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors"
                                            >
                                                Join Call
                                            </a>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default DoctorDashboard;