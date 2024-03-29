import { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { DarkModeContext } from "./context/darkModeContext";
import { hotelColumns, roomColumns, userColumns } from "./datatablesource";
import { userInputs } from "./formSource";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import New from "./pages/new/New";
import NewHotel from "./pages/newHotel/NewHotel";
import NewRoom from "./pages/newRoom/NewRoom";
import AssignNotice from "./pages/provost/assignNotice/AssignNotice";
import CertificateProvost from "./pages/provost/certificate/Certificate";
import DashboardProvost from "./pages/provost/dashboard/Dashboard";
import DefaulterList from "./pages/provost/defaulterList/DefaulterList";
import FundRequest from "./pages/provost/fundRequest/FundRequest";
import NoticedProvost from "./pages/provost/noticeProvost/Notice";
import RoomApplicationList from "./pages/provost/roomApplictionList/RoomApplicationList";
import StudentInfoProvost from "./pages/provost/studentInfo/StudentInfo";
import DiningMemoProv from "./pages/provost/diningmemo/DiningMemoProv";
import DiningMemo from "./pages/student/diningmemo/DiningMemo";
import MessManagerProv from "./pages/provost/messmanager/MessManager";
import FundRequestStd from "./pages/student/fundrequest/FundRequestStd";
import Single from "./pages/single/Single";
import CertificateStd from "./pages/student/certificate/Certificate";
import DashboardStd from "./pages/student/dashboard/Dashboard";
import Dining from "./pages/student/dining/Dining";
import NoticedStd from "./pages/student/noticeStudent/Notice";
import NotiStd from "./pages/student/notiStudent/Noti";
import OnlineStd from "./pages/student/online/Online";
import RoomRequest from "./pages/student/roomrequest/RoomRequest";
import Service from "./pages/student/service/Service";
import "./style/dark.scss";

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
                 <Route path="certificates" element={<CertificateProvost/>} />
                 <Route path="fundRequests" element={<FundRequest/>} />
                 <Route path="defaulterLists" element={<DefaulterList/>} />
                 <Route path="assignNotice" element={<AssignNotice/>} />
                 <Route path="noticeProvost" element={<NoticedProvost/>} />
                 <Route path="studentInfoProvost" element={<StudentInfoProvost/>} />
                 <Route path="debitMemo" element={<DiningMemoProv/>} />
                 <Route path="selectMessManager" element={<MessManagerProv/>} />
              </Route>
              <Route path="student">
                <Route path="Dashboard" element={<DashboardStd/>} />
                <Route path="roomRequest" element={<RoomRequest/>} />
                <Route path="dining" element={<Dining/>} />
                <Route path="diningmemo" element={<DiningMemo/>} />
                <Route path="certificate" element={<CertificateStd/>} />
                <Route path="service" element={<Service/>} />
                <Route path="noticeStudent" element={<NoticedStd/>} />
                <Route path="fundrequest" element={<FundRequestStd/>} />
                <Route path="notiStudent" element={<NotiStd/>} />

                <Route path="online" element={<OnlineStd/>} />
              </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
