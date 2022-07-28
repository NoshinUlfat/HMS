import React, { useState } from 'react'
import Navbar from '../../../components/navbar/Navbar'
import Sidebar from '../../../components/sidebar/Sidebar'
import { SideBarDataStd } from "../../../components/sidebar/SideBarData"
import "./roomrequest.scss"
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import axios from "axios";


import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";


const RoomRequest = () => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  
  const { user } = useContext(AuthContext);
  var urlConnection = "/roomAllotments/"+user.studentId;
  console.log("URL ",urlConnection)

  console.log("ID CHECK",user.studentId)

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
        file: url,
        studentId: user.studentId,
        approvalStatus: "pending",
      };

      console.log("Bla")
      console.log(newRequest)
      console.log("DCDC ".urlConnection)
      const res = await axios.post(urlConnection, newRequest);
    
      console.log(uploadRes.data)
      
    }
    catch {
      console.log("Error Asche")
    }
  };
  return (
    <div className='roomRequest'>
        <Sidebar info={SideBarDataStd}/>
        <div className="roomRequestContainer">
          <Navbar/>
          <form action="#" method="post">
            <br></br>
            <label htmlFor="preferredRoomNo">Preferred Room No(Optional): </label>
            <input type="text" id='preferredRoomNo' placeholder="Available Rooms" onChange={handleChangeText}/>
            
            <label htmlFor="message">Why do you need this room?</label>
            <textarea name="" id="message" cols="500" rows="15" placeholder='Application' onChange={handleChangeText}></textarea>

            <div className="skills">
              <p>Skills</p>
              <div className="left">
                <div className="skill">
                  <label htmlFor="sports">Sports
                  <input type="checkbox" name="" id="sports" onChange={handleChangeCheckBox}/>
                  </label>
                </div>

                <div className="skill">
                  <label htmlFor="debate">Debate
                  <input type="checkbox" name="" id="debate" onChange={handleChangeCheckBox}/>
                  </label>
                </div>

                {/* <div className="skill">
                  <label htmlFor="acting">Acting
                  <input type="checkbox" name="" id="acting" onChange={handleChangeCheckBox}/>
                  </label>
                </div> */}

                <div className="skill">
                  <label htmlFor="other">Others
                  <input type="checkbox" name="" id="other" onChange={handleChangeCheckBox}/>
                  </label>
                </div>
              </div>
              <div className="right">
                <label htmlFor="file">
                        Attach Your Achivements(PDFs): <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  // style={{ display: "none" }}
                />
              </div>
            </div>

            <button type="submit" onClick={handleClick}>Submit Application</button>
          </form>
        </div>
    </div>
  )
}

export default RoomRequest