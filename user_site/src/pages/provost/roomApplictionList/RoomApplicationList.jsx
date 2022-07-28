import "./roomApplicationList.scss"
import React, { useState } from 'react'
import Navbar from '../../../components/navbar/Navbar'
import Sidebar from '../../../components/sidebar/Sidebar'
import { SideBarDataProvost } from "../../../components/sidebar/SideBarData"
import Progressbar from '../../../components/progressbar/Progressbar'
import {rommRequestProgress} from '../../../components/progressbar/progressbarData'
import Datatable from "../../../components/datatable/DataTable"

import { userRows } from "./../../../components/datatable/datatablesource";
import axios from "axios";

const RoomApplicationList = () => {
    const [id,setID] = useState(null)

    const showInfo = num => {
        setID(num)
    }
    const item = ()=> {
        if (id) {
            return userRows.filter((x) => x.id === id)
        }
        return null
    }


    try {
      const res = axios.get("/roomAllotments");
    
        console.log("VCVCccccccccccccc ",res.data)

        console.log("logindwcwfff ",res.data.details);///////////
 
    } catch (err) {
      console.log(err)
    }

    return (
        <div className='roomApplicationList'>
            <Sidebar info={SideBarDataProvost}/>
            <div className="roomApplicationListContainer">
              <Navbar/>
              <div className="top">
              <div className="left">
              <div className="editButton">
            </div>
            <h1 className="title">Information</h1>
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