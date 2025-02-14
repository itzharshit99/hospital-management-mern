import { useState } from "react";
import { createContext } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'
export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(localStorage.getItem('aToken')? localStorage.getItem('aToken'):'');
  const [doctors,setDoctors] = useState([]);
  const [dashdata,setDashData] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const getAllDoctors = async ()=>{
    try {
      const {data} = await axios.post(backendUrl+'/api/admin/all-doctors',{},{headers:{aToken}})
      if(data.success){
        setDoctors(data.doctors);
        console.log(data.doctors)
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(data.message)
    }
  }
  const changeAvailability = async(docId)=>{
    try {
      const {data} = await axios.post(backendUrl+'/api/admin/change-availability',{docId},{headers:{aToken}})
      if(data.success){
        toast.success(data.message)
        getAllDoctors()
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(data.message)
    }
  }
  const getDashData = async ()=>{
    try {
      const {data} = await axios.get(backendUrl + '/api/admin/dashboard' + {headers:{aToken}})
      if(data.success){
        setDashData(data.dashdata)
        console.log(data.dashdata);
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  const value = {
    aToken,
    setAToken,
    backendUrl,
    doctors,
    getAllDoctors,
    changeAvailability,
    dashdata,
    getDashData,

  };
  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
