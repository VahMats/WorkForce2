import React, {useContext, useState} from "react";
// import EditUser from "./EditUser";
// import Loading from "./Loading";
// import ViewModal from "./ViewModal";
// import AddUser from "./AddUser";
import View from "../../images/view.png";
import Edit from "../../images/edit.png";
import Delete from "../../images/delete.png";
import {AllData} from "../Home/Home";

// import "./UserList.css";


const UserList = ({visible}) => {

    const data = useContext(AllData)

    return (
        <main style={{display: visible}}>
            {console.log(data.userInfo)}
            <div>
                {data.userInfo.isAdmin ? (
                    <div className="add">
                        <section className="add-team-section">
                            <button>Add +</button>
                        </section>
                    </div>
                ) : null}
                {data.usersInfo.length ? (<section className="users-list">
                    <table>
                        <thead>
                        <tr className="users-list-info">
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
                        <tbody>
                        {data.usersInfo.map((item, index) => (
                            <tr key={index}>
                                {data.userInfo.isAdmin ? <td>{item._id}</td> : null}
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.username}</td>
                                <td>{item.email}</td>
                                <td>{item.dateOfBirth}</td>
                                <td>{item.gender}</td>
                                {data.userInfo.isAdmin ? <td>{item.team}</td> : ""}
                                <td className="image-td">
                                    {data.userInfo.isAdmin ? (
                                        <>
                                            <img
                                                src={View}
                                                alt="show"
                                                // onClick={showModal(item.id)}
                                            />
                                            <img
                                                src={Edit}
                                                alt="edit"
                                                // onClick={showEdit(item.id, item.teamId)}
                                            />
                                            <img
                                                src={Delete}
                                                alt="delete"
                                                // onClick={showDelete(item.id)}
                                            />
                                        </>
                                    ) : (
                                        <img
                                            src={View}
                                            alt="view"
                                            // onClick={showModal(item.id)}
                                        />
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </section> ):
                    <h1 className={"no-users"}>{data.userInfo.isAdmin ? "No users yet ..." : "You are not in team yet"}</h1>}
                    </div>
                    </main>
                    );
                };

                export default UserList;