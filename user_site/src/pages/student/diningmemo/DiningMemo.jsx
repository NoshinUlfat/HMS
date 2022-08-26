import React, { useState } from 'react'
import Navbar from '../../../components/navbar/Navbar'
import Sidebar from '../../../components/sidebar/Sidebar'
import { SideBarDataDiningManager, SideBarDataStd } from "../../../components/sidebar/SideBarData"
import "./diningmemo.scss"

import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

import styled from "@emotion/styled";
import useFetch from "../../../hooks/useFetch";

import TextField from '@mui/material/TextField';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Accordion from "../../../components/accordion/Accordion"
import { Button, Chip, Divider } from '@mui/material'
import axios from 'axios'


export const StyleWrapper = styled.div`
  .fc td {
    background: darkgray;
    height: 'parent';
  }
`


const adapter = new AdapterDateFns();
const DiningMemo =  () => {
    const [info,setInfo] = useState({});
    const [items,setListItems] = useState([]);
    const { user } = useContext(AuthContext);

    const memoList = useFetch("/dining/getAllMemo");
    const isManager = useFetch("/dining/checkManager/get/"+user._id);

    const [value, setValue] = useState(adapter.date());
    const [file,setFile] = useState("");

    const handleChange = (e) => {
        setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value}));
    };

    const addCurrentInfo = () => {
        setInfo((prev) => ({ ...prev, date: value}));
        setListItems((prev) => [...prev, {value:info,file:file,key:Date.now()}]);

        setInfo({title:"",description:"",amount:"",date:adapter.date()});
        setFile("");
        setValue(adapter.date());
    }

    const onSubmit = async (e) => {
        items.map(async (item) => {
            e.preventDefault();
            const data = new FormData();
            data.append("file", item.file);
            data.append("upload_preset", "upload");
            try {
                const uploadRes = await axios.post(
                "https://api.cloudinary.com/v1_1/fahmid/image/upload",
                data
                );

                const { url } = uploadRes.data;
                const newRequest = {
                ...item.value,
                file: url,
                studentsId: user._id,
                };

                const res = axios.post("/dining/createMemo", newRequest);
            } catch(err) {
            console.log(err);
            }
        })
    }


    console.log(items)

    return (
        <div className='dining'>
            {isManager.data.isManager?<Sidebar info={SideBarDataDiningManager}/>:<Sidebar info={SideBarDataStd}/>}
            {memoList.loading?"Loading":<>
            <div className="diningContainer">
                <Navbar/>
                <div className="top">
                    <div className="topleft">
                        <TextField
                        id="title" label="Title"
                        variant="outlined" 
                        placeholder='Title'
                        value={info.title}
                        onChange={handleChange}
                        />

                        <TextField
                            id="description"
                            label="Short Description"
                            multiline
                            rows={4}
                            placeholder='Short Description'
                            value={info.description}
                            onChange={handleChange}
                            />
                    </div>

                    <div className="topmiddle">
                        <TextField
                            id="amount"
                            label="Total Cost"
                            placeholder='Total Cost'
                            variant="outlined"
                            value={info.amount}
                            onChange={handleChange} 
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
                        <Fab color="primary" aria-label="add" onClick={addCurrentInfo}>
                            <AddIcon />
                        </Fab>
                        </div>
                    </div>                    
                </div>
                <div className="middle">
                    <div
                        className="accordion"
                        >
                        <Accordion showButton={true} items={items} setListItems={setListItems}/>
                    </div>
                    <div className='button'>
                        <Button variant="contained" onClick={onSubmit}>Submit</Button> 
                    </div>
                </div>
                <br /><br /><br />
                <Divider>
                    <Chip label="Submitted Memos" />
                </Divider>
                <div className="bottom">
                    <div
                        className="accordion"
                        >
                        <Accordion showButton={false} items={items} setListItems={setListItems}/>
                    </div>
                </div>
            </div>
            </>}
        </div>
    )

}

export default DiningMemo;