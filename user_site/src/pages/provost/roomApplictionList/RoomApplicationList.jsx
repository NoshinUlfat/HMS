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

const RoomApplicationList = () => {
    const [id,setID] = useState(null)
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const showInfo = num => {
        setID(num)
    }
    const item = ()=> {
        if (id) {
            return userRows.filter((x) => x.id === id)
        }
        return null
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

  

    return (
        <div className='roomApplicationList'>
            <Sidebar info={SideBarDataProvost}/>
            <div className="roomApplicationListContainer">
              <Navbar/>
              <div className="top">
              <div className="left">
              <div className="editButton">
            </div>
            
            <h1 className="title">Information </h1>
            {loading?"Loading":(
              <>
              <div>Hello</div>
              <div className="Ff">
            {data.map((student) => (
              <div className="studentId">{student._id}</div>
            ))}
            </div> 
              </>
            )}
            {/* <div className="Ff">
            {data.map((student) => (
              <div className="studentId">{student._id}</div>
            ))}
            </div> */}
            {id?
            <div className="item">
            
              <img
                src= {item()[0].img}
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{item()[0].username}</h1>
                <div className="detailItem" >
                    <span className="itemKey">SID : </span>
                    <span className="itemValue">{item()[0].SID}</span>
                </div>
                <div className="detailItem" >
                    <span className="itemKey">Email : </span>
                    <span className="itemValue">{item()[0].email}</span>
                </div>
                <div className="detailItem" >
                    <span className="itemKey">SID : </span>
                    <span className="itemValue">{item()[0].LT}</span>
                </div>
              </div>  
            </div>
            : <p>  </p> }           
              </div>
              <div className="right">
              <Datatable showInfo = {showInfo} />
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
        </div>
      )
}

export default RoomApplicationList