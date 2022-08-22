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
  
  
  
  const { user } = useContext(AuthContext);
  console.log("sdfs ",user.username);//data.username);
  
  const [credentials, setCredentials] = useState({
    id: user._id,
    username: user.username,
    email: undefined,
    phone: undefined,
    present_address: undefined,
    post: undefined,
    department: undefined,
    designation: undefined,
  });

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));

  };

  const handleClick = async (e) => {
    e.preventDefault();
    console.log(e);/////////////
 
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");

    var main_url = "/provosts/"+user._id;
    console.log("URL ",main_url)
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/lamadev/image/upload",
        data
      );

      const { url } = uploadRes.data;
      const newRequest = {
        ...info,
        img: url,
      };
      
      const res = await axios.put(main_url, newRequest);
    
      console.log("VCVCccccccccccccc ",res.data)

      console.log("logindwcwfff ",res.data.details);///////////
 
    } catch (err) {
      console.log(err)
    }
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
              <div className="id_box">
                <Typography type="body2" style={{ color: 'black', fontWeight: 'bold', fontSize: '20px' }}>
                  Enter Student ID
                </Typography>
                <input
                  type="student_id"
                  placeholder="Enter Student ID"
                  id="student_id"
                  onChange={handleChange}
                  className="sInput"
                />
                <button onClick={handleClick}>Search</button></div>
              </div>
            <div className="bottom">
              <div className="left">
                <img
                  src={
                    file
                      ? URL.createObjectURL(file)
                      : user.img
                      //"https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                  }
                  alt=""
                />
              </div>
              <div className="right">
                <form>
                  <div className="formInput">
                    <label htmlFor="file">
                      Image: <DriveFolderUploadOutlinedIcon className="icon" />
                    </label>
                    <input
                      type="file"
                      id="file"
                      onChange={(e) => setFile(e.target.files[0])}
                      style={{ display: "none" }}
                    />

                  {/* {                  
                  profileData.profileData.map(
                    (item,index) => {
                      return (
                      <div className="detailItem" key = {index}>
                        <label>{item.title} : </label>
                        <input type={item.type} placeholder={item.content} />
                      </div>
                      );
                    })
                  } */}

                  <div className="detailItem" key = "1">
                    <label>Email : </label>
                    <input type='Email' placeholder={user.email} id="email" onChange={handleChange}/>
                  </div>
                  <div className="detailItem" key = "2">
                    <label>Phone : </label>
                    <input type='text' placeholder={user.phone} id="phone" onChange={handleChange} />
                  </div>
                  <div className="detailItem" key = "3">
                    <label>Present Address : </label>
                    <input type='text' placeholder={user.present_address} id="present_address" onChange={handleChange} />
                  </div>
                  <div className="detailItem" key = "4">
                    <label>Post : </label>
                    <input type='text' placeholder={user.post} id="post" onChange={handleChange} />
                  </div>
                  <div className="detailItem" key = "5">
                    <label>Department : </label>
                    <input type='text' placeholder={user.department} id="department" onChange={handleChange} />
                  </div>
                  <div className="detailItem" key = "6">
                    <label>Designation : </label>
                    <input type='text' placeholder={user.designation} id="designation" onChange={handleChange} />
                  </div>

                  <button onClick={handleClick}>Save</button>
                  </div>
                </form>
              </div>
            </div>
            </div>
          </div>
        </div>
       
        </div>
    </div>
  )
}

export default DashboardProvost