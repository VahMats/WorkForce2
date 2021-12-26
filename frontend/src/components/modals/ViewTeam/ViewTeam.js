import React from "react";
import Loading from "../../Loading/Loading";

import './ViewTeam.css';

const ViewTeam = ({ data }) => {

  return (
    <div className="view-team">
      <div className="view-team-name">
        <h1>{data.name}</h1>
      </div>
      <div className="view-team-info">
        <h3>Members count is {data.count}</h3>
        <h3>Max members count is {data.maxCount}</h3>
      </div>
    </div>)
}

export default ViewTeam;