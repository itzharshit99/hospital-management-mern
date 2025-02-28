import React from "react";
import { FaRegCreditCard } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { MdSecurity } from "react-icons/md";
import { BsBank, BsPaypal } from "react-icons/bs";
import { SiGooglepay, SiPhonepe, SiPaytm } from "react-icons/si";

const Payments = () => {
  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8 relative space-y-6">
        {/* Close Button */}
        <button className="absolute top-4 right-4 text-gray-500 hover:text-red-500">
          <IoMdClose size={24} />
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold text-center text-gray-800">Secure Payment</h2>

        {/* Payment Methods */}
        <div className="grid grid-cols-3 gap-3">
          <button className="flex flex-col items-center justify-center space-y-2 p-3 text-gray-700 bg-gray-200 rounded-lg hover:bg-blue-100">
            <FaRegCreditCard className="text-blue-600 text-xl" />
            <span className="text-sm">Card</span>
          </button>
          <button className="flex flex-col items-center justify-center space-y-2 p-3 text-gray-700 bg-gray-200 rounded-lg hover:bg-blue-100">
            <BsBank className="text-green-600 text-xl" />
            <span className="text-sm">Net Banking</span>
          </button>
          <button className="flex flex-col items-center justify-center space-y-2 p-3 text-gray-700 bg-gray-200 rounded-lg hover:bg-blue-100">
            <BsPaypal className="text-blue-600 text-xl" />
            <span className="text-sm">Wallet</span>
          </button>
          <button className="flex flex-col items-center justify-center space-y-2 p-3 text-gray-700 bg-gray-200 rounded-lg hover:bg-blue-100">
            <SiGooglepay className="text-blue-600 text-xl" />
            <span className="text-sm">GPay</span>
          </button>
          <button className="flex flex-col items-center justify-center space-y-2 p-3 text-gray-700 bg-gray-200 rounded-lg hover:bg-blue-100">
            <SiPhonepe className="text-purple-600 text-xl" />
            <span className="text-sm">PhonePe</span>
          </button>
          <button className="flex flex-col items-center justify-center space-y-2 p-3 text-gray-700 bg-gray-200 rounded-lg hover:bg-blue-100">
            <SiPaytm className="text-blue-600 text-xl" />
            <span className="text-sm">Paytm</span>
          </button>
        </div>

        {/* Payment Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Card Number</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 focus-within:border-blue-500">
              <FaRegCreditCard className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="w-full bg-transparent focus:outline-none"
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-600 mb-2">Expiry Date</label>
              <input
                type="text"
                placeholder="MM/YY"
                className="border border-gray-300 rounded-lg px-4 py-3 w-full bg-gray-50 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-600 mb-2">CVV</label>
              <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 focus-within:border-blue-500">
                <MdSecurity className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="123"
                  className="w-full bg-transparent focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Pay Button */}
        <button className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-3 rounded-lg hover:shadow-xl transition transform hover:scale-105">
          Pay ₹500.00
        </button>
      </div>
    </div>
  );
};

export default Payments;
