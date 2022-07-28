import "./newStudent.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";

const NewStudent = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    //console.log(e.target.value);
  };

  const handleClick = async (e) => {
    //console.log("Hello");
    //console.log(e);

    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");
    try {
      // console.log("ABC");
      // console.log(data);
      // //console.log(...info);
      // console.log("ABC");


      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/lamadev/image/upload",
        data
      );
      

      //console.log("AAA");
      
      //console.log(uploadRes.data);
      

      const { url } = uploadRes.data;
      

      const newStudent = {
        ...info,
        img: url,
      };


    //   const newStudent2 ={
    //     "studentId" : "1705060" ,
    //     "username" : "Miasha" ,
    //     "password" : "123" ,
    //     "cgpa" : "4" ,
    //     "phone" : "+880-01711213234" ,
    //     "level" : "4" ,
    //     "term" : "2" ,
    //     "present_address" : "Dhaka" ,
    //     "permanent_address" : "Dhaka" ,
    //     "email" : "1705087@gmail.com" ,
    //     "department" : "CSE" ,
    //     "img " : ""
        
    // }
      console.log("MEU");
      //console.log(newStudent);

      await axios.post("/auth/registerStudent", newStudent);
    } catch (err) {
      console.log("more jabo");
      console.log(err);
    }
  };

  console.log(info);
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                  />
                </div>
              ))}
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewStudent;
