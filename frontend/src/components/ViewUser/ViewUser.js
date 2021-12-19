import React, { useContext, useEffect, useState } from "react";
import { AllData } from "../Home/Home";
import Close from "../../images/close.png";
import WomanIcon from "../../images/womanicon.png";
import Manicon from "../../images/manicon.png";

import './ViewUser.css';

const ViewUser = ({ show, setShow, currentId}) => {

  const [data, setData] = useState({});

  useEffect(async () => {
    const getData = async () => {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: currentId,
        }),
      };

      try {
        const res = await fetch("/api/user/id", options);
        const data = await res.json();

        setTimeout(() => {
          if (data) {
            setData(data[0]);
          }
        }, 1000);
      } catch (e) {
        console.error({ message: e.message });
      }
    };
    await getData();
  }, []);

  return (
    <section className={show ? "modal" : "modal-close"}>
      {/* {data ? Object.keys(data)?.length === 0 && <Loading /> : null} */}
      {data
        ? Object.keys(data)?.length !== 0 && (
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
              <div className="view-admin">
                <img
                  src={data.gender === "male" ? Manicon : WomanIcon}
                  alt="Icon"
                />
              </div>
              <h1>{data.username}</h1>
              <div className="user-info">
                <h4>{data.firstName}</h4>
                <h4>{data.lastName}</h4>
                <h4>{data.email}</h4>
                <h4>{data.gender}</h4>
                <h4>{data.dateOfBirth}</h4>
                <h4>{data.teamName}</h4>
              </div>
            </div>
          )
        : null}
      </section>
  );
};

export default ViewUser;