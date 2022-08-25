import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import React from "react";
import "./modal.scss";

const Modal = ({pdffile,buttonName,randId,styeAll}) => {
  return (
    <div className="modalPdf" >
      <div className="container p-5" >
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target={"#exampleModal"+randId}
          style= {styeAll}
        >
          {buttonName}
        </button>

        <div
          className="modal fade"
          id={"exampleModal"+randId}
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-xl">
            <div className="modal-content" style={{ height: "500px" }}>
              <div className="modal-header">
                <h5 className="modal-title text-danger" id="exampleModalLabel">
                  PDF
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  
                ></button>
              </div>
              <div className="modal-body">
                
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
                  height="100%"
                  width="100%"
                ></iframe>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-warning"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
