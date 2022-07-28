import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined"
import EditIcon from '@mui/icons-material/Edit'
import React, { useState } from 'react'
import Navbar from '../../../components/navbar/Navbar'
import Popup from '../../../components/popup/Popup'
import Sidebar from '../../../components/sidebar/Sidebar'
import { SideBarDataStd } from "../../../components/sidebar/SideBarData"
import "./service.scss";

import { useContext } from "react"
import { AuthContext } from "../../../context/AuthContext"
import axios from "axios";
import ElectricMeterIcon from '@mui/icons-material/ElectricMeter';
import WifiIcon from '@mui/icons-material/Wifi';
import CarpenterIcon from '@mui/icons-material/Carpenter';
import ConstructionIcon from '@mui/icons-material/Construction';

const Service =  () => {

    // const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [file, setFile] = useState("");
  
  
  
  const { user } = useContext(AuthContext);
  
  
  const [credentials, setCredentials] = useState({
    id: user._id,
    username: user.username,
  });

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));

  };

  const handleClick = async (e) => {
    e.preventDefault();
    console.log(e);/////////////
 

    var url = "/students/"+user._id;
    console.log("URL ",url)
    try {
      const res = await axios.put(url, credentials);
 
    } catch (err) {
      console.log(err)
    }
  };

    return (
        <div className='service'>
           <Sidebar info={SideBarDataStd}/>

            <div className="serviceContainer">
                <Navbar/>

                <div className="top">
                    <div className="left">
                        <div className="buttons">
                            <div className="buttonDetails" key="1">
                                <div className="editButton" >
                                    <span onClick={() => setShow(true)}> <ElectricMeterIcon className='icon'/> Electrician Service</span>
                                </div>
                            </div>
                            <div className="buttonDetails" key="2">
                                <div className="editButton" >
                                    <span onClick={() => setShow(true)}> <WifiIcon className='icon'/> Wifi Service</span>
                                </div>
                            </div>
                            <div className="buttonDetails" key="3">
                                <div className="editButton" >
                                    <span onClick={() => setShow(true)}> <CarpenterIcon className='icon'/> Carpenting Service</span>
                                </div>
                            </div>
                            <div className="buttonDetails" key="4">
                                <div className="editButton" >
                                    <span onClick={() => setShow(true)}> <ConstructionIcon className='icon'/> Renovation </span>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="right">
                    <Popup show={show} onClose={() => setShow(false)} className= "popup">
                        {/* <h1>Hello</h1> */}
                    <div className="insidePop">
                        <div className="top">
                         <h1>Renovation</h1>    {/* ..............CHANGE THE TITLE ACCORDING TO SELECTION HOOMAN.............. */}
                        </div>
                        <div className="bottom">
                        
                        <div className="right">
                            <form>
                            <div className="formInput">
                              
                                <div className="detailItem" key = "1">
                                    <label htmlFor="message"><b>Write Your Complaint Here</b></label>
                                    <textarea name="" id="message" cols="80" rows="12" placeholder='Application' ></textarea>
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

export default Service;