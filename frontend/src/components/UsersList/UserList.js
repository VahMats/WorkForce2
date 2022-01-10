import React, { useContext, useState } from "react";
import AddUser from "../modals/AddUser/AddUser"
import MainModal from "../modals/MainModal/MainModal";
import ViewUser from "../modals/ViewUser/ViewUser";
import EditUser from "../modals/EditUser/EditUser";
import View from "../../images/view.png";
import Edit from "../../images/edit.png";
import Delete from "../../images/delete.png";
<<<<<<< HEAD
import Birthday from '../../images/birthday.png';
=======
import Birthday from "../../images/birthday.png";
>>>>>>> 0cb3b73622a7f8d6b368b638c194f1d7ae0cb9d3
import { AllData } from "../Home/Home";

import "./UserList.css";


const UserList = ({ visible }) => {

    const { data, setData } = useContext(AllData);

    const [viewModalShow, setViewModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [addModalShow, setAddModalShow] = useState(false);

    const [viewingUserData, setViewingUserData] = useState({})
    const [editingUserData, setEditingUserData] = useState({})

    let date = new Date();
    let dateMonth = date.getMonth() + 1;
    let dateDay = date.getDate();
    console.log(data.userInfo.dateOfBirth.split('-'))

    console.log(dateMonth, dateDay);

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
            .then(data => setData(prev => ({ ...prev, usersInfo: data.usersData, teamsInfo: data.teamsData })))

    };

    const isBirthday = (month, day) => {
        const date = new Date();

        const thisMonth = date.getMonth() + 1;

        const thisDay = date.getDate();

        if (thisMonth === month && day >= thisDay) {
            return true;
        }
        if (((thisMonth <= month && month <= thisMonth + 1) || (thisMonth === 12 && month === 1)) && thisDay >= day) {
            return true;
        }
        return false;
    }


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
                {Object.keys(data.usersInfo).length === 0 ? <h1 className={"no-users"}>{data.userInfo.isAdmin ? "No users yet ..." : "You are not in team yet"}</h1> : (<section className="users_list">
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
<<<<<<< HEAD
                                    <td>
                                    {((Number(item.dateOfBirth.split('-')[1]) - dateMonth === 1 && 30 - dateDay  + Number(item.dateOfBirth.split('-')[2]) <=30) || (Number(item.dateOfBirth.split('-')[1]) === dateMonth && Number(item.dateOfBirth.split('-')[2]) >= dateDay)) ? <img alt="crown" src={Birthday} />  : ""}
                                        {item.firstName}
                                    </td>
=======
                                    <td className="imageTd">{item.firstName}
                                        {isBirthday(parseInt(item.dateOfBirth.slice(5, 7)), parseInt(item.dateOfBirth.slice(8, 10))) ? <img alt="Birthday" src={Birthday} /> : ""}</td>
>>>>>>> 0cb3b73622a7f8d6b368b638c194f1d7ae0cb9d3
                                    <td>{item.lastName}</td>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                    <td>{
                                        item.dateOfBirth
                                    }</td>
                                    <td>{item.gender}</td>
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
                                                    alt="edit"Crown
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
                </section>)}
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
