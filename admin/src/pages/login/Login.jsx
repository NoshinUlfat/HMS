import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
// import { AuthContext } from "../../context/AuthContext";
import "./login.scss";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));

  };

  const handleClick = async (e) => {
    e.preventDefault();
    console.log(e);/////////////
 
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      if (res.data.isUserAdmin) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });

        navigate("/");
        //navigate("/student/dashboard/",res.data);        //NOSHIN
      // } else {
      //   dispatch({
      //     type: "LOGIN_FAILURE",
      //     payload: { message: "You are not allowed!" },
      //   });
       } else if (res.data.isUserProvost) {
        console.log("Provost")
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });

        navigate("/provost/dashboard/",res.data); 
       } else {
        console.log("VCVC ",res.data)
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });

        navigate("/student/dashboard/",res.data); 
       }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    // <body>
    <div className="login">
      <div className="lContainer">
      <h1 className="text">Welcome to Admin Panel</h1>
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <button disabled={loading} onClick={handleClick} className="lButton">
          Login
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
    // </body>
  );
};

export default Login;
