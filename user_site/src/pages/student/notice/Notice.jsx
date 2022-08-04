import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined"
import EditIcon from '@mui/icons-material/Edit'
import React, { useState, useEffect } from 'react'
import Navbar from '../../../components/navbar/Navbar'
import Popup from '../../../components/popup/Popup'
import Sidebar from '../../../components/sidebar/Sidebar'
import { SideBarDataStd } from "../../../components/sidebar/SideBarData"
import "./notice.scss"

import { profileData } from "./../dashboard/dashboardData"

import { useContext } from "react"
import { AuthContext } from "../../../context/AuthContext"
import axios from "axios";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';



const NoticeStd =  () => {
    const [id,setID] = useState(null)
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

   

    useEffect(() => {
      const fetchData = async () => {
      setLoading(true);
      try {
        // const res = axios.get("/roomAllotments");
      
        // console.log("VCVCccccccccccccc ",res.data)

        // console.log("logindwcwfff ",res.data.details);///////////
        const { data: response } = await axios.get("/notices");
        setData(response);

        console.log("VCVCccccccccccccc ",response);
  
      } catch (err) {
        console.log(err)
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  console.log("DATA ",data)
  console.log("LOAD ",loading)

  
   
  return (
    <div className='notice'>
        <Sidebar info={SideBarDataStd}/>
        <div className="noticeContainer">
            <Navbar/>
            <div className="top">
                <div className="left">

                <h1 className="title">Information </h1>
                {loading?"Loading":(
                <>
                <div>Notices</div>
                <div className="Ff">
                {data.map((student) => (
                <div className="studentId">{student.title} {student.noticeType} {student.description} {student.date} <p></p></div>
             
                ))}
                </div> 
                </>
                )}
                
                    {/* <List sx={{
                        width: '100%',
                        maxWidth: 360,
                        bgcolor: 'background.paper',
                        position: 'relative',
                        overflow: 'auto',
                        maxHeight: 300,
                        '& ul': { padding: 0 },
                    }}
                    subheader={<li />}
                    >
                        {loading?"Loading":(
                        <>
                            <div>Hello</div>
                            <div className="Ff">
                                {data.map((student) => (
                                <li key={`section-${student}`}>
                                <ul>
                                    <ListSubheader>{student._id}</ListSubheader>
                                    {/* {[0, 1, 2].map((item) => (
                                    <ListItem key={`item-${sectionId}-${item}`}>
                                        <ListItemText primary={`Item ${item}`} />
                                    </ListItem>
                                    ))} */}
                                {/* </ul>
                                </li>
                                ))}
                            </div> 
                        </>
                        )}
                    {[0, 1, 2, 3, 4].map((sectionId) => (
                        <li key={`section-${sectionId}`}>
                        <ul>
                            <ListSubheader>{`I'm sticky ${sectionId}`}</ListSubheader>
                            {[0, 1, 2].map((item) => (
                            <ListItem key={`item-${sectionId}-${item}`}>
                                <ListItemText primary={`Item ${item}`} />
                            </ListItem>
                            ))}
                        </ul>
                        </li>
                    ))}
                    </List> */} 
                </div>
                
                <div className="right">
                
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default NoticeStd