import React, { useState } from 'react'
import Navbar from '../../../components/navbar/Navbar'
import Sidebar from '../../../components/sidebar/Sidebar'
import "./dashboard.scss"
import { SideBarDataProvost } from "../../../components/sidebar/SideBarData"
import Progressbar from '../../../components/progressbar/Progressbar'
import {rommRequestProgress,cirtificateReqProcess } from '../../../components/progressbar/progressbarData'
import Popup from '../../../components/popup/Popup'
import EditIcon from '@mui/icons-material/Edit';
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

import {profileData} from "./../dashboard/dashboardData"

import { useContext } from "react"
import { AuthContext } from "../../../context/AuthContext"
import axios from "axios";

const DashboardProvost = () => {
  const [show, setShow] = useState(false);
  const [file, setFile] = useState("");
  
  
  
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
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));

  };

  const handleClick = async (e) => {
    e.preventDefault();
    console.log(e);/////////////
 

    var url = "/provosts/"+user._id;
    console.log("URL ",url)
    try {
      const res = await axios.put(url, credentials);
    
        console.log("VCVCccccccccccccc ",res.data)

        console.log("logindwcwfff ",res.data.details);///////////
 
    } catch (err) {
      console.log(err)
    }
  };
  

  return (
    <div className='dashboard'>
        <Sidebar info={SideBarDataProvost}/>
        <div className="dashboardContainer">
          <Navbar/>
          <div className="top">
          <div className="left">
            <div className="editButton">
              <span onClick={() => setShow(true)}><EditIcon className='icon'/> Edit</span>
            </div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src= {user.img}
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{user.username}</h1>
                {/* {
                  profileData.profileData.map(
                    (item,index) => {
                      return (
                      <div className="detailItem" key = {index}>
                        <span className="itemKey">{item.title} : </span>
                        <span className="itemValue">{item.content}</span>
                      </div>
                      );
                    }
                  )
                } */}

                
                <div className="detailItem" key = "1">
                  <span className="itemKey">Email : </span>
                  <span className="itemValue">{user.email}</span>
                </div>
                <div className="detailItem" key = "2">
                  <span className="itemKey">Phone : </span>
                  <span className="itemValue">{user.phone}</span>
                </div>
                <div className="detailItem" key = "3">
                  <span className="itemKey">Address : </span>
                  <span className="itemValue">{user.present_address}</span>
                </div>
                <div className="detailItem" key = "4">
                  <span className="itemKey">Post : </span>
                  <span className="itemValue">{user.post}</span>
                </div>
                <div className="detailItem" key = "5">
                  <span className="itemKey">Dept : </span>
                  <span className="itemValue">{user.department}</span>
                </div>
                <div className="detailItem" key = "6">
                  <span className="itemKey">Designation : </span>
                  <span className="itemValue">{user.designation}</span>
                </div>


              </div>
            </div>
          </div>
          <div className="right">
          <Popup show={show} onClose={() => setShow(false)} className= "popup">
            {/* <h1>Hello</h1> */}
          <div className="insidePop">
            <div className="top">
              <h1>Update Profile</h1>
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
          </Popup>
          </div>
        </div>
        <div className="bottom">
          <div className='progressbar'>
            <h1 className="title">Room Applications</h1>
            <Progressbar info={rommRequestProgress}/>
          </div>
          <div className='progressbar'>
            <h1 className="title">Cirtificate Applications</h1>
            <Progressbar  info={cirtificateReqProcess}/>
          </div>
        </div>
        </div>
    </div>
  )
}

export default DashboardProvost