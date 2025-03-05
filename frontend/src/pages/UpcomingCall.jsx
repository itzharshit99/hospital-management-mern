import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";

const UpcomingCall = () => {
  const { appointments, getAppointments } = useContext(AppContext);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        await getAppointments();
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Patient Dashboard</h2>

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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Doctor Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Meeting Link
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {appointments.map((appointment) => (
                <tr key={appointment._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {appointment.docData.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {new Date(appointment.date).toLocaleString()}
                  </td>
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
                  <td className="px-6 py-4 text-sm">
                    {appointment.meetingLink ? (
                      <a
                        href={appointment.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                      >
                        Join Meeting
                      </a>
                    ) : (
                      <p className="text-red-500 text-sm">No meeting scheduled</p>
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

export default UpcomingCall;