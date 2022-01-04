import React, { useContext, useState } from "react";
import MainModal from "../modals/MainModal/MainModal";
import ViewTeam from "../modals/ViewTeam/ViewTeam";
import EditTeam from "../modals/EditTeam/EditTeam";
import AddTeam from "../modals/AddTeam/AddTeam";
import { AllData } from "../Home/Home";

import View from "../../images/view.png";
import Delete from "../../images/delete.png";
import Edit from "../../images/edit.png";

import "./TeamList.css";

const TeamList = ({ visible }) => {

    const {data, setData} = useContext(AllData);

    const [viewModalShow, setViewModalShow] = useState(false);
    const [addModalShow, setAddModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);

    const [viewingTeamData, setViewingTeamData] = useState({});
    const [editingTeamData, setEditingTeamData] = useState({})

    const showModal = (teamData) => () => {
        setViewModalShow(true)
        setViewingTeamData(teamData);
    };

    const showEditModal = (edit) => {
        setEditModalShow(true);
        setEditingTeamData(edit);
    }


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
        }).then(res =>res.json()).then(data => {
                console.log(data)
                setData(prev => ({...prev, usersInfo:data.usersData, teamsInfo: data.teamsData}))
            })

    };
    return (
        <main style={{ display: visible }}>
            <div className='main'>
                <div className="new_team">
                    <section className="new_team_field">
                        <button onClick={e => { setAddModalShow(true) }}>Add a new team</button>
                    </section>
                </div>
                <section className="team_list">
                    <table>
                        <thead>
                            <tr className="team_list_table">
                                <th>ID</th>
                                <th>Name</th>
                                <th>Count of Members</th>
                                <th>Max Count</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="team_list_info">
                            {data.teamsInfo.map((item, index) => (
                                <tr key={index}>
                                    <td className="team_desc">{item._id}</td>
                                    <td className="team_desc">{item.name}</td>
                                    <td className="team_desc">{item.count}</td>
                                    <td className="team_desc">{item.maxCount}</td>
                                    <td className="image-td">
                                        <>
                                            <img
                                                src={View}
                                                alt="view"
                                                onClick={
                                                    showModal(data.teamsInfo[index])}
                                            />
                                            <img
                                                src={Edit}
                                                alt="edit"
                                                onClick={e=>showEditModal(data.teamsInfo[index])}
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
            {viewModalShow && (
                <MainModal show={viewModalShow} setShow={setViewModalShow}>
                    <ViewTeam data={viewingTeamData} />
                </MainModal>
            )}
            {addModalShow && (
                <MainModal show={addModalShow} setShow={setAddModalShow}>
                    <AddTeam show={addModalShow} setShow={setAddModalShow} />
                </MainModal>
            )}
            {editModalShow && (
                <MainModal show={editModalShow} setShow={setEditModalShow}>
                    <EditTeam show={editModalShow} setShow={setEditModalShow} currentTeamData={editingTeamData} />
                </MainModal>
            )}

        </main>
    );
}

export default TeamList;