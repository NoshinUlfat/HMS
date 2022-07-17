import React from "react";
import "./popup.scss";
import CloseIcon from '@mui/icons-material/Close';

const Popup = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className='modalWrapper'>
      <div className='modal'>
        {/* <button onClick={onClose} className='btnClose'>
            <CloseIcon/>
        </button> */}
        <div className="closeButton">
          <CloseIcon onClick={onClose} className='btnClose'/>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Popup;
