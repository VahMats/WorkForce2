import React from "react";
import Loading from "../../Loading/Loading";

import './ViewTeam.css';

const ViewTeam = ({ data }) => {
  
  return (
    <div className="modal-wrapper">
        <div className="view-modal-wrapper">
          <h1>{data.name}</h1>
          <div className="view-subtitle">
            <h3>Members count is {data.count}</h3>
            <h3>Max members count is {data.maxCount}</h3>
          </div>
        </div>
    </div>)
}

export default ViewTeam;