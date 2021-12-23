import { React, useContext } from "react";
import WomanIcon from "../../../images/womanicon.png";
import ManIcon from "../../../images/manicon.png";

import './ViewUser.css';

const ViewUser = ({ data }) => {
  return (
    <div className="modal-wrapper">
      <div className="view-admin">
        <img
          src={data.gender === "male" ? ManIcon : WomanIcon}
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
        <h4>{data.team}</h4>
      </div>
    </div>
  );
};

export default ViewUser;