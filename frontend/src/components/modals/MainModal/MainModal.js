import React from "react";
import Close from "../../../images/close.png";
import "./MainModal.css"

export default ({ show, setShow, child}) => {
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
            {child}


        </section>
    );
}
