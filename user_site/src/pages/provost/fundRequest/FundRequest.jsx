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

const RoomApplicationList = () => {
    const [id,setID] = useState(null)
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

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

    const item = ()=> {
        if (id) {
            return data.filter((x) => x._id === id)
        }
        return null
    }



    const userColumns = [
      // { field: "id", headerName: "ID", width: 70 },
      {
        field: "username",
        headerName: "Name",
        width: 230,
        renderCell: (params) => {
          return (
            <div className="cellWithImg">
              {/* <img className="cellImg" src={params.row.img} alt="avatar" />
              {params.row.username} */}
            </div>
          );
        },
      },
      {
        field: 'studentId',
        headerName: "SID",
        width: 100,
      },
    
      {
        field: "LT",
        headerName: "LT",
        width: 100,
      },
    ];

    const handleDelete = (id) => {
      setData(data.filter((item) => item._id !== id));
    };
  
    const actionColumn = [
      {
        field: "action",
        headerName: "Action",
        width: 200,
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
        <div className='fundRequest'>
          {loading?"Loading":(
            <>
              <Sidebar info={SideBarDataProvost}/>
              <div className="fundRequestContainer">
                <Navbar/>
                <div className="top">
                <div className="left">
                <div className="editButton">
              </div>
              
              <h1 className="title">Information </h1>
              {/* {loading?"Loading":(
                <> */}
                {/* <div>Hello</div>
                <div className="Ff">
                  {data.map((student) => (
                    <div className="studentId">{student._id}</div>
                  ))}
                </div>  */}
              
            
              {id?
              <div className="item">
              
                {/* <img
                  src= {item()[0].img}
                  alt=""
                  className="itemImg"
                /> */}
                <div className="details">
                  {/* <h1 className="itemTitle">{item()[0].username}</h1> */}
                  <div className="detailItem" >
                      <span className="itemKey">SID : </span>
                      <span className="itemValue">{item()[0].studentId}</span>
                  </div>
                  <div className="detailItem" >
                      <span className="itemKey">Email : </span>
                      {/* <span className="itemValue">{item()[0].email}</span> */}
                  </div>
                  <div className="detailItem" >
                      <span className="itemKey">SID : </span>
                      {/* <span className="itemValue">{item()[0].LT}</span> */}
                  </div>
                </div>  
              </div>
              : <p>  </p> }   
              {/* </>
              )}         */}
            </div>

                <div className="right">
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
                        pageSize={6}
                        rowsPerPageOptions={[6]}
                        checkboxSelection
                      />
                    </div>
                    
                    

                    <div className="submitBtns">
                      <button className="btnApproved">Approve Selected</button>
                      <button className="btnRejected">Reject Selected</button>
                    </div>

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