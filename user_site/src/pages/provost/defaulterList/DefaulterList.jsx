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

import Box from '@mui/material/Box';
import clsx from 'clsx';
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
    const [singleSelectionStudentsId, setSingleSelectionStudentsId] = React.useState(null);

    const [singleWarning, setSingleWarning] = React.useState(null);
    const [singleMealOff, setSingleMealOff] = React.useState(null);
    const [singleSeatCancel, setSingleSeatCancel] = React.useState(null);
    const [singleClear, setSingleClear] = React.useState(null);

    const [multipleWarning, setMultipleWarning] = React.useState(null);
    const [multipleMealOff, setMultipleMealOff] = React.useState(null);
    const [multipleSeatCancel, setMultipleSeatCancel] = React.useState(null);
    const [multipleClear, setMultipleClear] = React.useState(null);

    const [studentState, setStudentState] = useState([]);

    let studentNameData = []
    let selectedRowData = []
    let selectedStudentsId = []
    let requestState = []
    let Id=""
    let studentId=""
    let dialogueboxMessage=""
    let dueInfo = ""

    const showInfo = num => {
        setID(num)
        console.log("NUM ",num)
    }



   
    useEffect(() => {
      const fetchData = async () => {
      setLoading(true);
      // setApprovalStatus(false);
      // setRejectionStatus(false);
      // setSingleRejectionStatus(false);
      // setSingleRejectionStudentsId(null);

      setSingleWarning(false);
      setSingleMealOff(false);
      setSingleSeatCancel(false);
      setSingleClear(false);

      setMultipleWarning(false);
      setMultipleMealOff(false);
      setMultipleSeatCancel(false);
      setMultipleClear(false);

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
                warning: item.warning,
                mealOff: item.mealOff,
                seatCancel: item.seatCancel,
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
        type: 'string',

      //   cellClassName: (params: GridCellParams<string>) => {
      //     if (params.value == null) {
      //       return '';
      //     }
    
      //     return clsx('super-app', {
      //       negative: params.value < 0,
      //       positive: params.value > 0,
      //     });

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
    ];
   } 

  
  
    const handleClose = () => {
      console.log("SELECTED H1 ",selectedRowData.length)
      setOpen(false);
      console.log("SELECTED H2 ",selectedRowData.length)
      dueInfo = ""
      setDialogTitle(null)
      setDialogContent(null)
      setSingleWarning(false)
      setSingleMealOff(false)
      setSingleSeatCancel(false)
      setSingleClear(false)
      setMultipleWarning(false)
      setMultipleMealOff(false)
      setMultipleSeatCancel(false)
    };


  

    const handleMultipleUpdate = async (e) =>  {
      try{
        var keys = Object.keys( selectedRowData );
        console.log("ARRAY LENGTH ",SelectedRow);

        let newRequest = {}
        let due_response = ""

        if(multipleWarning) {newRequest = { warning: true }; due_response = "Warning!!Clear your due as soon as possible"}
        if(multipleMealOff) {newRequest = { mealOff: true }; due_response = "Your meal has been turned off"}
        if(multipleSeatCancel) {newRequest = { seatCancel: true }; due_response = "Your seat has been cancelled"}
        if(multipleClear) {newRequest = { clear: true }; due_response = "Your due has been cleared"}
  
        var keys = Object.keys( SelectedRow );
        for( var i = 0,length = keys.length; i < length; i++ ) 
        {
          console.log("ARRAY IDS ",SelectedRow[ keys[ i ] ]._id);
          
          var main_url = "/defaulters/"+SelectedRow[ keys[ i ] ]._id;
          var deleteURL = "/defaulters/deleteDefaulter/"+SelectedRow[ keys[ i ] ]._id;

          console.log("MEH ",deleteURL);
          
          const newNotification = {
            studentsId: SelectedRow[ keys[ i ] ].studentsId,
            title: "Due Payment Notification",
            description: due_response,
            seen: false,
          };

          let notificationURL = "/notifications/createNotification/"+SelectedRow[ keys[ i ] ].studentsId;
          axios.post(notificationURL, newNotification);
          
          if(multipleSeatCancel) 
          {
            var main_url = "/students/"+SelectedRow[ keys[ i ] ].studentsId._id;
            console.log("WHAT ",main_url)
            const newRequest = {
              roomNo: "seat cancelled"
            };
            axios.put(main_url, newRequest);
          }

          if(!multipleClear) {
            axios.put(main_url, newRequest);
            setDialogTitle("Operation Successful");
          }
          else{
            axios.delete(deleteURL)
            //handleClose();
            //window.location.reload(false)
          } 
          
        }

        setMultipleWarning(false)
        setMultipleMealOff(false)
        setMultipleSeatCancel(false)
        //////////setMultipleClear(false)

        
      
      
      ////////////////////////  window.location.reload(false);
        
       }
       catch(err){
          console.log("ERROR")
       }
       if(multipleClear) {
        window.location.reload(false)
      }

       
     }


   

    const handleClickOpenMultipleWarning = () => {
      console.log("SELECTED R1 ",selectedRowData.length)
      if(selectedRowCount>0)
      {
        setDialogTitle("Are you sure you want to warn these students?")
        setMultipleWarning(true)
      }
      else setDialogTitle("Please select atleast one request to warn")

      console.log("SELECTED R2 ",selectedRowData.length)
      setOpen(true);
    };

    const handleClickOpenMultipleMealOff = () => {
      console.log("SELECTED R1 ",selectedRowData.length)
      if(selectedRowCount>0)
      {
        setDialogTitle("Are you sure you want to off meal of these students?")
        setMultipleMealOff(true)
      }
      else setDialogTitle("Please select atleast one request to off meal")

      console.log("SELECTED R2 ",selectedRowData.length)
      setOpen(true);
    };

    const handleClickOpenMultipleSeatCancel = () => {
      console.log("SELECTED R1 ",selectedRowData.length)
      if(selectedRowCount>0)
      {
        setDialogTitle("Are you sure you want to cancel seat of these students?")
        setMultipleSeatCancel(true)
      }
      else setDialogTitle("Please select atleast one request to cancel seat")

      console.log("SELECTED R2 ",selectedRowData.length)
      setOpen(true);
    };

    const handleClickMultipleOpenClear = () => {
      console.log("SELECTED R1 ",selectedRowData.length)
      if(selectedRowCount>0)
      {
        setDialogTitle("Are you sure you want to clear dues of these students?")
        setMultipleClear(true)
      }
      else setDialogTitle("Please select atleast one request to clear the due")

      console.log("SELECTED R2 ",selectedRowData.length)
      setOpen(true);
    };
  
    
    const handleSingleUpdate = () => {
      var main_url = "/defaulters/"+singleSelectionDefaulterId;
      var deleteURL = "/defaulters/deleteDefaulter/"+singleSelectionDefaulterId;
      console.log("URL ",main_url)
      console.log("Delete URL ",deleteURL)

      let newRequest = {}
      let due_response = ""
      if(singleWarning) {newRequest = { warning: true }; due_response = "Warning!!Clear your due as soon as possible"}
      if(singleMealOff) {newRequest = { mealOff: true }; due_response = "Your meal has been turned off"}
      if(singleSeatCancel) {newRequest = { seatCancel: true }; due_response = "Your seat has been cancelled"}
      if(singleClear) {newRequest = { clear: true }; due_response = "Your due has been cleared"}
        
      

       const newNotification = {
        studentsId: singleSelectionStudentsId,
        title: "Due Payment Notification",
        description: due_response,
        seen: false,
      };

      let notificationURL = "/notifications/createNotification/"+singleSelectionStudentsId;
      axios.post(notificationURL, newNotification);
      
      if(singleSeatCancel) 
      {
        var main_url = "/students/"+singleSelectionStudentsId;
        const newRequest = {
          roomNo: "seat cancelled"
        };
        axios.put(main_url, newRequest);
      }

      if(!singleClear) axios.put(main_url, newRequest);
      else{
        setData(data.filter((item) => item._id !== singleSelectionDefaulterId));
        axios.delete(deleteURL)
      } 
      
      setSingleWarning(false)
      setSingleMealOff(false)
      setSingleSeatCancel(false)
      setSingleClear(false)

      setDialogTitle("Operation Successful");
    }
    const handleClickSingleWarning = (id,sid) => {
      setDialogTitle("Are you sure you want to warn this particular request?");
      setSingleWarning(true);
      setSingleSelectionDefaulterId(id);
      setSingleSelectionStudentsId(sid);
      setOpen(true);
    }
    const handleClickSingleMealOff = (id,sid) => {
      setDialogTitle("Are you sure you want to off meal this particular request?");
      setSingleMealOff(true);
      setSingleSelectionDefaulterId(id);
      setSingleSelectionStudentsId(sid);
      setOpen(true);
    }
    const handleClickSingleSeatCancel = (id,sid) => {
      setDialogTitle("Are you sure you want to cancel seat this particular request?");
      setSingleSeatCancel(true);
      setSingleSelectionDefaulterId(id);
      setSingleSelectionStudentsId(sid);
      setOpen(true);
    }
    const handleClickSingleClear = (id,sid) => {
      setDialogTitle("Are you sure you want to clear the due this particular request?");
      setSingleClear(true);
      setSingleSelectionDefaulterId(id);
      setSingleSelectionStudentsId(sid);
      setOpen(true);
    }

    const handleClickDueInfo = (msg,warn,mealOff,seatCancel) => {
      setDialogTitle("Due Info")
      dueInfo = msg+"\n"
      if(warn) dueInfo = dueInfo+"+ Already warning has been sent\n"
      if(mealOff) dueInfo = dueInfo+"+ Already meal has been turned off\n"
      if(seatCancel) dueInfo = dueInfo+"+ Already seat has been cancelled\n"
      console.log("DUE INFO \n",dueInfo," ",warn)

      setDialogContent(dueInfo)

      setOpen(true);
    }
    const actionColumn = [
      {
        field: "action",
        headerName: "Action",
        width: 500,
        renderCell: (params) => {
          return (
            <div className="cellAction">
                <div className="deleteButton" style={{borderColor: "blue", textColor: "blue"}} 
                  onClick={event => handleClickDueInfo(params.row.message,params.row.warning,params.row.mealOff,params.row.seatCancel)}>
                    Due Info
                </div>
              <div
                className="deleteButton" onClick={() => {handleClickSingleWarning(params.row._id,params.row.studentsId._id)}}>
                Warning
              </div>
              {/* <div
                className="deleteButton" onClick={() => {handleClickSingleMealOff(params.row._id,params.row.studentsId._id)}}>
                Meal Off
              </div> */}
              <div
                className="deleteButton" onClick={() => {handleClickSingleSeatCancel(params.row._id,params.row.studentsId._id)}}>
                Seat Cancel
              </div>
              <div
                className="deleteButton" style={{borderColor: "green", fontColor: "green"}} 
                  onClick={() => {handleClickSingleClear(params.row._id,params.row.studentsId._id)}}>
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
                      <button className="btnWarning" onClick={handleClickOpenMultipleWarning}>
                        Warn selected
                      </button>
                      {/* <button className="btnMealOff" onClick= {handleClickOpenMultipleMealOff}>
                        Meal Off Selected
                      </button> */}
                      <button className="btnSeatCancel" onClick= {handleClickOpenMultipleSeatCancel}>
                        Seat Cancel Selected
                      </button>
                      <button className="btnClear" onClick= {handleClickMultipleOpenClear}>
                        Clear Selected
                      </button>
                  </div>





                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    
                  > 
                    <DialogTitle id="alert-dialog-title">
                    {dialogtitle} 
                    </DialogTitle>

                    <DialogContent >
                      <DialogContentText id="alert-dialog-description">
                        {dialogContent}
                      </DialogContentText>
                    </DialogContent>
                    
                    {(singleWarning || singleMealOff || singleSeatCancel || singleClear)?
                      <DialogActions>
                        
                        <Button onClick={handleSingleUpdate} autoFocus>
                          Yes  
                        </Button>
                        <Button onClick={handleClose}>No</Button>
                      </DialogActions>
                    :<></>}
                    {(multipleWarning || multipleMealOff || multipleSeatCancel || multipleClear)?
                      <DialogActions>
                        
                        <Button onClick={handleMultipleUpdate} autoFocus>
                          Yes  
                        </Button>
                        <Button onClick={handleClose}>No</Button>
                      </DialogActions>
                    :<></>}
                    {/* {rejectionStatus?
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
                    :<></>} */}
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