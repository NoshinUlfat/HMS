import React, { useState } from 'react'
import Navbar from '../../../components/navbar/Navbar'
import Sidebar from '../../../components/sidebar/Sidebar'
import { SideBarDataProvost } from "../../../components/sidebar/SideBarData"
import "./assignNotice.scss"
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import axios from "axios";


import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { Alert } from '@mui/material';

const AssignNotice =  () => {
    const [file, setFile] = useState("");
    const [info, setInfo] = useState({});
    const [success, setSuccess] = useState(false);
    const [fail, setFail] = useState(false);
    
    const { user } = useContext(AuthContext);

    var urlConnection = "/notices/assignNotices";/////////////////////////////////
    console.log("URL ",urlConnection)
  
    console.log("ID CHECK",user.username)
  
    const handleChangeText = (e) => {
      setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
      console.log(info)
    };
  
    const handleChangeCheckBox = (e) => {
      setInfo((prev) => ({ ...prev, [e.target.id]: e.target.checked }));
      console.log(info)
    };
    const handleClick = async (e) => {
      e.preventDefault();
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "upload");
       try {
        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/lamadev/image/upload",
          data
        );
        
        const { url } = uploadRes.data;
        const newRequest = {
           ...info,
        //   file: url,
        //   studentId: user.studentId,
        //   approvalStatus: "pending",
        };
  
        console.log("Bla")
        console.log(newRequest)
        console.log("DCDC ".urlConnection)
        const res = await axios.post(urlConnection, newRequest);
      
        //console.log(uploadRes.data)
        setInfo({title:"",noticeType:"",description:""})
      
        setSuccess(true);
        
      }
      catch {
        console.log("Error Asche")
        setFail(true);
      }
    };
   
  return (
    <div className='assignNotice'>
        <Sidebar info={SideBarDataProvost}/>
        <div className="assignNoticeContainer">
          <Navbar/>
          <form action="#" method="post">
            <br></br>
            <label htmlFor="title">Title: </label>
            <input type="text" id='title' value={info.title} placeholder="Title" onChange={handleChangeText}/>

            <label htmlFor="noticeType">Notice Type: </label>
            <input type="text" id='noticeType' value={info.noticeType} placeholder="Title" onChange={handleChangeText}/>
            
            <label htmlFor="description">Description</label>
            <textarea name="" id="description" value={info.description} cols="500" rows="15" placeholder='description' onChange={handleChangeText}></textarea>

            
              <div className="left">
                

              </div>
              <div className="right">
                <label htmlFor="file">
                        Attach PDF: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file" 
                  onChange={(e) => setFile(e.target.files[0])}
                  // style={{ display: "none" }}
                />
              </div>
            

            <button type="submit" onClick={handleClick}>Send Notice</button>

            {success?<Alert severity="success">Notice Sent Successfully</Alert>:<></>}
            {fail?<Alert variant="filled" severity="error">
              Submit failed
            </Alert>:<></>}
          </form>
        </div>
    </div>
  )
}

export default AssignNotice