import React, { useState } from 'react'
import Navbar from '../../../components/navbar/Navbar'
import Sidebar from '../../../components/sidebar/Sidebar'
import { SideBarDataDiningManager, SideBarDataStd } from "../../../components/sidebar/SideBarData"
import "./fundrequest.scss"
import axios from "axios";


import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { Alert } from '@mui/material'
import useFetch from '../../../hooks/useFetch'



const FundRequestStd = () => {
  const [info, setInfo] = useState({});
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);


  
  const { user } = useContext(AuthContext);

  const handleChangeText = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    console.log(info)
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const newRequest = {
        ...info,
        studentNo: user.studentId,
      };

      console.log(newRequest)

      const res = await axios.post("/students/fundrequest/create", newRequest);
    
      setInfo({title:"",description:"",amount:""})
      setSuccess(true);
    }
    catch {
      setInfo({title:"",description:"",amount:""})
      setFail(true);
    }
  };

  const isManager = useFetch("/dining/checkManager/get/"+user._id);

  return (
    <div className='fundRequest'>
      {isManager.loading?"Loading":(
            <>
        {isManager.data.isManager?<Sidebar info={SideBarDataDiningManager}/>:<Sidebar info={SideBarDataStd}/>}
        <div className="fundRequestContainer">
          <Navbar/>
          <form action="#" method="post">
            <br></br>
            <label htmlFor="title">Title: </label>
            <input type="text" id='title' value={info.title} placeholder="Title" onChange={handleChangeText}/>


            <label htmlFor="amount">Amount: </label>
            <input type="text" id='amount' value={info.amount} placeholder="Amount" onChange={handleChangeText}/>

            
            <label htmlFor="description">Why do you need this Fund?</label>
            <textarea name="" id="description" value={info.description} cols="500" rows="15" placeholder='Application' onChange={handleChangeText}></textarea>

            <button type="submit" onClick={handleClick}>Submit Application</button>
                {success?
                <Alert severity="success">Submit Successful</Alert>:<></>
                }
                {fail?
                <Alert variant="filled" severity="error">
                  Submit failed
                </Alert>
                :<></>
                
                }
          </form>
        </div>
        </>
          )}
      </div>
  )
}

export default FundRequestStd