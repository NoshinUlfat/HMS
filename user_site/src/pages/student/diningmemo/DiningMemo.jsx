import React, { useState } from 'react'
import Navbar from '../../../components/navbar/Navbar'
import Sidebar from '../../../components/sidebar/Sidebar'
import { SideBarDataDiningManager, SideBarDataStd } from "../../../components/sidebar/SideBarData"
import "./diningmemo.scss"

import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

import styled from "@emotion/styled";
import useFetch from "../../../hooks/useFetch";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';


export const StyleWrapper = styled.div`
  .fc td {
    background: darkgray;
    height: 'parent';
  }
`


const adapter = new AdapterDateFns();
const DiningMemo =  () => {
    const { user } = useContext(AuthContext);
    const isManager = useFetch("/dining/checkManager/get/"+user._id);

    const [value, setValue] = useState(adapter.date());
    const [file,setFile] = useState("");

    console.log(file)

    const handleChange = (event) => {
      setValue(event.target.value);
    };

    return (
        <div className='dining'>
            {isManager.data.isManager?<Sidebar info={SideBarDataDiningManager}/>:<Sidebar info={SideBarDataStd}/>}

            <div className="diningContainer">
                <Navbar/>
                <div className="top">
                    <div className="topleft">
                        <TextField
                        id="title" label="Title"
                        variant="outlined" 
                        placeholder='Title'/>

                        <TextField
                            id="desc"
                            label="Short Description"
                            multiline
                            rows={4}
                            placeholder='Short Description'
                            />
                    </div>

                    <div className="topmiddle">
                        <TextField
                            id="cost"
                            label="Total Cost"
                            placeholder='Total Cost'
                            variant="outlined" 
                        />
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                label="Date desktop"
                                inputFormat="MM/dd/yyyy"
                                value={value}
                                onChange={(newValue) => {
                                    setValue(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </div>
                    <div className="topright">
                        <div className="file">
                            <label htmlFor="file"><AttachFileIcon/> Choose File</label>
                            <input type="file" name="file" id="file"
                            onChange={(e) => setFile(e.target.files[0])} />
                            <span>{file.name}</span>
                        </div>
                        <div className="add">
                        <Fab color="primary" aria-label="add">
                            <AddIcon />
                        </Fab>
                        </div>
                    </div>                    
                </div>
                <div className="bottom">
                    <Box
                        sx={{
                            width: '100%',
                            maxWidth: '100%',
                        }}
                        >
                        <TextField multiline rows={5} fullWidth label="fullWidth" id="fullWidth" />
                    </Box>
                </div>
            </div>
        </div>
    )

}

export default DiningMemo;