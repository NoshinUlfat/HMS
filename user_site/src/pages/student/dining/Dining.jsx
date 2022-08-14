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

import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { mealDataList } from "./diningDataSource.js"
import Dialog from '../../../components/dialog/Dialog'

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

    const [meal, setMeal] = useState(mealDataList.filter((item) => 
      new Date(item.date).setUTCHours(0, 0, 0, 0) === adapter.date().setUTCHours(0, 0, 0, 0)
    ))

    console.log("user: " +user.studentId)
    console.log(meal)


    const handleCalanderClick = async (dateValue) => {
      try {
          setMeal(mealDataList.filter((item) => 
            new Date(item.date).setUTCHours(0, 0, 0, 0) === dateValue.setUTCHours(0, 0, 0, 0)
        ));
      } catch (err) {}
    };

    return (
        <div className='dining'>
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
                  {meal.map((item, index) => (
                    // {item.mealStarus ?
                    <div className="meal" key = {index}>
                      <h1 className="mealTitle">{item.mealHour}</h1>
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
                    </div>
                    // :<p></p>}
                  ))}
                </div>

               </div>
                  
                <div className="bottom">
                  <div className="modal">
                    <Dialog/>
                  </div>
                </div>
            </div>
        </div>
    )

}

export default Dining;