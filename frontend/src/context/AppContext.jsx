import { createContext } from "react";
import axios from 'axios'
import { useState } from "react";
import { useEffect } from "react";
import {toast} from 'react-toastify'
export const AppContext = createContext()
const AppContextProvider = (props)=>{
  const currencySymbol = '₹'
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [doctors,setDoctors] = useState([])
  const [medicalCamps, setMedicalCamps] = useState([]);
  const [token,setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):false);
  const [userData,setuserData] = useState(false)
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  
  const getDoctorsData = async ()=>{
    try {
      const {data} = await axios.get(backendUrl + '/api/doctor/list')
      if(data.success){
        setDoctors(data.doctors)
      }
      else{
        toast.error(error.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const loadUserProfileData = async ()=>{
    try {
      const {data} = await axios.get(backendUrl+'/api/user/get-profile',{headers:{token}})
      if(data.success){
        setuserData(data.userData);
      }
      else{
        toast.error(data.message)
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }
  const getMedicalCamps = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/get-camps",{headers:{token}});
      console.log(data);
      if (data.success) {
        setMedicalCamps(data.camps);
      } else {
        toast.error("Failed to load medical camps");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const getAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { token },
      });
      if (data.success) {
        setAppointments(data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error fetching appointments");
    }
  };
  const getPrescriptions = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/get-prescription",{headers:{token}});
      console.log(data)
      
      if (data.success) {
        setPrescriptions(data.prescriptions);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching prescriptions:", error);
      toast.error("Error fetching prescriptions");
    }
  };


  const value = {
    doctors,getDoctorsData,
    currencySymbol,token,setToken,
    backendUrl,userData,setuserData,loadUserProfileData,
    medicalCamps,getMedicalCamps,getAppointments,appointments,setAppointments,getPrescriptions,prescriptions,setPrescriptions
  }
  useEffect(()=>{
    getDoctorsData()
  },[])
  useEffect(()=>{
    if(token){
      loadUserProfileData()
    }else{
      setuserData(false)
    }
  },[token])

  useEffect(() => {
    getMedicalCamps();
  }, []);
  useEffect(() => {
    getAppointments();
  }, []);
  
  useEffect(() => {
    if (token) {
      getPrescriptions();
    }
  }, [token])
  
  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )

}
export default AppContextProvider;