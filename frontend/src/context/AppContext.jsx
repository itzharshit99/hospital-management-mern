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


  const value = {
    doctors,getDoctorsData,
    currencySymbol,token,setToken,
    backendUrl,userData,setuserData,loadUserProfileData,
    medicalCamps,getMedicalCamps
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
  
  
  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )

}
export default AppContextProvider;