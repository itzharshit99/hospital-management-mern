import nodemailer from 'nodemailer';
import userModel from '../models/usermodel.js';
import dotenv from 'dotenv';
dotenv.config();
const sendMedicalCampEmails = async (emailList, campName, date, location, details,time) => {
  try {
      // Set up transporter
      const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
              user: process.env.MY_EMAIL, // Replace with your email
              pass: process.env.MY_PASSWORD, // Use an app password
          },
      });

      // Format email content in HTML
      const emailHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px;">
          <h2 style="color: #2c3e50;">📢 Upcoming Medical Camp Notification</h2>
          <p>Dear User,</p>
          <p>We are excited to invite you to our upcoming medical camp.</p>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <tr>
                  <td style="padding: 8px; border: 1px solid #ddd;"><strong>📅 Date:</strong></td>
                  <td style="padding: 8px; border: 1px solid #ddd;">${date}</td>
              </tr>
              <tr>
                  <td style="padding: 8px; border: 1px solid #ddd;"><strong>📍 Location:</strong></td>
                  <td style="padding: 8px; border: 1px solid #ddd;">${location}</td>
              </tr>
              <tr>
                  <td style="padding: 8px; border: 1px solid #ddd;"><strong>🏥 Camp Name:</strong></td>
                  <td style="padding: 8px; border: 1px solid #ddd;">${campName}</td>
              </tr>
              <tr>
                  <td style="padding: 8px; border: 1px solid #ddd;"><strong>ℹ️ Details:</strong></td>
                  <td style="padding: 8px; border: 1px solid #ddd;">${details}</td>
              </tr>
              <tr>
                  <td style="padding: 8px; border: 1px solid #ddd;"><strong>🕧 Time:</strong></td>
                  <td style="padding: 8px; border: 1px solid #ddd;">${time}</td>
              </tr>
          </table>
          <p style="margin-top: 20px;">We look forward to seeing you there! Feel free to reach out for any queries.</p>
          <p><strong>Best Regards,<br>Prescripto Team</strong></p>
      </div>`;

      // Email options
      const mailOptions = {
          from: "iharshitjain99@gmail.com",
          to: emailList,
          subject: "📢 Upcoming Medical Camp Notification",
          html: emailHtml, // Use HTML instead of plain text
      };

      // Send emails
      await transporter.sendMail(mailOptions);
      console.log("Emails sent successfully");
  } catch (error) {
      console.error("Error sending emails:", error);
  }
};


export default sendMedicalCampEmails;