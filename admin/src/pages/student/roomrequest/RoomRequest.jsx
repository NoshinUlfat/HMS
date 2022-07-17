import React from 'react'
import Navbar from '../../../components/navbar/Navbar'
import Sidebar from '../../../components/sidebar/Sidebar'
import { SideBarDataStd } from "../../../components/sidebar/SideBarData"
import "./roomrequest.scss"
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

const RoomRequest = () => {
  return (
    <div className='roomRequest'>
        <Sidebar info={SideBarDataStd}/>
        <div className="roomRequestContainer">
          <Navbar/>
          <form action="#" method="post">
            <label htmlFor="rooms">Preferred Room No(Optional): </label>
            <input type="text" id='rooms' placeholder="Available Rooms"/>
            <label htmlFor="textarea">Why do you need this room?</label>
            <textarea name="" id="textarea" cols="500" rows="20" placeholder='Application'></textarea>

            <div className="skills">
              <p>Skills</p>
              <div className="left">
                <div className="skill">
                  <label htmlFor="sport">Sports</label>
                  <input type="checkbox" name="" id="sport" />
                </div>

                <div className="skill">
                  <label htmlFor="debate">Debate</label>
                  <input type="checkbox" name="" id="debate" />
                </div>

                <div className="skill">
                  <label htmlFor="acting">Acting</label>
                  <input type="checkbox" name="" id="acting" />
                </div>

                <div className="skill">
                  <label htmlFor="others">Others</label>
                  <input type="checkbox" name="" id="others" />
                </div>
              </div>
              <div className="right">
                <label htmlFor="file">
                        Attach Your Achivements(PDFs): <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  style={{ display: "none" }}
                />
              </div>
            </div>

            <button type="submit">Submit Application</button>
          </form>
        </div>
    </div>
  )
}

export default RoomRequest