import formatDistance from "date-fns/formatDistance";
import React, { useEffect, useState } from "react";
import Navbar from "../../../components/navbar/Navbar";
import PdfViewer from "../../../components/pdfViewer/PdfViewer";
import Sidebar from "../../../components/sidebar/Sidebar";
import { SideBarDataStd } from "../../../components/sidebar/SideBarData";
import "./noti.scss";

import axios from "axios";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

const NotiStd = () => {
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
        const { data: response } = await axios.get("/notifications");
        setData(response);

        //console.log("VCVCccccccccccccc ", response);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  console.log("DATA ", data);
  console.log("LOAD ", loading);

  return (
    <div className="noti">
      <Sidebar info={SideBarDataStd} />
      <div className="notiContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            {/* <h1 className="title">Information </h1>
                    {loading?"Loading":(
                        <>
                            <div>Notis</div>
                            <div className="Ff">
                                {data.map((student) => (
                                <div className="studentId">{student.title} {student.notiType} {student.description} {student.date} </div>
                            
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
                <h2>Notifications</h2>

                <List
                  style={{
                    maxHeight: "100%",
                    overflow: "auto",
                    height: "500px",
                  }}
                >
                  {data.map((noti) => (
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
                          {/* <Modal pdffile ={noti.file} buttonName={"Show Pdf"} randId={noti.notiType} */}
                          {/* <PdfViewer
                            pdffile={noti.file}
                            buttonName={"Show Pdf"}
                            randId={noti.notiType}
                            styeAll={{
                              position: "absolute",
                              top: "0",
                              right: "0",
                              padding: "5px",
                              fontSize: "12px",
                              fontWeight: "bold",
                              backgroundColor: "rgb(137,80,166)",
                              cursor: "pointer",
                              borderRadius: "0px 0px 0px 5px",
                            }}
                          /> */}
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
                                {new Date(noti.date) <
                                new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                                  ? new Date(noti.date).toLocaleDateString()
                                  : formatDistance(
                                      new Date(noti.date),
                                      new Date()
                                    )}
                              </Typography>
                            }
                          ></ListItemText>
                          <ListItemText
                            secondary={
                              <Typography
                                type="body2"
                                style={{ fontWeight: "bold", fontSize: "12px" }}
                              >
                                {noti.notiType}
                              </Typography>
                            }
                          ></ListItemText>
                          <ListItemText
                            secondary={
                              <Typography
                                type="body2"
                                style={{ fontWeight: "bold", fontSize: "15px" }}
                              >
                                {noti.title}
                              </Typography>
                            }
                          ></ListItemText>
                          <ListItemText
                            secondary={
                              <Typography
                                type="body2"
                                style={{ fontSize: "12px" }}
                              >
                                {noti.description}
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

export default NotiStd;