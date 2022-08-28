import React, { useEffect, useState } from 'react'
import Navbar from '../../../components/navbar/Navbar'
import Sidebar from '../../../components/sidebar/Sidebar'
import { SideBarDataDiningManager, SideBarDataStd } from "../../../components/sidebar/SideBarData"
import "./certificate.scss"

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import axios from "axios"
import { useContext } from "react"
import { AuthContext } from "../../../context/AuthContext"
import CreateIcon from '@mui/icons-material/Create';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import Typography from '@mui/material/Typography';
import useFetch from "../../../hooks/useFetch";


const Certificate =  () => {

    const [show, setShow] = useState(false);
    const [file, setFile] = useState("");
    const [info, setInfo] = useState({});

    const { user } = useContext(AuthContext);
    const [open, setOpen] = React.useState(false);
    const [isConfirm, setIsSConfirm] = React.useState(false);
    const [isShowApplication, setIsShowApplication] = React.useState(false);
    const [isApplication, setIsApplication] = React.useState(false);
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [dialogtitle, setDialogTitle] = React.useState(null);
    const [dialogContent, setDialogContent] = React.useState(null);

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isHover, setIsHover] = useState(false);
  
    const certificateData = useFetch("/dining/getAllMeals");
  
    useEffect(() => {
      const fetchData = async () => {
      setLoading(true);
      

      try {

       // const { data: response } = 
        
        const { data: response } = await axios.get("/certificate");
        setData(response);
        console.log("student name data 1 ",response)
        console.log("student name data ",data)
  
      } catch (err) {
        console.log(err)
      }
      setLoading(false);
    };

    fetchData();
  }, []);


  const [credentials, setCredentials] = useState({
    id: user._id,
    username: user.username,
  });
  const [credentials2, setCredentials2] = useState({
    studentsId: user._id,
    type: undefined,
    message: undefined,
    approvalStatus: "pending",
  });


  const handleChangeText = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    console.log(info)
  };

  const refetchCertificateData = async () => {
    try {
      const { data, loading, error, reFetch } = certificateData
      reFetch()
    } catch (err) {
      console.log("refech fail")
      console.log(err)
    }
  }

  const handleClick = async (e) => {
    e.preventDefault();
    console.log("EEE ",user._id);/////////////
    console.log("SSD ",info)

    const data = new FormData();
    data.append("upload_preset", "upload");

    var main_url = "/certificate/certificateEntry/"+user._id;
    console.log("URL ",main_url)
    try {

      let newRequest = {
        ...info,
        studentsId: user._id,
        approvalStatus: "pending"
      };


      const res = await axios.post(main_url, newRequest);
      info.message = "";
      info.type = "";
      
      setIsApplication(false);
      setIsSConfirm(true);
      // window.location.reload(false);

       
 
    } catch (err) {
      console.log(err)
    }
  };
 
  const boxStyle = {
    //...
    backgroundColor: isHover ? 'rgb(173, 146, 186)' : 'rgb(165, 116, 189)',
  };
  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };
 
  const handleOpen = () => {
    setIsApplication(true);
    setIsSuccess(false);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setIsApplication(false);
    setIsSConfirm(false);
    setIsShowApplication(false);
  };
  const showApplication = (type,message) => {
    console.log("VALLAGENA ",type,message);
    setOpen(true);
    setIsShowApplication(true);
    setDialogTitle(type);
    setDialogContent(message);
  };

  const isManager = useFetch("/dining/checkManager/get/"+user._id);

    return (
        <div className='certificate'>
          {loading?"Loading":(
            <>
           {isManager.data.isManager?<Sidebar info={SideBarDataDiningManager}/>:<Sidebar info={SideBarDataStd}/>}
            <div className="certificateContainer">
                <Navbar/>
                
                <div className="top">
                    <div className="left">

                        <div className="buttons">
                            <div className="buttonDetails" key="1">
                                <div className="editButton" >
                                <span onClick={() => handleOpen()}> <CreateIcon className='icon'/> Write Application</span>
                                    {/* <span onClick={() => setShow(true)}> <CreateIcon className='icon'/> Write Application</span> */}
                                </div>
                            </div>
                        </div>

                        <Dialog
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                          
                        > 
                          {isApplication?
                            <DialogContent >
                              <div className="insidePop">
                                <div className="top">
                                  <h1>Write Application</h1>
                                </div>

                                <div className="bottom">
                                    <form action="#" method="post">
                                      <div className="formInput">
                                        <div className="detailItem" key = "1">
                                          <label>Certificate Type : </label>
                                          <input type='text' id="type" value={info.type} cols="200" placeholder="Write certificate type" onChange={handleChangeText} />
                                        </div>
                                        <div className="detailItem" key = "2">
                                          <label>Application : </label>
                                          <textarea name="" id="message" value={info.message} cols="400" rows="15" placeholder='Write your application' onChange={handleChangeText}>
                                          </textarea>
                                        </div>
                                      

                                      <button type="submit" onClick={handleClick}>Send</button>

                                      </div>
                                    </form>

                                  
                                </div>
                              
                              </div>
                            </DialogContent>
                          :<></>}
                          {isConfirm?
                           <DialogContent >
                              <DialogContentText id="alert-dialog-description">
                                {"Application sent successfully"} 
                                
                              </DialogContentText>
                              <button style={{marginLeft: "80px", marginTop: "15px"}} onClick={handleClose}>Ok</button>
                            </DialogContent>
                          
                          :<></>}

                          {isShowApplication?
                            <DialogContent >
                              <div className="insidePop">
                                <div className="top">
                                  <Typography type="body2" style={{ fontWeight: 'bold', fontSize: '18px', fontColor: 'black' }}>
                                    <span> Certificate Type: {dialogtitle} </span>
                                  </Typography>
                                </div>
                                <div className="bottom">
                                  <div className="formInput">
                                    <Typography type="body2" style={{ fontWeight: 'bold', fontSize: '18px' }}>
                                      <span>  Application </span>
                                    </Typography>
                                    <Typography type="body2" style={{ fontWeight: 'bold', fontSize: '15px', fontColor: 'gray' }}>
                                      <span>  {dialogContent} </span>
                                    </Typography>
                                  </div>
                               </div>
                              </div>
                            </DialogContent>
                          :<></>}
                        :<></>
                        </Dialog>

                        <div className="list-boxOutter">

                            <div className="listBox">
                                <h2>Already Approved</h2>

                                <List style={{maxHeight: '100%', overflow: 'auto', height: '110px'}} >
                                  {data.map((application) => (
                                    <div class="list-boxInner"> 
                                      {(application.studentsId._id == user._id && application.approvalStatus == "approved")?
                                        <ListItem>
                                            <ListItemButton sx={{ display: 'block', backgroundColor: '#caccfc' }}>
                                                <div className="buttons">
                                                  <ListItemText secondary={<Typography type="body2" style={{ fontWeight: 'bold', fontSize: '15px' }}>
                                                      {application.type}
                                                  </Typography>}></ListItemText>
                                                  <ListItemText secondary={<Typography type="body2" style={{ fontWeight: 'bold', fontSize: '12px' }}>
                                                    <span 
                                                      style={boxStyle}
                                                      onMouseEnter={handleMouseEnter}
                                                      onMouseLeave={handleMouseLeave}
                                                      onClick={() => showApplication(application.type,application.message)}>  
                                                        See application 
                                                    </span>
                                                  </Typography>}></ListItemText>    
                                                </div>
                                              </ListItemButton>
                                        </ListItem>
                                      :<></>}
                                    </div>
                                  ))}
                                </List>
                            </div>

                            <div className="listBox">
                                <h2>Waiting for Approval</h2>
                                <List style={{maxHeight: '100%', overflow: 'auto', height: '110px'}} >
                                  {data.map((application) => (
                                    <div class="list-boxInner"> 
                                      {(application.studentsId._id == user._id && application.approvalStatus == "pending")?
                                        <ListItem>
                                          <ListItemButton sx={{ display: 'block', backgroundColor: '#caccfc' }}>
                                            <div className="buttons">
                                              <ListItemText secondary={<Typography type="body2" style={{ fontWeight: 'bold', fontSize: '15px' }}>
                                                {application.type}
                                              </Typography>}></ListItemText>
                                              <ListItemText secondary={<Typography type="body2" style={{ fontWeight: 'bold', fontSize: '12px' }}>
                                                <span 
                                                  style={boxStyle}
                                                  onMouseEnter={handleMouseEnter}
                                                  onMouseLeave={handleMouseLeave}
                                                  onClick={() => showApplication(application.type,application.message)}>  
                                                    See application 
                                                </span>
                                              </Typography>}></ListItemText>    
                                            </div>
                                          </ListItemButton>
                                        </ListItem>
                                      :<></>}
                                    </div>
                                  ))}
                                </List>
                            </div>

                            <div className="listBox">
                              <List style={{maxHeight: '100%', overflow: 'auto', height: '110px'}} >
                                <h2>All Applications</h2>
                                {data.map((application) => (
                                  <div class="list-boxInner"> 
                                    {(application.studentsId._id == user._id)?
                                      <ListItem>
                                        <ListItemButton sx={{ display: 'block', backgroundColor: '#caccfc' }}>
                                          <div className="buttons">
                                            <ListItemText secondary={<Typography type="body2" style={{ fontWeight: 'bold', fontSize: '15px' }}>
                                              {application.type}
                                            </Typography>}></ListItemText>
                                            <ListItemText secondary={<Typography type="body2" style={{ fontWeight: 'bold', fontSize: '12px' }}>
                                              <span 
                                                style={boxStyle}
                                                onMouseEnter={handleMouseEnter}
                                                onMouseLeave={handleMouseLeave}
                                                onClick={() => showApplication(application.type,application.message)}>  
                                                  See application 
                                              </span>
                                            </Typography>}></ListItemText>    
                                          </div>
                                        </ListItemButton>
                                      </ListItem>
                                    :<></>}
                                  </div>
                                ))}

                              </List>
                            </div>

                    </div>

                  </div>
                    
                </div>

                
            </div>
            </>
          )}
        </div>
    )

}

export default Certificate;