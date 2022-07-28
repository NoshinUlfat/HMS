import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined"
import EditIcon from '@mui/icons-material/Edit'
import React, { useState } from 'react'
import Navbar from '../../../components/navbar/Navbar'
import Popup from '../../../components/popup/Popup'
import Sidebar from '../../../components/sidebar/Sidebar'
import { SideBarDataStd } from "../../../components/sidebar/SideBarData"
import "./certificate.scss";

import { useContext } from "react"
import { AuthContext } from "../../../context/AuthContext"
import axios from "axios";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


const Certificate =  () => {

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
        <div className='certificate'>
           <Sidebar info={SideBarDataStd}/>

            <div className="certificateContainer">
                <Navbar/>
                
                <div className="top">
                    <div className="left">
                        <div className="listBox">
                            
                                <List style={{maxHeight: '100%', overflow: 'auto', height: '100px'}} >
                                    <ListItem>
                                    <div className="listBox-Details" key="1">
                                        <div className="listItem-box">APP 1</div>
                                        </div>
                                    </ListItem>
                                    <ListItem >
                                        <ListItemButton>
                                        <ListItemIcon>
                                            {/* <DraftsIcon /> */}
                                        </ListItemIcon>
                                        <ListItemText primary="Drafts" />
                                        </ListItemButton>
                                    </ListItem>
                                </List>
                            
                            <div className="buttonDetails" key="2">
                                
                            </div>
                            <div className="buttonDetails" key="3">
                                
                            </div>
                            <div className="buttonDetails" key="4">
                                
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
                                    <label htmlFor="message"><b>Application</b></label>
                                    <textarea name="" id="message" cols="80" rows="12" placeholder='Write Your Complaint Here' ></textarea>
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

export default Certificate;