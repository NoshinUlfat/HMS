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

import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';

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

    const state = {
        modal: false,
        calendarWeekends: true,
        event: []
      };

      const [value, setValue] = useState(adapter.date());

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

                <div className="right"></div>

               </div>
                  
                <div className="bottom">
                </div>

                {/* <div className="top">
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
                </div></div></div></div> */}
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