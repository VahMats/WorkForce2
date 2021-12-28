import React, { useContext, useState } from "react";
import AddUser from "../modals/AddUser/AddUser"
import MainModal from "../modals/MainModal/MainModal";
import ViewUser from "../modals/ViewUser/ViewUser";
import EditUser from "../modals/EditUser/EditUser";
import View from "../../images/view.png";
import Edit from "../../images/edit.png";
import Delete from "../../images/delete.png";
import { AllData } from "../Home/Home";

import "./UserList.css";


const UserList = ({ visible }) => {

    const { data, setData } = useContext(AllData);

    const [viewModalShow, setViewModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [addModalShow, setAddModalShow] = useState(false);

    const [viewingUserData, setViewingUserData] = useState({})
    const [editingUserData, setEditingUserData] = useState({})

    const showViewModal = (userData) => () => {
        setViewModalShow(!viewModalShow)
        setViewingUserData(userData)
    };

    const showEditModal = (edit) => {
        setEditModalShow(true);
        setEditingUserData(edit);
    }

    const showDelete = (id) => async () => {
        await fetch("/api/admin/delete", {
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
            .then(data => setData(prev=>({...prev, usersInfo: data.usersData})))

    };



    return (
        <main style={{ display: visible }}>
            <div>
                {data.userInfo.isAdmin ? (
                    <div className="new_user">
                        <section className="new_user_field">
                            <button onClick={e => { setAddModalShow(true) }}>Add a new user</button>
                        </section>
                    </div>
                ) : null}
                {data.usersInfo.length ? (<section className="users_list">
                    <table>
                        <thead>
                            <tr className="users_list_table">
                                {data.userInfo.isAdmin ? <th>id</th> : null}
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Date of Birth</th>
                                <th>Gender</th>
                                {data.userInfo.isAdmin ? <th>Team</th> : ""}
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="users_list_info">
                            {data.usersInfo.map((item, index) => (
                                <tr key={index} >
                                    {data.userInfo.isAdmin ? <td>{item._id}</td> : null}
                                    <td className="users_desc">{item.firstName}</td>
                                    <td className="users_desc">{item.lastName}</td>
                                    <td className="users_desc">{item.username}</td>
                                    <td className="users_desc">{item.email}</td>
                                    <td className="users_desc">{item.dateOfBirth}</td>
                                    <td className="users_desc">{item.gender}</td>
                                    {data.userInfo.isAdmin ? <td>{item.team}</td> : ""}
                                    <td className="image-td">
                                        <img className="actions_buttons"
                                            src={View}
                                            alt="show"
                                            onClick={showViewModal(data.usersInfo[index])}
                                        />
                                        {data.userInfo.isAdmin ? (
                                            <>
                                                <img className="actions_buttons"
                                                    src={Edit}
                                                    alt="edit"
                                                    onClick={e => {
                                                        showEditModal(data.usersInfo[index])
                                                    }}
                                                />
                                                <img className="actions_buttons"
                                                    src={Delete}
                                                    alt="delete"
                                                    onClick={showDelete(item._id)}
                                                />
                                            </>
                                        ) : null}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>) :
                    <h1 className={"no-users"}>{data.userInfo.isAdmin ? "No users yet ..." : "You are not in team yet"}</h1>}
            </div>
            {viewModalShow && (
                <MainModal show={viewModalShow} setShow={setViewModalShow}>
                    <ViewUser data={viewingUserData} />
                </MainModal>
            )}
            {editModalShow && (
                <MainModal show={editModalShow} setShow={setEditModalShow}>
                    <EditUser show={editModalShow} setShow={setEditModalShow} currentUsersData={editingUserData} />
                </MainModal>
            )}
            {addModalShow && (
                <MainModal show={addModalShow} setShow={setAddModalShow}>
                    <AddUser show={addModalShow} setShow={setAddModalShow} teamData={data.teamsInfo} />
                </MainModal>
            )}
        </main>
    );
}

export default UserList;
