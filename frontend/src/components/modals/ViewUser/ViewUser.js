import { React } from "react";
import WomanIcon from "../../../images/womanicon.png";
import ManIcon from "../../../images/manicon.png";

import './ViewUser.css';

const ViewUser = ({ data }) => {
  return (
    <div className="viewuser">
      <div className="viewuser-icon">
        <img
          src={data.gender === "male" ? ManIcon : WomanIcon}
          alt="Icon"
        />
        <h1> Username</h1>
        <p>{data.username}</p>
      </div>
      <div className="user-info">
        <h4>First name</h4>
        <p>{data.firstName}</p>
        <h4>Last Name</h4>
        <p>{data.lastName}</p>
        <h4>Email </h4>
        <p>{data.email}</p>
        <h4>Gender</h4>
        <p>{data.gender}</p>
        <h4> Date of birth</h4>
        <p>{data.dateOfBirth}</p>
        <h4>Team </h4>
        <p>{data.teamId}</p>
      </div>
    </div>
  );
};

export default ViewUser;