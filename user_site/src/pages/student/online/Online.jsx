import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined"
import EditIcon from '@mui/icons-material/Edit'
import React, { useState } from 'react'
import Navbar from '../../../components/navbar/Navbar'
import Popup from '../../../components/popup/Popup'
import Sidebar from '../../../components/sidebar/Sidebar'
import { SideBarDataStd } from "../../../components/sidebar/SideBarData"
import "./online.scss"

import { profileData } from "./../dashboard/dashboardData"

import { useContext } from "react"
import { AuthContext } from "../../../context/AuthContext"
import axios from "axios";


const DashboardStd =  () => {

   
  return (
    <div className='online'>
        <Sidebar info={SideBarDataStd}/>
        <div className="onlineContainer">
            <Navbar/>
            <div className="top">
                <div className="left">
                
                </div>
                <div className="right">
                
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default DashboardStd