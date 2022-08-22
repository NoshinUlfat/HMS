import React, { useEffect, useState } from 'react'
import Datatable from "../../../components/datatable/DataTable"
import Navbar from '../../../components/navbar/Navbar'
import Progressbar from '../../../components/progressbar/Progressbar'
import { rommRequestProgress } from '../../../components/progressbar/progressbarData'
import Sidebar from '../../../components/sidebar/Sidebar'
import { SideBarDataProvost } from "../../../components/sidebar/SideBarData"
import "./roomApplicationList.scss"

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

const RoomApplicationList = () => {
    const [id,setID] = useState(null)
    const [data, setData] = useState([]);
    const [colName, setcolName] = useState([]);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);



    const [open, setOpen] = React.useState(false);
    const [dialogtitle, setDialogTitle] = React.useState(null);
    const [approvalStatus, setApprovalStatus] = React.useState(null);
    const [rejectionStatus, setRejectionStatus] = React.useState(null);
    const [singleRejectionStatus, setSingleRejectionStatus] = React.useState(null);
    const [singleRejectionId, setSingleRejectionId] = React.useState(null);
    const [singleRejectionStudentsId, setSingleRejectionStudentsId] = React.useState(null);
    const [SelectedRow, setSelectedRow] = React.useState(null);
    const [selectedRowCount, setSelectedRowCount] = React.useState(0);

    const [studentState, setStudentState] = useState([]);

    let studentNameData = []
    let selectedRowData = []
    let selectedStudentsId = []
    let requestState = []
    let Id=""
    let studentId=""
    let dialogueboxMessage="jln"

    const showInfo = num => {
        setID(num)
        console.log("NUM ",num)
    }



   
    useEffect(() => {
      const fetchData = async () => {
      setLoading(true);
      setApprovalStatus(false);
      setRejectionStatus(false);
      setSingleRejectionStatus(false);
      setSingleRejectionStudentsId(null);
      try {

       // const { data: response } = 
        await axios.get("/roomAllotments")
        .then( data => {
          let st = data.data;
          setData(
            st.map(item => {
              //if(item.approvalStatus !== "pending"){
              return {
                _id: item._id,
                studentId: item.studentId,
                studentsId: item.studentsId,
                username: item.studentsId.username,
                email: item.studentsId.email,
                cgpa: item.studentsId.cgpa,
                level: item.studentsId.level,
                term: item.studentsId.term,
                present_address: item.studentsId.present_address,
                permanent_address: item.studentsId.permanent_address,
                img: item.studentsId.img,
                checked: false,
              };
            //}
            })
          );
        })
        
      ///  console.log("VCVCccccccccccccc ",response[0].studentsId);
        // var keys = Object.keys( response );
        // for( var i = 0,length = keys.length; i < length; i++ ) {
        //   studentNameData[i] = response[ keys[ i ] ].studentsId.username
        //   console.log(studentNameData[i]);

          
        // }
        // for( var i = 0,length = keys.length; i < length; i=i+2 ) {
        //   studentState[i] = response[ keys[ i ] ]._id
        //   studentState[i+1] = false;
        // }
        console.log("student name data ",studentNameData)
        setcolName(studentNameData)

        console.log("STATEEEE  ",studentState);
  
      } catch (err) {
        console.log(err)
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
        width: 230,
      },
    
      // {
      //   field: 'sports',
      //   headerName: "Level-Term",
      //   width: 100,
      // },
    ];
   } 

  
  
    const handleClose = () => {
      console.log("SELECTED H1 ",selectedRowData.length)
      setOpen(false);
      setApprovalStatus(false);
      setRejectionStatus(false);
      console.log("SELECTED H2 ",selectedRowData.length)
    };

    const handleSingleDelete = () => {
      setData(data.filter((item) => item._id !== singleRejectionId));

      console.log("IN DELETE ROOM REQUEST", singleRejectionStudentsId)
      const newRequest = {
        studentsId: singleRejectionStudentsId,
        title: "Room Request Response",
        description: "Your room request has been rejected",
        seen: true,
      };

      let notificationURL = "/notifications/createNotification/"+singleRejectionStudentsId;
      let deleteURL = "/roomAllotments/deleteRoomRequest/"+singleRejectionId;
      
      
      axios.post(notificationURL, newRequest);
      axios.delete(deleteURL);
      handleClose();
    };


    const handleMultipleDelete = async (e) => {
     try{
      var keys = Object.keys( selectedRowData );
      console.log("ARRAY LENGTH ",SelectedRow);

      var keys = Object.keys( SelectedRow );
      for( var i = 0,length = keys.length; i < length; i++ ) 
      {
        console.log("ARRAY IDS ",SelectedRow[ keys[ i ] ]._id);

        const req_details = await axios.get("/roomAllotments/requestDetails/"+SelectedRow[ keys[ i ] ]._id)
        let notificationURL = "/notifications/createNotification/"+req_details.data.studentsId;

        
        const newRequest = {
          studentsId: req_details.data.studentsId,
          title: "Room Request Response",
          description: "Your room request has been rejected",
          seen: true,
        };
        axios.post(notificationURL, newRequest);
        console.log("MEAU RESPONSE ",req_details.data.studentsId);
        axios.delete("/roomAllotments/deleteRoomRequest/"+SelectedRow[ keys[ i ] ]._id);
        
      }
    
    
    
      window.location.reload(false);
      
     }
     catch(err){
        console.log("ERROR")
     }
     handleClose();
    }

    const handleMultipleApproval = async (e) =>  {
      try{
        var keys = Object.keys( selectedRowData );
        console.log("ARRAY LENGTH ",SelectedRow);
  
        var keys = Object.keys( SelectedRow );
        for( var i = 0,length = keys.length; i < length; i++ ) 
        {
          console.log("ARRAY IDS ",SelectedRow[ keys[ i ] ]._id);
  
          const req_details = await axios.get("/roomAllotments/requestDetails/"+SelectedRow[ keys[ i ] ]._id)
          let notificationURL = "/notifications/createNotification/"+req_details.data.studentsId;
  
          
          const newRequest = {
            studentsId: req_details.data.studentsId,
            title: "Room Request Response",
            description: "Your room request has been approved",
            seen: true,
          };
          axios.post(notificationURL, newRequest);
          console.log("MEAU RESPONSE ",req_details.data.studentsId);
          axios.delete("/roomAllotments/deleteRoomRequest/"+SelectedRow[ keys[ i ] ]._id);
          
        }
      
      
      
        window.location.reload(false);
        
       }
       catch(err){
          console.log("ERROR")
       }
       handleClose();
     }


    const handleClickOpenApproval = () => {   
      console.log("SELECTED A1 ",selectedRowData.length)
      if(selectedRowCount>0)
      {
        setDialogTitle("Are you sure you want to approve these requests?")
        setApprovalStatus(true)
      }
      else setDialogTitle("Please select atleast one request to approve")

      console.log("SELECTED A2 ",selectedRowData.length)
      setOpen(true);
      console.log("SELECTED A3 ",selectedRowData.length)
    };

    const handleClickOpenRejection = () => {
      console.log("SELECTED R1 ",selectedRowData.length)
      if(selectedRowCount>0)
      {
        setDialogTitle("Are you sure you want to reject these requests?")
        setRejectionStatus(true)
      }
      else setDialogTitle("Please select atleast one request to reject")

      console.log("SELECTED R2 ",selectedRowData.length)
      setOpen(true);
    };
  


    const handleClickOpenSingleRejection = (id,sid) => {
      console.log("EBAR TO HO  ",id," ",sid._id)
      if(selectedRowCount==1)
      {
        setDialogTitle("Are you sure you want to reject this particular request?")
        setSingleRejectionId(id)
        setSingleRejectionStudentsId(sid._id)
        setSingleRejectionStatus(true)
      }
      else if(selectedRowCount>1) setDialogTitle("Please select only one request to reject")
      else setDialogTitle("Please select atleast one request to reject")

      console.log("SELECTED R2 ",selectedRowData.length)
      setOpen(true);
    };
    
  
    const actionColumn = [
      {
        field: "action",
        headerName: "Action",
        width: 230,
        renderCell: (params) => {
          return (
            <div className="cellAction">
              <button style={{ textDecoration: "none" }} onClick={event => showInfo(params.row._id)}>
                <div className="viewButton">View</div>
              </button>
              <div
                className="deleteButton"
                 onClick={() => 
                  {
                    handleClickOpenSingleRejection(params.row._id,params.row.studentsId)

                  }}
              >
                Reject
              </div>
            </div>
          );
        },
      },
    ];
    
   

    

  

    return (
        <div className='roomApplicationList'>
          {loading?"Loading":(
            <>
              <Sidebar info={SideBarDataProvost}/>
              <div className="roomApplicationListContainer">
                <Navbar/>
                <div className="top">
                  <div className="left">
                  


                  {/* <Datatable showInfo = {showInfo} /> */}

                    {/* {loading?"Loading":(
                    <> */}
                    <div className="datatable">
                      <div className="datatableTitle">
                        Applications
                      </div>
                      {/* getRowId={(row) => row._id} */}
                      <DataGrid
                        className="datagrid"
                        rows={data}
                        columns={userColumns.concat(actionColumn)}
                        getRowId={(row) => row._id}
                        pageSize={7}
                        rowsPerPageOptions={[7]}
                        checkboxSelection
                        onSelectionModelChange={
                          (ids) => {
                          const selectedIDs = new Set(ids);
                          selectedRowData = data.filter((row) =>
                            selectedIDs.has(row._id.toString()),
                          );
                          // const selectedStudentsIDs = new Set(ids);
                          // selectedStudentsId = data.filter((row) =>
                          //   selectedStudentsIDs.has(row.studentId.toString()),
                          // );

                          setSelectedRow(selectedRowData);
                          setSelectedRowCount(selectedRowData.length)


                          console.log("B ",selectedRowData);  
                          console.log("KILL MEHHHHHHHHHHHHHH ",ids);
                          }
                        }
                      />
                    </div>
                    
                    

                    <div className="submitBtns">
                      <button className="btnApproved" onClick={handleClickOpenApproval}>Approve Selected</button>
                      <button className="btnRejected"
                      onClick= {handleClickOpenRejection}>
                        Reject Selected
                      </button>
                  </div>





                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    
                  > 
                    <DialogTitle id="alert-dialog-title"  dialogcontent={dialogtitle}>
                    {dialogtitle} 
                    </DialogTitle>

                    <DialogContent >
                      <DialogContentText id="alert-dialog-description">
                        {/* {dialogcontent} */}
                      </DialogContentText>
                    </DialogContent>
                    
                    {approvalStatus?
                      <DialogActions>
                        
                        <Button onClick={handleMultipleApproval} autoFocus>
                          Yes  
                        </Button>
                        <Button onClick={handleClose}>No</Button>
                      </DialogActions>
                    :<></>}
                    {rejectionStatus?
                      <DialogActions>
                        
                        <Button onClick={handleMultipleDelete} autoFocus>
                          Yes
                        </Button>
                        <Button onClick={handleClose}>No</Button>
                      </DialogActions>
                    :<></>}
                    {singleRejectionStatus?
                      <DialogActions>
                        
                        <Button onClick={handleSingleDelete} autoFocus>
                          Yes
                        </Button>
                        <Button onClick={handleClose}>No</Button>
                      </DialogActions>
                    :<></>}
                  </Dialog>



                </div>

                <div className="right">
                <div className="editButton"></div>
              
              <h1 className="title">Information </h1>
          
        
              {id?
              <div className="item">
              
                <div className="details">
                  <div className="detailItem" >
                    <img
                      src= {item()[0].img}
                      alt=""
                      className="itemImg"
                    />
                  </div>
                  <div className="detailItem" >
                      <span className="itemKey">Student Name : </span>
                      <span className="itemValue">{item()[0].username}</span>
                  </div>
                  <div className="detailItem" >
                      <span className="itemKey">Student ID : </span>
                      <span className="itemValue">{item()[0].studentId}</span>
                  </div>
                  <div className="detailItem" >
                      <span className="itemKey">Email : </span>
                      <span className="itemValue">{item()[0].email}</span>
                  </div>
                  <div className="detailItem" >
                      <span className="itemKey">CGPA : </span>
                      <span className="itemValue">{item()[0].cgpa}</span>
                  </div>
                  <div className="detailItem" >
                      <span className="itemKey">Level-Term : </span>
                      <span className="itemValue">{item()[0].level}-{item()[0].term}</span>
                  </div>
                  <div className="detailItem" >
                      <span className="itemKey">Present Address : </span>
                      <span className="itemValue">{item()[0].present_address}</span>
                  </div>
                  <div className="detailItem" >
                      <span className="itemKey">Permanent Address : </span>
                      <span className="itemValue">{item()[0].permanent_address}</span>
                  </div>
                  <div className="detailItem" >
                      <span className="itemKey">Cocurriculam Activities : </span>
                      {item()[0].sports?(<span className="itemValue"> Sports </span>)
                      :<p></p>}
                      {item()[0].debate?(<span className="itemValue"> Debate </span>)
                      :<p></p>}
                      {item()[0].other?(<span className="itemValue"> Others </span>)
                      :<p></p>}
                  </div>
                  <div className="detailItem" >
                    <span className="itemValue">
                      <div className="buttons">
                          <div className="editButton" >
                            <span onClick={() => setShow(true)}> <PictureAsPdfIcon className='icon'/> See Attachment </span>
                          </div>
                      </div>
                    </span>
                  </div>
                </div>  
              </div>
              : <p>  </p> }   
              {/* </>
              )}         */}

                </div>
               </div>
                  
                <div className="bottom">
                  <div className='progressbar'>
                    <h1 className="title">Room Applications</h1>
                    <Progressbar info={rommRequestProgress}/>
                  </div>
                </div>
      
              </div>
            </>
          )}

        </div>
      )
}

export default RoomApplicationList