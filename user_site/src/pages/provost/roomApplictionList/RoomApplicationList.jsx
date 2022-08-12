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

const RoomApplicationList = () => {
    const [id,setID] = useState(null)
    const [data, setData] = useState([]);
    const [colName, setcolName] = useState([]);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);

    let studentNameData = []

    const showInfo = num => {
        setID(num)
        console.log("NUM ",num)
    }

    useEffect(() => {
      const fetchData = async () => {
      setLoading(true);
      try {
        // const res = axios.get("/roomAllotments");
      
        // console.log("VCVCccccccccccccc ",res.data)

        // console.log("logindwcwfff ",res.data.details);///////////
        const { data: response } = await axios.get("/roomAllotments");
        setData(response);

        console.log("VCVCccccccccccccc ",response[0].studentsId);
        var keys = Object.keys( response );
        for( var i = 0,length = keys.length; i < length; i++ ) {
          studentNameData[i] = response[ keys[ i ] ].studentsId.username
          console.log(studentNameData[i]);
        }

        setcolName(studentNameData)
        console.log("BBBBBBBBBBBB   ",studentNameData)
  
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
              <img className="cellImg" src={params.row.studentsId.img} alt="" />   
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

    const handleDelete = (id) => {
      setData(data.filter((item) => item._id !== id));
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
                 onClick={() => handleDelete(params.row.id)}
              >
                Reject
              </div>
            </div>
          );
        },
      },
    ];
    
    const userRows = [
      {
        id: 1,
        SID: 1705088,
        username: "Snow",
        img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
        status: "active",
        email: "1snow@gmail.com",
        LT: "1-2",
      },
      {
        id: 2,
        SID: 1705088,
        username: "Jamie Lannister",
        img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
        email: "2snow@gmail.com",
        status: "passive",
        LT: "1-2",
      },
      {
        id: 3,
        SID: 1705088,
        username: "Lannister",
        img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
        email: "3snow@gmail.com",
        status: "pending",
        LT: '1-2',
      },
      
    ];
    const [eData, seteData] = useState(userRows);

    

  

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
                      />
                    </div>
                    
                    

                    <div className="submitBtns">
                      <button className="btnApproved">Approve Selected</button>
                      <button className="btnRejected">Reject Selected</button>
                    </div>
                </div>

                <div className="right">
                <div className="editButton"></div>
              
              <h1 className="title">Information </h1>
          
        
              {id?
              <div className="item">
              
                <div className="details">
                  <div className="detailItem" >
                    <img
                      src= {item()[0].studentsId.img}
                      alt=""
                      className="itemImg"
                    />
                  </div>
                  <div className="detailItem" >
                      <span className="itemKey">Student Name : </span>
                      <span className="itemValue">{item()[0].studentsId.username}</span>
                  </div>
                  <div className="detailItem" >
                      <span className="itemKey">Student ID : </span>
                      <span className="itemValue">{item()[0].studentId}</span>
                  </div>
                  <div className="detailItem" >
                      <span className="itemKey">Email : </span>
                      <span className="itemValue">{item()[0].studentsId.email}</span>
                  </div>
                  <div className="detailItem" >
                      <span className="itemKey">CGPA : </span>
                      <span className="itemValue">{item()[0].studentsId.cgpa}</span>
                  </div>
                  <div className="detailItem" >
                      <span className="itemKey">Level-Term : </span>
                      <span className="itemValue">{item()[0].studentsId.level}-{item()[0].studentsId.term}</span>
                  </div>
                  <div className="detailItem" >
                      <span className="itemKey">Present Address : </span>
                      <span className="itemValue">{item()[0].studentsId.present_address}</span>
                  </div>
                  <div className="detailItem" >
                      <span className="itemKey">Permanent Address : </span>
                      <span className="itemValue">{item()[0].studentsId.permanent_address}</span>
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