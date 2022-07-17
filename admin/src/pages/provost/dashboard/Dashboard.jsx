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

import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

const DashboardProvost = () => {
  const [show, setShow] = useState(false);
  const [file, setFile] = useState("");

  const { user } = useContext(AuthContext);
    console.log(user.username);
  

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
                src= {profileData.profileImg}
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{profileData.profileTitle}</h1>
                {
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
                }
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
                      : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
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

                  {                  
                  profileData.profileData.map(
                    (item,index) => {
                      return (
                      <div className="detailItem" key = {index}>
                        <label>{item.title} : </label>
                        <input type={item.type} placeholder={item.content} />
                      </div>
                      );
                    })
                  }
                  <button>Send</button>
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