import "./progressbar.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

const Progressbar = ({info}) => {
    return (
        <div className="featured">
          <div className="top">
            <h1 className="title">{info.title}</h1>
            <MoreVertIcon fontSize="small" />
          </div>
          <div className="bottom">
            <div className="featuredChart">
              <CircularProgressbar value={info.percentPending} text={info.percentPending} strokeWidth={5} />
            </div>
            {/* <p className="title">Total sales made today</p>
            <p className="amount">$420</p> */}
            <p className="desc">
              {info.title}
            </p>
            <div className="summary">
              <div className="item">
                <div className="itemTitle">Pending</div>
                <div className="itemResult negative">
                  <KeyboardArrowDownIcon fontSize="small"/>
                  <div className="resultAmount">{info.nPendingReq}</div>
                </div>
              </div>
              <div className="item">
                <div className="itemTitle">nDone</div>
                <div className="itemResult positive">
                  <KeyboardArrowUpOutlinedIcon fontSize="small"/>
                  <div className="resultAmount">{info.nDone}</div>
                </div>
              </div>
              <div className="item">
                <div className="itemTitle">Total Applications</div>
                <div className="itemResult positive">
                  <KeyboardArrowUpOutlinedIcon fontSize="small"/>
                  <div className="resultAmount">{info.nApplication}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}

export default Progressbar