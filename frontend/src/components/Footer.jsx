import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img className="mb-5 w-40" src={assets.logo} alt="logo" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            we are committed to providing top-quality medical care and seamless
            healthcare management through innovative technology. Our hospital
            management system ensures efficient appointment scheduling, medical
            record management.
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">Company</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Home</li>
            <li>About Us</li>
            <li>Contact us</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">Get in Touch</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Address: 1234 Delhi</li>
            <li>+1234567890</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-sm text-center">© 2025 Kalpanik. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
