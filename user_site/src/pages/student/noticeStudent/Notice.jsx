import React, { useContext, useEffect, useState } from "react";
import Modal from "../../../components/modal/Modal";
import PdfViewer from "../../../components/pdfViewer/PdfViewer";
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import formatDistance from 'date-fns/formatDistance'
import { SideBarDataDiningManager, SideBarDataProvost, SideBarDataStd } from "../../../components/sidebar/SideBarData";
import "./notice.scss";

import axios from "axios";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import useFetch from "../../../hooks/useFetch";
import { AuthContext } from "../../../context/AuthContext";

const NoticeStd = () => {
  const [id, setID] = useState(null);
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = (numPages) => {
    setNumPages(numPages);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // const res = axios.get("/roomAllotments");

        // console.log("VCVCccccccccccccc ",res.data)

        // console.log("logindwcwfff ",res.data.details);///////////
        const { data: response } = await axios.get("/notices");
        setData(response);

        console.log("VCVCccccccccccccc ", response);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  console.log("DATA ", data);
  console.log("LOAD ", loading);

  const { user } = useContext(AuthContext);
  const isManager = useFetch("/dining/checkManager/get/"+user._id);

  return (
    <div className="notice">
      {isManager.data.isManager?<Sidebar info={SideBarDataDiningManager}/>:<Sidebar info={SideBarDataStd}/>}
      <div className="noticeContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            {/* <h1 className="title">Information </h1>
                    {loading?"Loading":(
                        <>
                            <div>Notices</div>
                            <div className="Ff">
                                {data.map((student) => (
                                <div className="studentId">{student.title} {student.noticeType} {student.description} {student.date} </div>
                            
                                ))}
                            </div> 
                        </>
                    )} */}

            {/* <div>
                        <Document file="./somefile.pdf" onLoadSuccess={onDocumentLoadSuccess}>
                            
                            <Page pageNumber={pageNumber} width={600} />
                        </Document>
                        <p>
                            Page {pageNumber} of {numPages}
                        </p>
                    </div> */}

            <div className="list-boxOutter">
              <div className="listBox">
                <h2>Notice Board</h2>

                <List
                  style={{
                    maxHeight: "100%",
                    overflow: "auto",
                    height: "500px",
                  }}
                >
                  {data.map((notice) => (
                    <div class="list-boxInner">
                      <ListItem>
                        <ListItemButton
                          sx={{ display: "block", backgroundColor: "#caccfc" }}
                        >
                          {/* <div className="buttons">
                            <div className="buttonDetails" key="1">
                              <div className="editButton">
                                <span onClick={() => setShow(true)}>
                                  {" "}
                                  <PictureAsPdfIcon className="icon" /> Show pdf{" "}
                                </span>
                              </div>
                            </div>
                          </div> */}
                          {/*show && <Modal/>*/}
                          {/* <Modal pdffile ={notice.file} buttonName={"Show Pdf"} randId={notice.noticeType} */}
                          <PdfViewer pdffile ={notice.file} buttonName={"Show Pdf"} randId={notice.noticeType}
                          styeAll={{ position: "absolute",
                          top: "0",
                          right: "0",
                          padding: "5px",
                          fontSize: "12px",
                          fontWeight: "bold",
                          backgroundColor: "rgb(137,80,166)",
                          cursor: "pointer",
                          borderRadius: "0px 0px 0px 5px"
                      
                          }}/>
                          <ListItemText
                            secondary={
                              <Typography
                                type="body2"
                                style={{
                                  color: "red",
                                  fontWeight: "bold",
                                  fontSize: "10px",
                                }}
                              >
                                {
  
                                new Date(notice.date)<new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                                ?new Date(notice.date).toLocaleDateString()
                                :formatDistance(
                                  new Date(notice.date),
                                  new Date() 
                              )
                                
                                }
                              </Typography>
                            }
                          ></ListItemText>
                          <ListItemText
                            secondary={
                              <Typography
                                type="body2"
                                style={{ fontWeight: "bold", fontSize: "12px" }}
                              >
                                {notice.noticeType}
                              </Typography>
                            }
                          ></ListItemText>
                          <ListItemText
                            secondary={
                              <Typography
                                type="body2"
                                style={{ fontWeight: "bold", fontSize: "15px" }}
                              >
                                {notice.title}
                              </Typography>
                            }
                          ></ListItemText>
                          <ListItemText
                            secondary={
                              <Typography
                                type="body2"
                                style={{ fontSize: "12px" }}
                              >
                                {notice.description}
                              </Typography>
                            }
                          ></ListItemText>
                        </ListItemButton>
                      </ListItem>
                    </div>
                  ))}
                </List>
              </div>
            </div>
          </div>

          {/* <div className="right">
                
                    
                </div> */}
        </div>
      </div>
    </div>
  );
};

export default NoticeStd;
