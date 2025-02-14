import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext.jsx'
import { useEffect } from 'react';

const Dashboard = () => {
  const {aToken,getDashData,dashData} = useContext(AdminContext); // cancelAppointment
  useEffect(()=>{
    if(aToken){
      getDashData()
    }

  },[aToken])
  return (
    <div>

    </div>
  )
}

export default Dashboard