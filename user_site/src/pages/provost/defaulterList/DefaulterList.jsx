import React, { useEffect, useState } from 'react'
import Datatable from "../../../components/datatable/DataTable"
import Navbar from '../../../components/navbar/Navbar'
import Progressbar from '../../../components/progressbar/Progressbar'
import { rommRequestProgress } from '../../../components/progressbar/progressbarData'
import Sidebar from '../../../components/sidebar/Sidebar'
import { SideBarDataProvost } from "../../../components/sidebar/SideBarData"
import "./defaulterList.scss"

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

    const [warn, setWarn] = React.useState(null);
    const [mealOff, setMealOff] = React.useState(null);
    const [seatCancel, setSeatCancel] = React.useState(null);
    const [clear, setClear] = React.useState(null);

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

      setWarn(false);
      setMealOff(false);
      setSeatCancel(false);
      setClear(false);

      try {

       // const { data: response } = 
        await axios.get("/defaulters")
        .then( data => {
          let st = data.data;
          setData(
            st.map(item => {
              //if(item.approvalStatus !== "pending"){
              return {
                _id: item._id,
                studentId: item.studentsId.studentId,
                studentsId: item.studentsId,
                username: item.studentsId.username,
                img: item.studentsId.img,
                message: item.message,
                dueType: item.dueType,
                dueAmount: item.dueAmount,
                checked: false,
              };
            //}
            })
          );
        })
        
      
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
        width: 150,
      },
      {
        field: 'dueType',
        headerName: "Due Type",
        width: 150,
      },
      {
        field: 'dueAmount',
        headerName: "Due Amount",
        width: 150,
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

      // console.log("IN DELETE ROOM REQUEST", singleRejectionStudentsId)
      // const newRequest = {
      //   studentsId: singleRejectionStudentsId,
      //   title: "Room Request Response",
      //   description: "Your room request has been rejected",
      //   seen: true,
      // };

      // let notificationURL = "/notifications/createNotification/"+singleRejectionStudentsId;
      // let deleteURL = "/roomAllotments/deleteRoomRequest/"+singleRejectionId;
      
      
      // axios.post(notificationURL, newRequest);
      // axios.delete(deleteURL);
      handleClose();
    };


  

    const handleMultipleSelection = async (e) =>  {
      try{
        // var keys = Object.keys( selectedRowData );
        // console.log("ARRAY LENGTH ",SelectedRow);
  
        // var keys = Object.keys( SelectedRow );
        // for( var i = 0,length = keys.length; i < length; i++ ) 
        // {
        //   console.log("ARRAY IDS ",SelectedRow[ keys[ i ] ]._id);
  
        //   const req_details = await axios.get("/roomAllotments/requestDetails/"+SelectedRow[ keys[ i ] ]._id)
        //   let notificationURL = "/notifications/createNotification/"+req_details.data.studentsId;
  
          
        //   const newRequest = {
        //     studentsId: req_details.data.studentsId,
        //     title: "Room Request Response",
        //     description: "Your room request has been approved",
        //     seen: true,
        //   };
        //   axios.post(notificationURL, newRequest);
        //   console.log("MEAU RESPONSE ",req_details.data.studentsId);
        //   axios.delete("/roomAllotments/deleteRoomRequest/"+SelectedRow[ keys[ i ] ]._id);
          
        // }
      
      
      
        window.location.reload(false);
        
       }
       catch(err){
          console.log("ERROR")
       }
       handleClose();
     }


   

    const handleClickOpenWarning = () => {
      console.log("SELECTED R1 ",selectedRowData.length)
      if(selectedRowCount>0)
      {
        setDialogTitle("Are you sure you want to warn these students?")
        setWarn(true)
      }
      else setDialogTitle("Please select atleast one request to warn")

      console.log("SELECTED R2 ",selectedRowData.length)
      setOpen(true);
    };

    const handleClickOpenMealOff = () => {
      console.log("SELECTED R1 ",selectedRowData.length)
      if(selectedRowCount>0)
      {
        setDialogTitle("Are you sure you want to off meal of these students?")
        setMealOff(true)
      }
      else setDialogTitle("Please select atleast one request to off meal")

      console.log("SELECTED R2 ",selectedRowData.length)
      setOpen(true);
    };

    const handleClickOpenSeatCancel = () => {
      console.log("SELECTED R1 ",selectedRowData.length)
      if(selectedRowCount>0)
      {
        setDialogTitle("Are you sure you want to cancel seat of these students?")
        setSeatCancel(true)
      }
      else setDialogTitle("Please select atleast one request to cancel seat")

      console.log("SELECTED R2 ",selectedRowData.length)
      setOpen(true);
    };

    const handleClickOpenClear = () => {
      console.log("SELECTED R1 ",selectedRowData.length)
      if(selectedRowCount>0)
      {
        setDialogTitle("Are you sure you want to clear dues of these students?")
        setClear(true)
      }
      else setDialogTitle("Please select atleast one request to clear the due")

      console.log("SELECTED R2 ",selectedRowData.length)
      setOpen(true);
    };
  


    const handleClickOpenSingleRejection = (id,sid) => {
      console.log("EBAR TO HO  ",id," ",sid._id)
      if(selectedRowCount<=1)
      {
        setDialogTitle("Are you sure you want to reject this particular request?")
        setSingleRejectionId(id)
        setSingleRejectionStudentsId(sid._id)
        setSingleRejectionStatus(true)
      }
      else if(selectedRowCount>1) setDialogTitle("Please select only one request to reject")
     // else setDialogTitle("Please select atleast one request to reject")

      console.log("SELECTED R2 ",selectedRowData.length)
      setOpen(true);
    };
    
  
    const actionColumn = [
      {
        field: "action",
        headerName: "Action",
        width: 500,
        renderCell: (params) => {
          return (
            <div className="cellAction">
                <div className="deleteButton" style={{borderColor: "blue"}}>Due Info</div>
              
              <div
                className="deleteButton" onClick={() => {}}>
                Warning
              </div>
              <div
                className="deleteButton" onClick={() => {}}>
                Meal Off
              </div>
              <div
                className="deleteButton" onClick={() => {}}>
                Seat Cancel
              </div>
              <div
                className="deleteButton" onClick={() => {}}>
                Clear
              </div>
            </div>
          );
        },
      },
    ];
    
   

    

  

    return (
        <div className='defaulterList'>
          {loading?"Loading":(
            <>
              <Sidebar info={SideBarDataProvost}/>
              <div className="defaulterListContainer">
                <Navbar/>
                <div className="top">
                  <div className="left">
                  


                  {/* <Datatable showInfo = {showInfo} /> */}

                    {/* {loading?"Loading":(
                    <> */}
                    <div className="datatable">
                      <div className="datatableTitle">
                        Defaulter List
                      </div>
                      {/* getRowId={(row) => row._id} */}
                      <DataGrid
                        className="datagrid"
                        rows={data}
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
                      <button className="btnWarning" onClick={handleClickOpenWarning}>
                        Warn selected
                      </button>
                      <button className="btnMealOff" onClick= {handleClickOpenMealOff}>
                        Meal Off Selected
                      </button>
                      <button className="btnSeatCancel" onClick= {handleClickOpenSeatCancel}>
                        Seat Cancel Selected
                      </button>
                      <button className="btnClear" onClick= {handleClickOpenClear}>
                        Clear Selected
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
                        
                        <Button onClick={handleMultipleSelection} autoFocus>
                          Yes  
                        </Button>
                        <Button onClick={handleClose}>No</Button>
                      </DialogActions>
                    :<></>}
                    {rejectionStatus?
                      <DialogActions>
                        
                        <Button onClick={handleMultipleSelection} autoFocus>
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