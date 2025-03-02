import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile";
import MyAppointments from "./pages/MyAppointments";
import Appointments from "./pages/Appointment";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import Payments from "./pages/Payments";
import Feedback from "./pages/Feedback";
import HealthCamps from "./pages/HealthCamps";
import UpcomingCall from "./pages/UpcomingCall";
import Prescription from "./pages/Prescription";

const App = () => {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
        <Route path="/appointment/:docId" element={<Appointments />} />
        <Route path="/payments" element={<Payments/>} />
        <Route path="/feedback" element={<Feedback/>} />
        <Route path="/health-camps" element={<HealthCamps/>} />
        <Route path="/upcoming-call" element={<UpcomingCall/>} />
        <Route path="/prescription" element={<Prescription/>} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
