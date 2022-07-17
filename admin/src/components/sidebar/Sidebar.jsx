import "./sidebar.scss"
import { Link } from "react-router-dom";
import { useState } from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';

const Sidebar = ({ info }) => 
{
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    const SideBarDataStd = info;

    return (
        <div className={sidebar ? 'sidebar active' : 'sidebar'}>
            <div className='navbar'>
            <Link to='#' className='menu-bars'>
                {sidebar ? <MoreVertIcon onClick={showSidebar} /> : <CloseIcon onClick={showSidebar} />}
            </Link>
            </div>
            <div className={sidebar ? 'top active' : 'top'}>
                {/* <span className="logo">{HallName}</span> */}
            </div>
            <hr/>
            <div className={sidebar ? 'center active' : 'center'}>
                {
                    SideBarDataStd.map(
                        (data,index) => {
                            return (
                                <ul>
                                <p key={data.id} className="title">{data.title}</p>
                                {data.sideBarInfo.map(
                                    (sideBardData,indexSideBar) => {
                                        return (
                                            <Link to={sideBardData.path} style={{ textDecoration: "none" }}>
                                            <li key={sideBardData.id}>
                                                {sideBardData.icon}
                                                <span>{sideBardData.name}</span>
                                            </li>
                                            </Link>
                                        )
                                    }
                                )}
                                </ul>
                            );
                        }
                    )
                }
            </div>
            <div className={sidebar ? 'bottom active' : 'bottom'}>
                <div className="colorOption"></div>
                <div className="colorOption"></div>
            </div>
        </div>
    )
}

export default Sidebar