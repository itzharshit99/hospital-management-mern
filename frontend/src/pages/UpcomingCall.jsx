import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";

const UpcomingCall = () => {
  const { appointments, getAppointments } = useContext(AppContext);

  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Patient Dashboard</h2>

      {appointments.length === 0 ? (
        <p>No appointments available</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Doctor Name</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Meeting Link</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment._id} className="border">
                <td className="border p-2">{appointment.docData.name}</td>
                <td className="border p-2">
                  {new Date(appointment.date).toLocaleString()}
                </td>
                <td className="border p-2">
                  {appointment.isCompleted ? "Completed ✅" : "Pending ⏳"}
                </td>
                <td className="border p-2">
                  {appointment.meetingLink ? (
                    <a
                      href={appointment.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-blue-500 text-white rounded"
                    >
                      Join Meeting
                    </a>
                  ) : (
                    <p className="text-red-500">No meeting scheduled</p>
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

export default UpcomingCall;
