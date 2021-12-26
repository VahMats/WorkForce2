import React, {useContext, useEffect, useState} from "react";
import MainModal from "../modals/MainModal/MainModal";
import ViewTeam from "../modals/ViewTeam/ViewTeam";
import {AllData} from "../Home/Home";

import View from "../../images/view.png";
import Delete from "../../images/delete.png";
import Edit from "../../images/edit.png";

import "./TeamList.css";

const TeamList = ({visible}) => {
    const data = useContext(AllData);

    const [show, setShow] = useState(false);
    const [viewingTeamData, setViewingTeamData] = useState({})

    const showModal = (teamData) => () => {
        setShow(!show)
        setViewingTeamData(teamData)
    };


    const showDelete = (id) => async () => {
        await fetch("/api/admin/deleteTeam", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.token,
            },
            body: JSON.stringify({
                id: id,
            }),
        })
            .then(res => res.json())
            .then(data => console.log(data))

    };
    return (
        <main style={{display: visible}}>
            <div>
                <div className="new_team">
                    <section className="new_team_field">
                        <button>Add new team</button>
                    </section>
                </div>
                <section className="team_list">
                    <table>
                        <thead>
                        <tr className="team_list_info">
                            <th>ID</th>
                            <th>Name</th>
                            <th>Count of Members</th>
                            <th>Max Count</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.teamsInfo.map((item, index) => (
                            <tr key={index}>
                                <td>{item._id}</td>
                                <td>{item.name}</td>
                                <td>{item.count}</td>
                                <td>{item.maxCount}</td>
                                <td className="image-td">
                                        <>
                                            <img
                                                src={View}
                                                alt="view"
                                                onClick={showModal(data.teamsInfo[index])}
                                            />
                                            <img
                                                src={Edit}
                                                alt="edit"
                                                //   onClick={showEdit(item.id)}
                                            />
                                            <img
                                                src={Delete}
                                                alt="delete"
                                                onClick={showDelete(item._id)}
                                            />
                                        </>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    {viewingTeamData.length === 0 && (
                        <h1 className="no-users">There are no teams</h1>
                    )}
                </section>
            </div>
            {show && (
                <MainModal show={show} setShow={setShow}>
                    <ViewTeam data={viewingTeamData}/>
                </MainModal>
            )}
        </main>
    );
}

export default TeamList;