import React, { useEffect, useState } from 'react'
import Datatable from "../../../components/datatable/DataTable"
import Navbar from '../../../components/navbar/Navbar'
import Progressbar from '../../../components/progressbar/Progressbar'
import { rommRequestProgress } from '../../../components/progressbar/progressbarData'
import Sidebar from '../../../components/sidebar/Sidebar'
import { SideBarDataProvost } from "../../../components/sidebar/SideBarData"
import "./certificate.scss"

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
//import { GridColumns, DataGrid, GridCellParams } from '@mui/x-data-grid';



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
    

    const [singleWarning, setSingleWarning] = React.useState(null);
    const [singleMealOff, setSingleMealOff] = React.useState(null);
    const [singleSeatCancel, setSingleSeatCancel] = React.useState(null);
    const [singleClear, setSingleClear] = React.useState(null);

    const [multipleWarning, setMultipleWarning] = React.useState(null);
    const [multipleMealOff, setMultipleMealOff] = React.useState(null);
    const [multipleSeatCancel, setMultipleSeatCancel] = React.useState(null);
    const [multipleClear, setMultipleClear] = React.useState(null);


    const [studentState, setStudentState] = useState([]);


    const [isApplicationShow, setIsApplicationShow] = useState(false);
    const [singleApproval, setSingleApproval] = useState(null);
    const [singleRejection, setSingleRejection] = useState(null);
    const [singleCertificateId, setSingleCertificateId] = React.useState(null);
    const [singleSelectionStudentsId, setSingleSelectionStudentsId] = React.useState(null);
    const [isOperationCompleted, setIsOperationCompleted] = useState(false);
    const [multipleApproval,setMultipleApproval] = useState(null);
    const [multipleRejection,setMultipleRejection] = useState(null);

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
        await axios.get("/certificate")
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
                type: item.type,
                message: item.message,
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
        field: 'type',
        headerName: "Application Type",
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
      setMultipleApproval(false);
      setMultipleRejection(false);
      setIsOperationCompleted(false);
    };


  

    const handleMultipleUpdate = async (e) =>  {
      try{
        var keys = Object.keys( selectedRowData );
        console.log("ARRAY LENGTH ",SelectedRow);

        let application_response = ""
        let approval_status = ""
        if(multipleApproval) {application_response = "Your request has been accepted"; approval_status = "approved"}
        if(multipleRejection) {application_response = "Your request has been rejected"; approval_status = "rejected"}
  
        var keys = Object.keys( SelectedRow );
        for( var i = 0,length = keys.length; i < length; i++ ) 
        {
          var updateURL = "/certificate/updateStatus/"+SelectedRow[ keys[ i ] ]._id;
          
          const newNotification = {
            studentsId: SelectedRow[ keys[ i ] ].studentsId._id,
            title: "Certificate Response Notification",
            description: application_response,
            seen: false,
          };
    
          let notificationURL = "/notifications/createNotification/"+SelectedRow[ keys[ i ] ].studentsId._id;
        //let notificationURL = "/notifications/createNotification/"+SelectedRow[ keys[ i ] ].studentsId._id;
          console.log("NOTIFICATION URL ",notificationURL)
          axios.post(notificationURL, newNotification);
        
         // setData(data.filter((item) => item._id !== singleSelectionDefaulterId));
          
          const newRequest = {
            approvalStatus: approval_status
          };
          axios.put(updateURL, newRequest);
          
          
        }

        setMultipleApproval(false)
        setMultipleRejection(false)

        
      
      
      window.location.reload(false);
        
       }
       catch(err){
          console.log("ERROR")
       }
      
      setDialogTitle("Operation Successful");
      setIsOperationCompleted(true);

       
     }


   

    const handleClickOpenMultipleApproval = () => {
      console.log("SELECTED R1 ",selectedRowData.length)
      if(selectedRowCount>0)
      {
        setDialogContent("Are you sure you want to approve these requests?")
        
      }
      else setDialogContent("Please select atleast one request to approve")

      setMultipleApproval(true)
      console.log("SELECTED R2 ",selectedRowData.length)
      setOpen(true);
    };

    const handleClickOpenMultipleRejection = () => {
      console.log("SELECTED R1 ",selectedRowData.length)
      if(selectedRowCount>0)
      {
        setDialogContent("Are you sure you want to reject these requests?")
        
      }
      else setDialogContent("Please select atleast one request to reject")

      setMultipleRejection(true)
      console.log("SELECTED R2 ",selectedRowData.length)
      setOpen(true);
    };

    
  
    
    const handleSingleUpdate = () => {
      var updateURL = "/certificate/updateStatus/"+singleCertificateId;
     
      console.log("Update URL ",updateURL)

      
      let application_response = ""
      let approval_status = ""
      if(singleApproval) {application_response = "Your request has been accepted"; approval_status = "approved"}
      if(singleRejection) {application_response = "Your request has been rejected"; approval_status = "rejected"}
     
      const newNotification = {
        studentsId: singleSelectionStudentsId,
        title: "Due Payment Notification",
        description: application_response,
        seen: false,
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

    const handleClickApplicationInfo = (type,msg) => {
      setDialogTitle(type);
      setDialogContent(msg);
      setIsApplicationShow(true);
      setOpen(true);
    }

    const actionColumn = [
      {
        field: "action",
        headerName: "Action",
        width: 400,
        renderCell: (params) => {
          return (
            <div className="cellAction">
                <div className="deleteButton" style={{borderColor: "blue", textColor: "blue"}} 
                  onClick={event => handleClickApplicationInfo(params.row.type,params.row.message)}>
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
        <div className='certificateList'>
          {loading?"Loading":(
            <>
              <Sidebar info={SideBarDataProvost}/>
              <div className="certificateListContainer">
                <Navbar/>
                <div className="top">
                  <div className="left">
                  


                  {/* <Datatable showInfo = {showInfo} /> */}

                    {/* {loading?"Loading":(
                    <> */}
                    <div className="datatable">
                      <div className="datatableTitle">
                        Certificate Request List
                      </div>
                      {/* getRowId={(row) => row._id} */}
                      <DataGrid
                        className="datagrid"
                        rows={data.filter((item) => item.approvalStatus === "pending")}
                        columns={userColumns.concat(actionColumn)}
                        getRowId={(row) => row._id}
                        pageSize={7}
                        rowsPerPageOptions={[7]}
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
                      />
                    </div>
                    
                    

                    <div className="submitBtns">
                      <button className="btnApproved" onClick={() => {handleClickOpenMultipleApproval()}}>
                        Approve selected
                      </button>
                      <button className="btnRejected" onClick={() => {handleClickOpenMultipleRejection()}}>
                        Reject Selected
                      </button>
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

                          {(multipleApproval || multipleRejection)?
                           <DialogContent >
                              <DialogContentText id="alert-dialog-description">
                                {dialogContent} 
                                
                              </DialogContentText>
                            </DialogContent>
                            
                          :<></>} 
                          {((multipleApproval || multipleRejection) && selectedRowCount>0)?
                              <DialogActions>
                                <Button onClick={handleMultipleUpdate} autoFocus>
                                  Yes  
                                </Button>
                                <Button onClick={handleClose}>No</Button>
                              </DialogActions>
                          :<></>} 

                          {isApplicationShow?
                            <DialogContent >
                              <div className="insidePop">
                                <div className="top">
                                  <Typography type="body2" style={{ fontWeight: 'bold', fontSize: '18px' }}>
                                    <span  style={{color: 'black'}}> Application Title: <span style={{color: 'gray'}}>{dialogtitle}</span></span>
                                  </Typography>
                                </div>
                                <div className="bottom">
                                  <div className="formInput">
                                    <Typography type="body2" style={{ fontWeight: 'bold', fontSize: '18px', color: 'black' }}>
                                      <span>  Application: </span>
                                    </Typography>
                                    <Typography type="body2" style={{ fontWeight: 'bold', fontSize: '15px', color: 'gray' }}>
                                      <span style={{color: 'gray'}}>  {dialogContent} </span>
                                    </Typography>
                                  </div>
                               </div>
                              </div>
                            </DialogContent>
                          :<></>}
                        :<></>
                        </Dialog>



                </div>

          
              </div>
                  
                {/* <div className="bottom">
                  <div className='progressbar'>
                    <h1 className="title">Room Applications</h1>
                    <Progressbar info={rommRequestProgress}/>
                  </div>
                </div> */}
      
              </div>
            </>
          )}

        </div>
      )
}

export default RoomApplicationList