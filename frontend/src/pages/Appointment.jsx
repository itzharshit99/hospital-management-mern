import React from "react";
import {useParams} from "react-router-dom";
import {AppContext} from "../context/AppContext"

const Appointments = () => {
  const {docId}=useParams();
  const {doctors}=useContext(AppContext);
  return <div>

  
   new Appointments</div>;
};

export default Appointments;
