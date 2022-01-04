import React from "react";
import Close from "../../../images/close.png";
import "./MainModal.css"

const MainModal = ({ show, setShow, children }) => {
    return (
        <section className={show ? "modal" : "modal-close"}>
            <div className="modal-wrapper">
                <div className="close-button">
                    <img
                        src={Close}
                        alt="Close"
                        onClick={() => {
                            setShow(!show);
                        }}
                    />
                </div>
            </div>
            <div>
                {children}
            </div>
        </section>
    );
}

export default MainModal;
