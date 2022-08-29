
import "./pdfViewer.scss";

import React from "react";
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      width: '80%',
      height: '80%',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };


const PdfViewer = ({pdffile,buttonName,randId,styeAll}) => {


    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
  
    function openModal() {
      setIsOpen(true);
    }
  
    function afterOpenModal() {
      // references are now sync'd and can be accessed.
      subtitle.style.color = '#f00';
    }
  
    function closeModal() {
      setIsOpen(false);
    }
  return (
    <div className="modalPdf" >
        <div>
      <button onClick={openModal} >
      {/* <PictureAsPdfIcon className='icon'/> */}
      {buttonName}
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      > 
            <iframe
            //src="https://therichpost.com/sample.pdf#toolbar=0&navpanes=0&scrollbar=0"
            //src="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"

            src={
            pdffile
                ? pdffile
                : "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            }
            frameBorder="0"
            scrolling="auto"
            height="92%"
            width="100%"
            >
                    
            </iframe>
        <div align="right" >
        <button onClick={closeModal} className="btnCancel" >close</button>
        </div>
       
      </Modal>
    </div>
    </div>
  );
};

export default PdfViewer;
