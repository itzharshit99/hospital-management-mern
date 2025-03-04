import React, { useContext, useEffect, useRef } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { FaUserMd, FaCalendarAlt, FaFileMedical, FaDownload } from "react-icons/fa";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import domtoimage from "dom-to-image";
import companylogo from '../assets/logo.svg'
const Prescription = () => {
  const { prescriptions, getPrescriptions } = useContext(AppContext);
  const prescriptionRef = useRef(null);

  // Fetch prescriptions when the component mounts
  useEffect(() => {
    getPrescriptions();
  }, []);


  const createPdfTemplate = (pdf, prescription) => {
    // Set font and size for the template
    pdf.setFont("helvetica"); // Default font
    pdf.setFontSize(12);
  
    // Add Hospital Logo (if available)
    
  
    // Add Hospital Name and Address
    pdf.setFontSize(16);
    pdf.setFont("helvetica", "bold"); // Set font to bold
    pdf.text("Prescripto", 50, 20);
    pdf.setFont("helvetica", "normal"); // Reset font to normal
    pdf.setFontSize(12);
    pdf.text("Delhi, India", 50, 28);
    pdf.text("Phone: +91 1234567890 | Email: info@prescripto.com", 50, 36);
  
    // Add a horizontal line separator
    pdf.setDrawColor(0, 0, 0); // Black color
    pdf.line(10, 40, 200, 40); // Draw a line from (10mm, 40mm) to (200mm, 40mm)
  
    // Add Prescription Details
    pdf.setFontSize(14);
    pdf.setFont("helvetica", "bold"); // Set font to bold
    pdf.text("Prescription Details", 10, 50);
    pdf.setFont("helvetica", "normal"); // Reset font to normal
    pdf.setFontSize(12);
  
    // Add Doctor's Name
    pdf.text(`Doctor: ${prescription.docId.name}`, 10, 60);
  
    // Add Date
    pdf.text(`Date: ${new Date(prescription.createdAt).toLocaleDateString()}`, 10, 70);
  
    // Add Prescription Text
    const prescriptionText = prescription.prescriptionText;
    const splitText = pdf.splitTextToSize(prescriptionText, 180); // Split text to fit within 180mm width
  
    let yOffset = 80; // Initial Y position for prescription text
    splitText.forEach((line) => {
      if (yOffset > 280) { // Check if Y position exceeds page height
        pdf.addPage(); // Add a new page
        yOffset = 20; // Reset Y position for the new page
      }
      pdf.text(line, 10, yOffset);
      yOffset += 10; // Move Y position down
    });
  
    // Add Footer
    pdf.setFontSize(10);
    pdf.setTextColor(100); // Gray color
    pdf.text("Thank you for choosing Prescripto. Get well soon!", 10, 280, {
      align: "left",
    });
  };

  const handleDownloadPdf = (prescription) => {
    const pdf = new jsPDF("p", "mm", "a4"); // Create a new PDF in A4 size
  
    // Create the PDF template
    createPdfTemplate(pdf, prescription);
  
    // Save the PDF
    pdf.save(`prescription-${prescription._id}.pdf`);
  };

  return (
    <div className="min-h-screen p-6">
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
                <div className="p-6" id={`prescription-${prescription._id}`}>
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
                <div className="p-4 border-t border-gray-200">
                  <button
                    onClick={() => handleDownloadPdf(prescription)}
                    className="w-full flex items-center justify-center px-4 py-2 bg-[#5f6FFF] text-white rounded-lg hover:bg-[#5f6FFF] transition-colors duration-300"
                  >
                    <FaDownload className="mr-2" /> Download as PDF
                  </button>
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