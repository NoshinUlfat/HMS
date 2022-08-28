import React, { useEffect, useState } from 'react'
import Datatable from "../../../components/datatable/DataTable"
import Navbar from '../../../components/navbar/Navbar'
import Progressbar from '../../../components/progressbar/Progressbar'
import { rommRequestProgress } from '../../../components/progressbar/progressbarData'
import Sidebar from '../../../components/sidebar/Sidebar'
import { SideBarDataProvost } from "../../../components/sidebar/SideBarData"
import "./fundRequest.scss"

import axios from "axios"

import { userRows } from "./../../../components/datatable/datatablesource"
import { DataGrid } from "@mui/x-data-grid";
import {datatable,datatableTitle,link,cellWithImg,cellImg,cellWithStatus,cellAction} from "../../../components/datatable/datatable.scss"
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import CreateIcon from '@mui/icons-material/Create';


import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Box from '@mui/material/Box';
import clsx from 'clsx';
import Typography from '@mui/material/Typography';

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'



const RoomApplicationList = () => {
    const [id,setID] = useState(null)
    const [data, setData] = useState([]);
    const [colName, setcolName] = useState([]);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);



    const [open, setOpen] = React.useState(false);
    const [dialogtitle, setDialogTitle] = React.useState(null);
    const [dialogContent, setDialogContent] = React.useState(null);
    const [SelectedRow, setSelectedRow] = React.useState(null);
    const [selectedRowCount, setSelectedRowCount] = React.useState(0);

    const [singleSelectionDefaulterId, setSingleSelectionDefaulterId] = React.useState(null);


    const [studentState, setStudentState] = useState([]);


    const [isApplicationShow, setIsApplicationShow] = useState(false);
    const [singleApproval, setSingleApproval] = useState(null);
    const [singleRejection, setSingleRejection] = useState(null);
    const [singleCertificateId, setSingleCertificateId] = React.useState(null);
    const [singleSelectionStudentsId, setSingleSelectionStudentsId] = React.useState(null);
    const [isOperationCompleted, setIsOperationCompleted] = useState(false);
    const [amount, setAmount] = useState(null);

    let studentNameData = []
    let selectedRowData = []
    let selectedStudentsId = []
    

    const showInfo = num => {
        setID(num)
        console.log("NUM ",num)
    }



   
    useEffect(() => {
      const fetchData = async () => {
      setLoading(true);

      try {

       // const { data: response } = 
        await axios.get("/fundRequest/getAll")
        .then( data => {
          let st = data.data;
          setData(
            st.map(item => {
              //if(item.approvalStatus !== "pending"){
              return {
                _id: item._id,
                studentId: item.studentsId.studentId,
                studentsId: item.studentsId,
                img: item.studentsId.img,
                title: item.title,
                amount: item.amount,
                description: item.description,
                approvalStatus: item.approvalStatus,
                checked: false,
              };
            //}
            })
          );
        })
        
      
        console.log("student name data ",data)
        setcolName(studentNameData)

        console.log("STATEEEE  ",studentState);
  
      } catch (err) {
        console.log("ERROR ",err)
      }
      setLoading(false);
    };

    fetchData();
  }, []);


  
  console.log("DATA ",data)
  console.log("LOAD ",loading)

    const item = ()=> {
        if (id) {
            return data.filter((x) => x._id === id)
        }
        return null
    }

    let userColumns = []

    if(!loading){
    //  console.log("VCVCV   ",data.studentsId)
    userColumns = [
      {
        field: '',
        headerName: "Profile",
        width: 180,
        renderCell: (params) => {
          return (
            <div className="cellWithImg">
              <img className="cellImg" src={params.row.img} alt="" />   
              {params.row.username}
            </div>
          );
        },
      },
      {
        field: 'studentId',
        headerName: "Student ID",
        width: 200,
        type: 'string',
       },
      {
        field: 'title',
        headerName: "Application Title",
        width: 200,
      },
      {
        field: 'amount',
        headerName: "Amount",
        width: 200,
      },
    ];
   } 

  
  
    const handleClose = () => {
      setOpen(false);
      setDialogTitle(null);
      setDialogContent(null);
      setIsApplicationShow(false);
      setSingleApproval(false);
      setSingleRejection(false);
      setIsOperationCompleted(false);
    };
  
    
    const handleSingleUpdate = () => {
      var updateURL = "/fundRequest/updateStatus//"+singleCertificateId;
     
      console.log("Update URL ",updateURL)

      
      let application_response = ""
      let approval_status = ""
      if(singleApproval) {application_response = "Your request has been accepted"; approval_status = "approved"}
      if(singleRejection) {application_response = "Your request has been rejected"; approval_status = "rejected"}
     
      const newNotification = {
        studentsId: singleSelectionStudentsId,
        title: "Fund Request Notification",
        description: application_response,
        seen: true,
      };

      let notificationURL = "/notifications/createNotification/"+singleSelectionStudentsId;
      axios.post(notificationURL, newNotification);
    
      setData(data.filter((item) => item._id !== singleSelectionDefaulterId));
      
      const newRequest = {
        approvalStatus: approval_status
      };
      axios.put(updateURL, newRequest);
      
      
      setSingleApproval(false)
      setSingleRejection(false)

      // setDialogTitle("Operation Successful");
      // setIsOperationCompleted(true);

      window.location.reload(false);
    }

    const handleClickSingleApproval = (id,sid) => {
      setDialogContent("Are you sure you want to approve this particular request?");
      setSingleApproval(true);
      setSingleCertificateId(id);
      setSingleSelectionStudentsId(sid);
      setOpen(true);
    }

    const handleClickSingleRejection = (id,sid) => {
      setDialogContent("Are you sure you want to reject this particular request?");
      setSingleRejection(true);
      setSingleCertificateId(id);
      setSingleSelectionStudentsId(sid);
      setOpen(true);
    }

    const handleClickApplicationInfo = (type,amount,msg) => {
      let title = "Certificate Type: "+type

      setDialogTitle(title);
      setDialogContent(msg);
      setAmount(amount);
      setIsApplicationShow(true);
      setOpen(true);
    }

    const actionColumn = [
      {
        field: "action",
        headerName: "Action",
        width: 300,
        renderCell: (params) => {
          return (
            <div className="cellAction">
                <div className="deleteButton" style={{borderColor: "blue", textColor: "blue"}} 
                  onClick={event => handleClickApplicationInfo(params.row.title,params.row.amount,params.row.description)}>
                    View Application
                </div>
              <div
                className="deleteButton" onClick={() => {handleClickSingleApproval(params.row._id,params.row.studentsId._id)}}>
                Approve
              </div>
              <div
                className="deleteButton" style={{borderColor: "green", fontColor: "green"}} 
                  onClick={() => {handleClickSingleRejection(params.row._id,params.row.studentsId._id)}}>
                Reject
              </div>
            </div>
          );
        },
      },
    ];
    
   

    

  

    return (
        <div className='fundRequestList'>
          {loading?"Loading":(
            <>
              <Sidebar info={SideBarDataProvost}/>
              <div className="fundRequestListContainer">
                <Navbar/>
                <div className="top">
                  <div className="left">
                  
                    <div className="datatable">
                      <div className="datatableTitle">
                        Pending Fund Request List
                      </div>
                      <DataGrid
                        className="datagrid"
                        rows={data.filter((item) => item.approvalStatus === "pending")}
                        columns={userColumns.concat(actionColumn)}
                        getRowId={(row) => row._id}
                        pageSize={2}
                        rowsPerPageOptions={[2]}
                         checkboxSelection disableSelectionOnClick
                        onSelectionModelChange={
                          (ids) => {
                          const selectedIDs = new Set(ids);
                          selectedRowData = data.filter((row) =>
                            selectedIDs.has(row._id.toString()),
                          );

                          setSelectedRow(selectedRowData);
                          setSelectedRowCount(selectedRowData.length)
                          }
                        }
                        style={{height : '210px'}}
                      />
                    </div>

                  <Dialog
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                          
                        > 
                          {isOperationCompleted?
                          <DialogContent >
                            <DialogContentText id="alert-dialog-description">
                              {"Operation successful"} 
                              
                            </DialogContentText>
                            <button style={{marginLeft: "60px", marginTop: "15px"}} onClick={handleClose}>Ok</button>
                          </DialogContent>
                          :<></>} 
                          {(singleApproval || singleRejection)?
                           <DialogContent >
                              <DialogContentText id="alert-dialog-description">
                                {dialogContent} 
                                
                              </DialogContentText>
                            </DialogContent>
                            
                          :<></>} 
                          {(singleApproval || singleRejection)?
                              <DialogActions>
                                <Button onClick={handleSingleUpdate} autoFocus>
                                  Yes  
                                </Button>
                                <Button onClick={handleClose}>No</Button>
                              </DialogActions>
                          :<></>} 

                          {isApplicationShow?
                            <DialogContent >
                              <div className="insidePop">
                                <div className="top">
                                  <Typography type="body2" style={{ fontWeight: 'bold', fontSize: '18px', fontColor: 'black' }}>
                                    <span> {dialogtitle} </span>
                                    <span> Amount : {amount} tk</span>
                                  </Typography>
                                  <Typography type="body2" style={{ fontWeight: 'bold', fontSize: '18px', fontColor: 'black' }}>
                                    <span> Amount : {amount} tk</span>
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
                                      {(application.approvalStatus !== "pending")?
                                        <ListItem>
                                            <ListItemButton sx={{ display: 'block', backgroundColor: '#caccfc' }}>
                                                <div className="buttons">
                                                  <ListItemText secondary={<Typography type="body2" style={{ fontWeight: 'bold', fontSize: '15px' }}>
                                                     Title : {application.title}
                                                  </Typography>}></ListItemText>
                                                  <ListItemText secondary={<Typography type="body2" style={{ fontWeight: 'bold', fontSize: '12px' }}>
                                                      Amount : {application.amount} tk
                                                  </Typography>}></ListItemText>   
                                                  <ListItemText secondary={<Typography type="body2" style={{ fontWeight: 'bold', fontSize: '12px' }}>
                                                      Description : {application.description} 
                                                  </Typography>}></ListItemText> 
                                                  <ListItemText secondary={<Typography type="body2" style={{ fontWeight: 'bold', fontSize: '12px' }}>
                                                      Approval Status : 
                                                  </Typography>}></ListItemText>  
                                                  {(application.approvalStatus !== "approved")?
                                                      <ListItemText secondary={<Typography type="body2" style={{ fontWeight: 'bold', fontSize: '12px', color: 'green' }}>
                                                            {application.approvalStatus}
                                                      </Typography>}></ListItemText>  
                                                  :<>
                                                       <ListItemText secondary={<Typography type="body2" style={{ fontWeight: 'bold', fontSize: '12px', color: 'red' }}>
                                                            {application.approvalStatus}
                                                      </Typography>}></ListItemText>  
                                                  </>}
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

export default RoomApplicationList