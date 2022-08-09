import React, { useState } from 'react'
import Navbar from '../../../components/navbar/Navbar'
import Sidebar from '../../../components/sidebar/Sidebar'
import { SideBarDataStd } from "../../../components/sidebar/SideBarData"
import "./certificate.scss"

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import axios from "axios"
import { useContext } from "react"
import { AuthContext } from "../../../context/AuthContext"
import CreateIcon from '@mui/icons-material/Create';



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

                        <div className="buttons">
                            <div className="buttonDetails" key="1">
                                <div className="editButton" >
                                    <span onClick={() => setShow(true)}> <CreateIcon className='icon'/> Write Application</span>
                                </div>
                            </div>
                        </div>

                        <div className="list-boxOutter">

                        <div className="listBox">
                            <h2>Already Approved</h2>

                            <List style={{maxHeight: '100%', overflow: 'auto', height: '110px'}} >
                                <div class="list-boxInner"> 
                                    <ListItem>
                                        <ListItemButton >
                                        <ListItemText primary="Sports certificate 1"/>
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem >
                                        <ListItemButton>
                                        <ListItemText primary="Sports certificate 2" />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem >
                                        <ListItemButton>
                                        <ListItemText primary="Sports certificate 3" />
                                        </ListItemButton>
                                    </ListItem>
                                </div>
                            </List>
                        </div>

                        <div className="listBox">
                            <h2>Waiting for Approval</h2>

                            <List style={{maxHeight: '100%', overflow: 'auto', height: '110px'}} >
                                <div class="list-boxInner"> 
                                    <ListItem>
                                        <ListItemButton >
                                        <ListItemText primary="Sports certificate 1"/>
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem >
                                        <ListItemButton>
                                        <ListItemText primary="Sports certificate 2" />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem >
                                        <ListItemButton>
                                        <ListItemText primary="Sports certificate 3" />
                                        </ListItemButton>
                                    </ListItem>
                                </div>
                            </List>
                        </div>

                        <div className="listBox">
                            <h2>All Applications</h2>

                            <List style={{maxHeight: '100%', overflow: 'auto', height: '110px'}} >
                                <div class="list-boxInner"> 
                                    <ListItem>
                                        <ListItemButton >
                                        <ListItemText primary="Sports certificate 1"/>
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem >
                                        <ListItemButton>
                                        <ListItemText primary="Sports certificate 2" />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem >
                                        <ListItemButton>
                                        <ListItemText primary="Sports certificate 3" />
                                        </ListItemButton>
                                    </ListItem>
                                </div>
                            </List>
                        </div>

                    </div>

                    </div>
                    
                </div>
            </div>
        </div>
    )

}

export default Certificate;