import React, { useState } from 'react'
import Navbar from '../../../components/navbar/Navbar'
import Sidebar from '../../../components/sidebar/Sidebar'

import styled from "@emotion/styled";
import useFetch from "../../../hooks/useFetch";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { SideBarDataProvost } from '../../../components/sidebar/SideBarData';
import "./messmanager.scss"
import Button from '@mui/material/Button';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import axios from 'axios';
import { Alert } from '@mui/material';


export const StyleWrapper = styled.div`
  .fc td {
    background: darkgray;
    height: 'parent';
  }
`

const adapter = new AdapterDateFns();

const MessManagerProv =  () => {
    const students = useFetch("/students/");
    const [sid,setSID] = useState("");
    const [value, setValue] = useState(adapter.date());
    const [success, setSuccess] = useState(false);
    const [fail, setFail] = useState(false);

    const studentsInfo = students.data.map((student) => {
        return {label:student.studentId,key:student._id}
    });

    const createManagerOnclick = async(e) => {
        e.preventDefault();
        try{
            await axios.post("/dining/createManager",{studentId:sid,date:value});

            const newNotification = {
                studentsId: studentsInfo.find((student) => student.label === sid).key,
                title: "You are now a Mess Manager",
                description: "Congratulations! You are now a Mess Manager. You can now manage the mess menu and other things.",
                seen: false,
            };

            await axios.post( "/notifications/createNotification/"+sid, newNotification);

            setSuccess(true);
        }catch(err){
            console.log(err);
            setFail(true);
        }
    }

    const handleSelect = (e) => {
        setSID(e.target.value);
    }

    return (
        <div className='messManager'>
            {students.loading?"Loading":<>
            <Sidebar info={SideBarDataProvost}/>
            <div className="messManagerContainer">
                <Navbar/>

                <div className="top">
                    <div className="item">
                        <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={studentsInfo}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Student ID" value={"1705088"} onSelect={handleSelect} />}
                        />
                    </div>

                    <div className="item">
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                label="End Date"
                                inputFormat="MM/dd/yyyy"
                                value={value}
                                onChange={(newValue) => {
                                    setValue(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </div>

                    <div className="item">
                        <Button variant="contained" onClick={createManagerOnclick}>Select Manager</Button>
                    </div>

                    <div className="item">
                        {success?
                        <Alert severity="success">Submit Successful</Alert>:<></>
                        }
                        {fail?
                        <Alert variant="filled" severity="error">Submit failed</Alert>:<></>
                        }
                    </div>

                    
                </div>
            </div>
            </>}
        </div>
    )

}

export default MessManagerProv;