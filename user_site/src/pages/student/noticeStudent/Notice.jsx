import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined"
import EditIcon from '@mui/icons-material/Edit'
import React, { useState, useEffect } from 'react'
import Navbar from '../../../components/navbar/Navbar'
import Popup from '../../../components/popup/Popup'
import Sidebar from '../../../components/sidebar/Sidebar'
import { SideBarDataStd } from "../../../components/sidebar/SideBarData"
import "./notice.scss"

import { profileData } from "../dashboard/dashboardData"

import { useContext } from "react"
import { AuthContext } from "../../../context/AuthContext"
import axios from "axios";

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader';
import { Document, Page } from 'react-pdf';
import Typography from '@mui/material/Typography';

import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

const NoticeStd =  () => {
    const [id,setID] = useState(null)
    const [show, setShow] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    const onDocumentLoadSuccess = (numPages) => {
        setNumPages(numPages);
    }

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

                    {/* <h1 className="title">Information </h1>
                    {loading?"Loading":(
                        <>
                            <div>Notices</div>
                            <div className="Ff">
                                {data.map((student) => (
                                <div className="studentId">{student.title} {student.noticeType} {student.description} {student.date} </div>
                            
                                ))}
                            </div> 
                        </>
                    )} */}
                    
                    {/* <div>
                        <Document file="./somefile.pdf" onLoadSuccess={onDocumentLoadSuccess}>
                            
                            <Page pageNumber={pageNumber} width={600} />
                        </Document>
                        <p>
                            Page {pageNumber} of {numPages}
                        </p>
                    </div> */}
                    
                    <div className="list-boxOutter">

                            <div className="listBox">
                                <h2>Notice Board</h2>

                                <List style={{maxHeight: '100%', overflow: 'auto', height: '500px'}} >
                                    {data.map((notice) => (
                                        <div class="list-boxInner"> 
                                            <ListItem>
                                                <ListItemButton sx={{ display: 'block', backgroundColor: '#caccfc' }}>
                                                    <div className="buttons">
                                                        <div className="buttonDetails" key="1">
                                                            <div className="editButton" >
                                                                <span onClick={() => setShow(true)}> <PictureAsPdfIcon className='icon'/> Show pdf </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <ListItemText secondary={<Typography type="body2" style={{ color: 'red', fontWeight: 'bold', fontSize: '10px' }}>{notice.date}</Typography>}></ListItemText>
                                                    <ListItemText secondary={<Typography type="body2" style={{ fontWeight: 'bold', fontSize: '12px' }}>{notice.noticeType}</Typography>}></ListItemText>
                                                    <ListItemText secondary={<Typography type="body2" style={{ fontWeight: 'bold', fontSize: '15px' }}>{notice.title}</Typography>}></ListItemText>
                                                    <ListItemText secondary={<Typography type="body2" style={{ fontSize: '12px' }}>{notice.description}</Typography>}></ListItemText>
                                                </ListItemButton>
                                            </ListItem>
                                        </div>
                                    ))}
                                </List>
                            </div>

                        </div>
                </div>
                
                {/* <div className="right">
                
                    
                </div> */}
            </div>
        </div>
    </div>
  )
}

export default NoticeStd