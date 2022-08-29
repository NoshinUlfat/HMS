import React, { useEffect, useState } from 'react'
import PdfViewer from "../../../components/pdfViewer/PdfViewer";
import Navbar from '../../../components/navbar/Navbar'
import Progressbar from '../../../components/progressbar/Progressbar'
import { rommRequestProgress } from '../../../components/progressbar/progressbarData'
import Sidebar from '../../../components/sidebar/Sidebar'
import { SideBarDataProvost } from "../../../components/sidebar/SideBarData"
import "./roomApplicationList.scss"

import axios from "axios"

import { DataGrid } from "@mui/x-data-grid";

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

    let studentNameData = []
    let selectedRowData = []

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
        await axios.get("/roomAllotments")
        .then( data => {
          let st = data.data;
          setData(
            st.map(item => {
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
                roomNo: item.studentsId.roomNo,
                preferredRoomNo: item.preferredRoomNo,
                img: item.studentsId.img,
                file: item.file,
                checked: false,
              };
            //}
            })
          );
        })
        
        console.log("student name data ",studentNameData)
        setcolName(studentNameData)
  
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

          
          var main_url = "/students/"+SelectedRow[ keys[ i ] ].studentsId._id;
          console.log("WHAT ",main_url)
          const newUpdate = {
            roomNo: SelectedRow[ keys[ i ] ].preferredRoomNo,
          };
          axios.put(main_url, newUpdate);
          

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
      if(selectedRowCount<=1)
      {
        setDialogTitle("Are you sure you want to reject this particular request?")
        setSingleRejectionId(id)
        setSingleRejectionStudentsId(sid._id)
        setSingleRejectionStatus(true)
      }
      else if(selectedRowCount>1) setDialogTitle("Please select only one request to reject")

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
    
   
    const pdfClickHandler = async (fileName) => {
      // const html = ReactDOMServer.renderToStaticMarkup(renderRows(names))
      // try {
      //   const response = await axios.post(
      //     '/api/services/pdf',
      //     { html },
      //     {
      //       responseType: 'arraybuffer',
      //       headers: {
      //         Accept: 'application/pdf',
      //       },
      //     }
      //   )

      console.log("FILEEEEEEEEEE ",fileName)
  
        const file = new Blob([fileName], { type: 'application/pdf' })
  
        const fileURL = URL.createObjectURL(file)
  
        const pdfWindow = window.open()
  
        pdfWindow.location.href = fileURL
    }
    

  

    return (
        <div className='roomApplicationList'>
          {loading?"Loading":(
            <>
              <Sidebar info={SideBarDataProvost}/>
              <div className="roomApplicationListContainer">
                <Navbar/>
                <div className="top">
                  <div className="left">
                    <div className="datatable">
                      <div className="datatableTitle">
                        Room Change Applications
                      </div>
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
                      <span className="itemKey">Current Room No : </span>
                      <span className="itemValue">{item()[0].roomNo}</span>
                  </div>
                  <div className="detailItem" >
                      <span className="itemKey">Preferred Room No : </span>
                      <span className="itemValue">{item()[0].preferredRoomNo}</span>
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
                          <PdfViewer pdffile ={item()[0].file} buttonName={"See Attachment"} randId={item()[0].studentId}
                          styeAll={{ position: "absolute",
                            position: "absolute",
                            padding: "5px",
                            fontsize : "15px",
                            fontWeight : "bold",
                            backgroundcolor : "#D5CAFC",
                            border: "solid",
                            bordercolor: "#B9A8FB",
                            cursor: "pointer",
                            borderradius: "0px 0px 0px 5px"
          
                      
                          }}/>
                      </div>
                    </span>
                  </div>
                </div>  
              </div>
              : <p>  </p> }   

                </div>
               </div>
                  
                
      
              </div>
            </>
          )}

        </div>
      )
}

export default RoomApplicationList