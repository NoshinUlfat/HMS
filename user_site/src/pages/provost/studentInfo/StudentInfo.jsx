import React, { useState } from 'react'
import Navbar from '../../../components/navbar/Navbar'
import Sidebar from '../../../components/sidebar/Sidebar'
import "./studentInfo.scss"
import { SideBarDataProvost } from "../../../components/sidebar/SideBarData"
import Progressbar from '../../../components/progressbar/Progressbar'
import {rommRequestProgress,cirtificateReqProcess } from '../../../components/progressbar/progressbarData'
import Popup from '../../../components/popup/Popup'
import EditIcon from '@mui/icons-material/Edit';
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

import {profileData} from "./../dashboard/dashboardData"
import Typography from '@mui/material/Typography';

import { useContext } from "react"
import { AuthContext } from "../../../context/AuthContext"
import axios from "axios";

const DashboardProvost = () => {
  const [show, setShow] = useState(false);
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const [data, setData] = useState([]);
  const [isShow, setIsShow] = useState(false);
  
  
  
  const { user } = useContext(AuthContext);
  console.log("sdfs ",user.username);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));

  };

  const handleChangeText = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    console.log(info)
  };

  const handleClick = async (e) => {
    e.preventDefault();
    console.log("PLEASE  ",info.studentId);/////////////
 
    const data = new FormData();
    data.append("upload_preset", "upload");

    var main_url = "/students/findOne";
    const newRequest = {
      studentId: info.studentId,
    };
      
    const res = await axios.post(main_url, newRequest);
    
    console.log("res ",res.data);
    setData(res.data);
    setIsShow(true);
     
  };
  

  return (
    <div className='studentInfo'>
        <Sidebar info={SideBarDataProvost}/>
        <div className="studentInfoContainer">
          <Navbar/>
          <div className="top">
          
          <div className="right">
            <div className="insidePop">
              <div className="top">
                <div className="form-box">
                  <form action="#" method="post">
                    <label htmlFor="studentId">Enter Student ID: </label>
                    <input type="text" id='studentId' value={info.studentId} placeholder="Student ID" onChange={handleChangeText}/>
                  
                    <button type="submit" onClick={handleClick}>Enter</button>

                  </form>  
                </div>
                
              </div>   

              {isShow?
              <div className="bottom">
                <div className="left">
                  <img
                    src={
                      file
                        ? URL.createObjectURL(file)
                        : data.img
                        //"https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                    }
                    alt=""
                  />
                </div>
                <div className="right">
                  <div className = "showData">
                    <Typography type="body2" style={{ fontWeight: 'bold', fontSize: '18px', color: 'black' }}>
                      <span>Student ID : <span style={{color: 'gray', fontSize: '15px'}}>{data.studentId}</span></span>
                    </Typography>
                    <Typography type="body2" style={{ fontWeight: 'bold', fontSize: '18px', color: 'black' }}>
                      <span>Level-Term : <span style={{color: 'gray', fontSize: '15px'}}>{data.level}-{data.term}</span></span>
                    </Typography>
                    <Typography type="body2" style={{ fontWeight: 'bold', fontSize: '18px', color: 'black' }}>
                      <span>CGPA : <span style={{color: 'gray', fontSize: '15px'}}>{data.cgpa}</span></span>
                    </Typography>
                    <Typography type="body2" style={{ fontWeight: 'bold', fontSize: '18px', color: 'black' }}>
                      <span>Room Number : <span style={{color: 'gray', fontSize: '15px'}}>{data.roomNo}</span></span>
                    </Typography>
                    <Typography type="body2" style={{ fontWeight: 'bold', fontSize: '18px', color: 'black' }}>
                      <span>Email : <span style={{color: 'gray', fontSize: '15px'}}>{data.email}</span></span>
                    </Typography>
                    <Typography type="body2" style={{ fontWeight: 'bold', fontSize: '18px', color: 'black' }}>
                      <span>Phone Number : <span style={{color: 'gray', fontSize: '15px'}}>{data.phone}</span></span>
                    </Typography>
                    <Typography type="body2" style={{ fontWeight: 'bold', fontSize: '18px', color: 'black' }}>
                      <span>Present Address : <span style={{color: 'gray', fontSize: '15px'}}>{data.present_address}</span></span>
                    </Typography>
                    <Typography type="body2" style={{ fontWeight: 'bold', fontSize: '18px', color: 'black' }}>
                      <span>Permanent Address : <span style={{color: 'gray', fontSize: '15px'}}>{data.permanent_address}</span></span>
                    </Typography>
                  </div>
        
                </div>
            </div>
            :<></>} 
            </div>
            
          </div>
        </div>
       
        </div>
    </div>
  )
}

export default DashboardProvost