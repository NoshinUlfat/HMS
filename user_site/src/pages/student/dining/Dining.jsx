import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined"
import EditIcon from '@mui/icons-material/Edit'
import React, { useState } from 'react'
import Navbar from '../../../components/navbar/Navbar'
import Popup from '../../../components/popup/Popup'
import Sidebar from '../../../components/sidebar/Sidebar'
import { SideBarDataStd } from "../../../components/sidebar/SideBarData"
import "./dining.scss"

import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";


import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Box } from "@mui/material";
import styled from "@emotion/styled";
import CalendarPicker, { CalendarPickerProps } from "@mui/lab/CalendarPicker";
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText'

import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { mealDataList } from "./diningDataSource.js"
import Dialog from '../../../components/dialog/Dialog'
import useFetch from "../../../hooks/useFetch";

const adapter = new AdapterDateFns();



//import Calendar from "react-material-ui-calendar";
// import CalendarPicker, { CalendarPickerProps } from "@mui/lab/CalendarPicker";
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export const StyleWrapper = styled.div`
  .fc td {
    background: darkgray;
    height: 'parent';
  }
`



const Dining =  () => {

    const { user } = useContext(AuthContext);
    const [value, setValue] = useState(adapter.date());

    const isManager = useFetch("/dining/checkManager/get/"+user._id);
    const diningData = useFetch("/dining/getAllMeals");

    console.log(diningData.data)
    const diningDataLoading = diningData.loading

    const [meal, setMeal] = useState(diningData.data.filter((item) => 
      item.mealId && new Date(item.mealId.date).setUTCHours(0, 0, 0, 0) === adapter.date().setUTCHours(0, 0, 0, 0)
    ))

    console.log("user: " +user.studentId)
    console.log("meal: " + meal.map(item => item.mealId.mealHour).filter((v, i, a) => a.indexOf(v) === i))


    const handleCalanderClick = async (dateValue) => {
      try {
          setMeal(diningData.data.filter((item) => 
          item.mealId && new Date(item.mealId.date).setUTCHours(0, 0, 0, 0) === dateValue.setUTCHours(0, 0, 0, 0)
        ));
      } catch (err) {}
    };

    return (
        <div className='dining'>
            {diningData.loading?"Loading":<>
            <Sidebar info={SideBarDataStd}/>

            <div className="diningContainer">
                <Navbar/>
                <div className="top">
                <div className="left">
                    <div className="Calander">
                      <div className="CalanderTitle"></div>
                      <div className="CalanderBody">
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <StaticDatePicker
                          displayStaticWrapperAs="desktop"
                          value={value}
                          onChange={(newValue) => {
                            setValue(newValue);
                            handleCalanderClick(newValue);
                          }}
                          renderInput={(params) => <TextField {...params} />}
                          dayOfWeekFormatter={(day) => `${day}.`}
                          toolbarFormat="eee dd MMMM"
                          showToolbar
                        />
                      </LocalizationProvider>
                      </div>
                    </div>
                </div>

                <div className="right">
                  {
                    meal.map(item => item.mealId.mealHour).filter((v, i, a) => a.indexOf(v) === i).map((item, index) => {
                      return (
                        <div className="meal" key={index}>
                          <h1 className="mealTitle">{item}</h1>
                          <div className="item">
                            <div className="detailItem" >
                              <span className="itemKey">
                                <Typography type="body2" style={{ color: 'black', fontWeight: 'bold', fontSize: '17px' }}>
                                  Food Items :
                                </Typography>
                              </span>
                              <span className="itemValue">
                                <ol>
                                {
                                  meal.map((item2,index) => {
                                    if(item2.mealId.mealHour === item) {
                                      return (
                                        <li key = {index} style = {{color: 'black', fontWeight: 'bold', fontSize: '15px'}}>{item2.mealItemName} 
                                          
                                        {isManager.data.isManager ?
                                          (
                                              <span className="list">
                                                <ListItemText secondary={<Typography type="body2" style={{ color: 'black', fontWeight: 'bold', fontSize: '12px' }}>
                                                  Amount-
                                                </Typography>}></ListItemText>
                                                <ListItemText secondary={<Typography type="body2" style={{ color: 'grey', fontWeight: 'bold', fontSize: '12px' }}>
                                                {item2.mealItemAmmount}
                                                </Typography>}></ListItemText>
                                                <ListItemText secondary={<Typography type="body2" style={{ color: 'black', fontWeight: 'bold', fontSize: '12px', paddingLeft:'8px' }}>
                                                  Price-
                                                </Typography>}></ListItemText>
                                                <ListItemText secondary={<Typography type="body2" style={{ color: 'grey', fontWeight: 'bold', fontSize: '12px' }}>
                                                  {item2.mealItemPrice}
                                                </Typography>}></ListItemText>
                                              </span>
                                          )
                                          :<></>} 
                                        </li>
                                      )
                                    }
                                  })
                                }
                                </ol>
                              </span>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  }
                  {/* {meal.map((item, index) => (
                    // {item.mealStarus ?
                    <div className="meal" key = {index}>
                      <h1 className="mealTitle">{item.mealHour}</h1>
                      {item.mealStarus ?
                      <>
                      <div className="item">
                        <div className="detailItem" >
                          <span className="itemKey">Food Items : </span>
                          <span className="itemValue">
                            <ol>
                            {item.items.map((foodItem, index) => (
                              <li key = {index}>{foodItem.mealItemName}</li>
                            ))}
                            </ol>
                          </span>
                        </div>
                      </div>
                      </>
                      :<p>This meal time has ended</p>}
                    </div>
                  ))} */}
                </div>

               </div>
                {isManager.data.isManager ?
                (
                  <div className="bottom">
                  <div className="modal">
                    <Dialog/>
                  </div>
                </div>
                )
                :<></>}  
            </div>
            </>}
        </div>
    )

}

export default Dining;