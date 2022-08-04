import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import { hotelColumns, roomColumns, userColumns } from "./datatablesource";
import NewHotel from "./pages/newHotel/NewHotel";
import NewRoom from "./pages/newRoom/NewRoom";
import DashboardProvost from "./pages/provost/dashboard/Dashboard";
import RoomApplicationList from "./pages/provost/roomApplictionList/RoomApplicationList";
import AssignNotice from "./pages/provost/assignNotice/AssignNotice";
import DashboardStd from "./pages/student/dashboard/Dashboard";
import RoomRequest from "./pages/student/roomrequest/RoomRequest";
import Dining from "./pages/student/dining/Dining"
import Service from "./pages/student/service/Service"
import Certificate from "./pages/student/certificate/Certificate"
import NoticedStd from "./pages/student/notice/Notice";
import OnlineStd from "./pages/student/online/Online";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="users">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={userColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":userId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <New inputs={userInputs} title="Add New User" />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="hotels">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={hotelColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":productId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewHotel  />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="rooms">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={roomColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":productId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewRoom  />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route index element={<Home/>} />
              <Route path="provost">
                <Route path="Dashboard" element={<DashboardProvost/>} /> 
                 <Route path="roomRequests" element={<RoomApplicationList/>} />
                 <Route path="assignNotice" element={<AssignNotice/>} />
              </Route>
              <Route path="student">
                <Route path="Dashboard" element={<DashboardStd/>} />
                <Route path="roomRequest" element={<RoomRequest/>} />
                <Route path="dining" element={<Dining/>} />
                <Route path="certificate" element={<Certificate/>} />
                <Route path="service" element={<Service/>} />
                <Route path="notice" element={<NoticedStd/>} />

                <Route path="online" element={<OnlineStd/>} />
              </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
