import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import axios from "axios";
import React, { useState } from "react";
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import {
  SideBarDataDiningManager,
  SideBarDataStd,
} from "../../../components/sidebar/SideBarData";
import "./roomrequest.scss";

import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import { Alert } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import useFetch from "../../../hooks/useFetch";

const RoomRequest = () => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const rooms = useFetch("/rooms/get/available/room/");

  const roomsInfo = rooms.data.map((room) => {
    return { label: room.roomNumber, key: room._id };
  });

  const { user } = useContext(AuthContext);
  var urlConnection = "/roomAllotments/" + user.studentId;
  console.log("URL ", urlConnection);

  console.log("ID CHECK", user.studentId);

  const handleChangeText = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    console.log(info);
  };

  const handleChangeCheckBox = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.checked }));
    console.log(info);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/lamadev/image/upload",
        data
      );

      const { url } = uploadRes.data;
      const newRequest = {
        ...info,
        img: url,
        studentId: user.studentId,
        studentsId: user._id,
        approvalStatus: "pending",
      };

      console.log("Bla");
      console.log(newRequest);
      console.log("DCDC ".urlConnection);
      const res = await axios.post(urlConnection, newRequest);

      console.log(uploadRes.data);
      setInfo({
        preferredRoomNo: "",
        message: "",
        sports: false,
        debate: false,
        other: false,
      });
      setFile("");
      setSuccess(true);
    } catch {
      setInfo({
        preferredRoomNo: "",
        message: "",
        sports: false,
        debate: false,
        other: false,
      });
      console.log("Error Asche");
      setFile("");
      setFail(true);
    }
  };

  const isManager = useFetch("/dining/checkManager/get/" + user._id);
  const availableRooms = useFetch("/rooms/get/available");
  return (
    <div className="roomRequest">
      {isManager.loading || availableRooms.loading ? (
        "Loading"
      ) : (
        <>
          {isManager.data.isManager ? (
            <Sidebar info={SideBarDataDiningManager} />
          ) : (
            <Sidebar info={SideBarDataStd} />
          )}
          <div className="roomRequestContainer">
            <Navbar />
            <form action="#" method="post">
              <br></br>
              {/* <label htmlFor="preferredRoomNo">
                Preferred Room No(Optional):{" "}
              </label> */}
              {/* <input type="text" id='preferredRoomNo' value={info.preferredRoomNo} placeholder="Available Rooms" onChange={handleChangeText}/> */}
              <div className="item-new">
                <Autocomplete
                  disablePortal
                  id="preferredRoomNo"
                  value={info.preferredRoomNo}
                  options={roomsInfo}
                  sx={{ width: 350, padding: "5px" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Preferred Room No"
                      value={info.preferredRoomNo}
                      onSelect={handleChangeText}
                    />
                  )}
                />
              </div>
              {/* <select id='preferredRoomNo' value={info.preferredRoomNo} placeholder="Available Rooms" onChange={handleChangeCheckBox}>
            {availableRooms.data.map((room,index)=>{
              return(
                <>
                <option value={room.roomNumbers} key={index}>{room.roomNumbers}</option>
                </>
              )
            }
            )}
            </select> */}

              <label htmlFor="message">Why do you need this room?</label>
              <textarea
                name=""
                id="message"
                value={info.message}
                cols="500"
                rows="15"
                placeholder="Application"
                onChange={handleChangeText}
              ></textarea>

              <div className="skills">
                <p>Skills</p>
                <div className="left">
                  <div className="skill">
                    <label htmlFor="sports">
                      Sports
                      <input
                        className="input_"
                        type="checkbox"
                        name=""
                        id="sports"
                        checked={info.sports}
                        onChange={handleChangeCheckBox}
                      />
                    </label>
                  </div>

                  <div className="skill">
                    <label htmlFor="debate">
                      Debate
                      <input
                        className="input_"
                        type="checkbox"
                        name=""
                        id="debate"
                        checked={info.debate}
                        onChange={handleChangeCheckBox}
                      />
                    </label>
                  </div>

                  {/* <div className="skill">
                  <label htmlFor="acting">Acting
                  <input type="checkbox" name="" id="acting" onChange={handleChangeCheckBox}/>
                  </label>
                </div> */}

                  <div className="skill">
                    <label htmlFor="other">
                      Others
                      <input
                        className="input_"
                        type="checkbox"
                        name=""
                        id="other"
                        checked={info.other}
                        onChange={handleChangeCheckBox}
                      />
                    </label>
                  </div>
                </div>
                <div className="right">
                  <label htmlFor="file">
                    Attach Your Achivements(PDFs):{" "}
                    <AttachFileOutlinedIcon className="icon" />
                  </label>
                  <input
                    className="input_"
                    type="file"
                    id="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    style={{ display: "none" }}
                    // value={file}
                  />
                  {file ? (
                    <span>{file.name}</span>
                  ) : (
                    <span>No file chosen</span>
                  )}
                </div>
              </div>

              <button className="button_" type="submit" onClick={handleClick}>
                Submit Application
              </button>

              {/* <Grid container direction="row" alignItems="center" top="160px"> */}
              {/* <div className="alert-box"><h1>meuuuuuuuuuuuuuuu</h1></div> */}
              {success ? (
                <Alert severity="success">Submit Successful</Alert>
              ) : (
                <></>
              )}
              {fail ? (
                <Alert variant="filled" severity="error">
                  Submit failed
                </Alert>
              ) : (
                //handleClickOpen()
                <></>
              )}
              {/* </Grid> */}

              {/* <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Use Google's location service?"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Let Google help apps determine location. This means sending anonymous
                    location data to Google, even when no apps are running.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Disagree</Button>
                  <Button onClick={handleClose} autoFocus>
                    Agree
                  </Button>
                </DialogActions>
              </Dialog> */}
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default RoomRequest;
