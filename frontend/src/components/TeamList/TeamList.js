import React, { useContext, useEffect, useState } from "react";
import MainModal from "../modals/MainModal/MainModal";
import ViewTeam from "../modals/ViewTeam/ViewTeam";
import { AllData } from "../Home/Home";

import View from "../../images/view.png";
import Delete from "../../images/delete.png";
import Edit from "../../images/edit.png";

import "./TeamList.css";

const TeamList = ({ visible }) => {
    const data = useContext(AllData);

    const [show, setShow] = useState(false);
    const [viewingTeamData, setViewingTeamData] = useState({})

    const showModal = (userData) => () => {
        setShow(!show)
        setViewingTeamData(userData)
    };


    const showDelete = (id) => async () => {
        await fetch("/api/admin/deleteTean", {
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
        <main style={{ display: visible }}>
            <div>
                {data.userInfo.isAdmin ? (
                    <div className="new_team">
                        <section className="new_team_field">
                            <button>Add new team</button>
                        </section>
                    </div>
                ) : null}
                <section className="team_list">
                    <table>
                        <thead>
                            <tr className="team_list_info">
                                {data.userInfo.isAdmin ? <th>ID</th> : null}
                                <th>Name</th>
                                <th>Members</th>
                                {data.userInfo.isAdmin ? <th>Max Count</th> : null}
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.teamsInfo.map((item, index) => (
                                <tr key={index}>
                                    {data.userInfo.isAdmin ? <td>{item.id}</td> : null}
                                    <td>{item.teamName}</td>
                                    <td>{item.membersCount}</td>
                                    {data.userInfo.isAdmin ? <td>{item.maxMembersCount}</td> : null}
                                    <td className="image-td">
                                        {data.userInfo.isAdmin ? (
                                            <>
                                                <img
                                                    src={View}
                                                    alt="view"
                                                    onClick={showModal(item.id)}
                                                />
                                                <img
                                                    src={Edit}
                                                    alt="edit"
                                                //   onClick={showEdit(item.id)}
                                                />
                                                <img
                                                    src={Delete}
                                                    alt="delete"
                                                    onClick={showDelete(item.id)}
                                                />
                                            </>
                                        ) : (
                                            <img src={View} alt="view" onClick={showModal(item.id)} />
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {viewingTeamData.length === 0 && (
                        <h1 className="no-users">You are not included in the team</h1>
                    )}
                </section>
            </div>
            {show && (
                <MainModal show={show} setShow={setShow} viewingUserData={viewingTeamData}>
                    <ViewTeam show={show} setShow={setShow} data={viewingTeamData} />
                </MainModal>
            )}
        </main>
    );
}

export default TeamList;