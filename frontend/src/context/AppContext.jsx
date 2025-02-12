import { createContext } from "react";
import axios from 'axios'
import { useState } from "react";
import { useEffect } from "react";
import {doctors} from '../assets/assets'
//import {toast} from 'react-toastify'
export const AppContext = createContext()
const AppContextProvider = (props)=>{
  const currencySymbol='$'
  
  const value = {
    doctors,currencySymbol
    
  }
  
  
  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )

}
export default AppContextProvider;