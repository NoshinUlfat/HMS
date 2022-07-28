import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined"
import EditIcon from '@mui/icons-material/Edit'
import React, { useState } from 'react'
import Navbar from '../../../components/navbar/Navbar'
import Popup from '../../../components/popup/Popup'
import Sidebar from '../../../components/sidebar/Sidebar'
import { SideBarDataStd } from "../../../components/sidebar/SideBarData"
import "./dining.scss"


import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Box } from "@mui/material";
import styled from "@emotion/styled";
import CalendarPicker, { CalendarPickerProps } from "@mui/lab/CalendarPicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";



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

    const state = {
        modal: false,
        calendarWeekends: true,
        event: []
      };

      
    return (
        <div className='dining'>
            <Sidebar info={SideBarDataStd}/>

            <div className="diningContainer">
                <Navbar/>

                <div className="top">
                <div className="left">
                    <div className="calendar-box">
                    <div className="calendar" >
                        
                    <StyleWrapper>
                        <FullCalendar defaultView="dayGridMonth" 
                            plugins={[ dayGridPlugin, interactionPlugin ]}  
                            // events={[
                            //     { title: 'event 1', allDay: true, start: '2020-05-29', end: '2020-05-30' },
                            //     { title: 'event 2', allDay: true, start: '2020-05-29', end: '2020-05-30'}
                            //]}
                        />
                    </StyleWrapper>
                </div></div></div></div>
{/* dateClick={this.handleDateClick} select={this.handleSelectClick} selectable='true'  */}


{/* <FullCalendar
  plugins={[ dayGridPlugin ]}
  initialView="dayGridMonth"
  weekends={false}
  events={[
    { title: 'event 1', date: '2022-07-21' },
    { title: 'event 2', date: '2021-07-02' }
  ]}
/> */}
                
                {/* <FullCalendar
                defaultView="timeGridDay"
                header={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
                }}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                //ref={this.calendarComponentRef}
                //weekends={this.state.calendarWeekends}
                //events={this.state.event}
                //eventClick={this.handleEventClick}
                nowIndicator='true'
                height='parent'
              /> */}

            </div>
        </div>
    )

}

export default Dining;