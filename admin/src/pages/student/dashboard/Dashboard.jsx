import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined"
import EditIcon from '@mui/icons-material/Edit'
import React, { useState } from 'react'
import Navbar from '../../../components/navbar/Navbar'
import Popup from '../../../components/popup/Popup'
import Sidebar from '../../../components/sidebar/Sidebar'
import { SideBarDataStd } from "../../../components/sidebar/SideBarData"
import "./dashboard.scss"

import { profileData } from "./../dashboard/dashboardData"

import { useContext } from "react"
import { AuthContext } from "../../../context/AuthContext"
import axios from "axios";


const DashboardStd =  () => {
 // const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [file, setFile] = useState("");
  
  
  
  const { user } = useContext(AuthContext);
  console.log("sdfs ",user.username);//data.username);

  const [credentials] = useState({
    username: user.username
  });

  try{
    const res =  axios.post("/auth/showData", credentials);

    //dispatch({ payload: res.data.details });
  
     console.log("KOCHU  ");
     console.log("BAL ",res.data," ",user.username," ",user._id)
  } catch(err) {
    console.log(err);
  }
  
  const [credentials2, setCredentials2] = useState({
    id: user._id,
    username: user.username,
    email: undefined,
    phone: undefined,
    present_address: undefined,
    permanent_address: undefined,
  });

  const handleChange = (e) => {
    setCredentials2((prev) => ({ ...prev, [e.target.id]: e.target.value }));

  };

  const handleClick = async (e) => {
    e.preventDefault();
    console.log(e);/////////////
 

    var url = "/students/"+user._id;
    console.log("URL ",url)
    try {
      const res = await axios.put(url, credentials2);
    
        console.log("VCVCccccccccccccc ",res.data)

        console.log("logindwcwfff ",res.data.details);///////////
 
    } catch (err) {
      console.log(err)
    }
  };
   
  return (
    <div className='dashboard'>
        <Sidebar info={SideBarDataStd}/>
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
                  <span className="itemKey">Student Id : </span>
                  <span className="itemValue">{user.studentID}</span>
                </div>
                <div className="detailItem" key = "2">
                  <span className="itemKey">Email : </span>
                  <span className="itemValue">{user.email}</span>
                </div>
                <div className="detailItem" key = "3">
                  <span className="itemKey">Phone : </span>
                  <span className="itemValue">{user.phone}</span>
                </div>
                <div className="detailItem" key = "4">
                  <span className="itemKey">Address : </span>
                  <span className="itemValue">{user.present_address}</span>
                </div>
                <div className="detailItem" key = "5">
                  <span className="itemKey">Level-Term : </span>
                  <span className="itemValue">{user.level}-{user.term}</span>
                </div>
                <div className="detailItem" key = "6">
                  <span className="itemKey">Room No : </span>
                  <span className="itemValue">{user.roomNo}</span>
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
                      // "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
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
                    <label>Permanent Address : </label>
                    <input type='text' placeholder={user.permanent_address} id="permanent_address" onChange={handleChange} />
                  </div>

                  <button onClick={handleClick}>Send</button>

                  </div>
                </form>
              </div>
            </div>
            </div>
          </Popup>
          </div>
        </div>
        </div>
    </div>
  )
}

export default DashboardStd